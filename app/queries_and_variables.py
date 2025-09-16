# pylint: disable=missing-function-docstring, missing-module-docstring

import json
import os
import time
import webbrowser

import pandas as pd
import requests
from dotenv import load_dotenv
from fastapi import Request
from starlette.responses import RedirectResponse

load_dotenv()
LOGIN_URL = (
    "https://anilist.co/api/v2/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code")
GRAPHQL_URL = "https://graphql.anilist.co"
TOKEN_URL = "https://anilist.co/api/v2/oauth/token"
FILE_PATH = "../data.json"
client_id = int(os.getenv("ANILIST_CLIENT_ID"))
client_secret = os.getenv("ANILIST_CLIENT_SECRET")
SECRET_KEY = os.getenv("SECRET_KEY")
REDIRECT_URL = "http://localhost:8000/auth/callback"
TOKEN_PATH = "../token.json"

USER_QUERY = """
query {
  Viewer {
    id
    name
    avatar {
      medium
    }
    bannerImage
    about
  }
}
"""

CHARACTER_QUERY = """
query ($search: String!) {
  Media(search: $search) {
  id
    title {
      romaji 
    }
    characters(page: 1, sort: ROLE) {
      edges {
        role
        node {
          name {
            full
          }
        }
      }
    }
  }
}
"""

DETAILS_QUERY = """
query Query($mediaId: Int) {
  Media(id: $mediaId) {
  id
    coverImage {
      extraLarge
    }
    description
    status
    title {
      english
      native
      romaji
    }
    type
    meanScore
    siteUrl
    episodes
    chapters
    volumes
    genres
    format
  }
}
"""

SEARCH_QUERY ="""
query ($search: String!) {
  Page {
    media(search: $search) {
    id
      title {
        romaji
        english
        native
      }
      averageScore
      chapters
      status
      endDate {
        year
      }
      id
      format
      episodes
      countryOfOrigin
    }
  }
}
"""

RECOMMENDATIONS_QUERY = """
query ($search: String!) {
  Media(search: $search) {
  id
    title {
      romaji 
    }
    recommendations(perPage: 10, sort: RATING_DESC) {
      edges {
        node {
          mediaRecommendation {
            averageScore
            title {
              english romaji native
            }
            tags {
                name
                rank
            }
          }
        }
      }
    }
  }
}
"""

PROGRESS_QUERY = """
query Query($mediaId: Int, $userId: Int) {
  MediaList(mediaId: $mediaId, userId: $userId) {
    progress
    status
    score
    user {
      name
    }
  }
}
"""

LIST_FROM_USER_QUERY = """
query ($type: MediaType!, $userId: Int!) {
  MediaListCollection(type: $type, userId: $userId) {
    lists {
      name
      entries {
        media {
        id
          averageScore
          title {
            english
            romaji
            native
          }
          chapters
        }
        progress
        status
        score
      }
    }
  }
}
"""

MUTATION_QUERY = """
mutation Mutation($mediaId: Int, $score: Float, $progress: Int, $status: MediaListStatus) {
  SaveMediaListEntry(mediaId: $mediaId, score: $score, progress: $progress, status: $status) {
    media {
      title {
        romaji
      }
    }
  }
}
"""

variables = {}

def get_current_user(request: Request):
    return request.session["user"]

def get_current_token(request: Request):
    return request.session["token"]["access_token"]

def require_auth(request: Request):
    user = get_current_user(request)
    if not user:
        return RedirectResponse(url="/auth/login")
    return user

def print_markdown(json_object):
    print(pd.json_normalize(json_object).to_markdown(index=False))


def initialize_pandas():
    pd.set_option('display.max_columns', None)
    pd.set_option('display.width', None)
    pd.set_option('display.max_colwidth', None)


def build_login_url():
    return LOGIN_URL.format(client_id=client_id, redirect_uri=REDIRECT_URL)


def get_logged_in_user(request):
    token = get_current_token(request)
    response = api_call(USER_QUERY, token).json()
    return response["data"]["Viewer"]


def api_call(query, token):
    try:
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
        response = requests.post(
            GRAPHQL_URL,
            json={"query": query, "variables": variables},
            headers=headers,
            timeout=20,
        )
        return response
    except requests.RequestException as e:
        print(f"Error with POST request: {e}")
        return None


def token_conversion(code):
    response = requests.post(
        TOKEN_URL,
        json={
            "grant_type": "authorization_code",
            "client_id": client_id,
            "client_secret": client_secret,
            "redirect_uri": REDIRECT_URL,
            "code": code,
        },
        timeout=20
    )
    json_object = response.json()
    return json_object


def add_map(key, value):
    variables[key] = value


def file_writing(obj):
    if obj is None:
        print("JSON object is empty")
        return
    with open("../data.json", "w") as f:
        json.dump(obj, f, ensure_ascii=False, indent=2)


def get_token_from_file():
    if not os.path.exists(TOKEN_PATH):
        return None
    with open(TOKEN_PATH) as f:
        token = json.load(f)

        # verify expiration
        if time.time() >= token["expiration_time"]:
            return None
        return token


def save_token(token):
    if token is None:
        print("Can't save None token")
        return
    token["expiration_time"] = time.time() + token["expires_in"]
    with open(TOKEN_PATH, "w") as f:
        json.dump(token, f, indent=2)


def authorization():
    token = get_token_from_file()
    if token:
        return token["access_token"]

    auth_url = build_login_url()
    webbrowser.open(auth_url, new=0, autoraise=True)
    code = input("Enter code\n")
    code = code.strip()

    json_object = token_conversion(code)
    save_token(json_object)
    return json_object["access_token"]


def get_all_manga(json_object):
    all_titles = []
    arrays = json_object["data"]["MediaListCollection"]["lists"]
    for arr in arrays:
        for entry in arr["entries"]:
            all_titles.append(entry)

    return all_titles

def get_search(json_object):
    all_titles = []
    arrays = json_object["data"]["Page"]["media"]
    for arr in arrays:
        all_titles.append(arr)


    return all_titles

def get_random_manga(json_object):
    all_titles = get_all_manga(json_object)

    df = pd.json_normalize(all_titles)
    random_row = df.sample(n=1).to_markdown(index=False)
    print(random_row)
    return random_row


def get_recommendations(json_object: dict):
    # no recommendations found
    edges = json_object["data"]["Media"]["recommendations"]["edges"]
    title = json_object["data"]["Media"]["title"]
    print_markdown(title)
    if len(edges) == 0:
        print("No recommendations found for: ", json_object["data"]["Media"]["title"])
        return

    print_markdown(edges)


def get_characters(json_object):
    edges = json_object["data"]["Media"]["characters"]["edges"]
    return edges


# def handle_recommendations():
#     search = input("Title of Manga: ")
#     add_map("search", search)
#     response = api_call(RECOMMENDATIONS_QUERY)
#     json_object = response.json()
#     get_recommendations(json_object)
#     return json_object


def handle_all_manga(request):
    token = request.session["token"]["access_token"]
    user_id = get_current_user(request)["id"]
    add_map("userId", user_id)
    add_map("type", "MANGA")
    response = api_call(LIST_FROM_USER_QUERY, token)
    json_object = response.json()
    formatted = get_all_manga(json_object)
    return formatted

def handle_all_anime(request):
    token = request.session["token"]["access_token"]
    user_id = get_current_user(request)["id"]
    add_map("userId", user_id)
    add_map("type", "ANIME")
    response = api_call(LIST_FROM_USER_QUERY, token)
    json_object = response.json()
    formatted = get_all_manga(json_object)
    return formatted

# def handle_random_manga():
#     response = api_call(LIST_FROM_USER_QUERY)
#     json_object = response.json()
#     formatted = get_random_manga(json_object)
#     return formatted

# def handle_characters():
#     search = input("Title of Manga: ")
#     add_map("search", search)
#     response = api_call(CHARACTER_QUERY)
#     json_object = response.json()
#     get_characters(json_object)
#     return json_object

def handle_search(request, search):
    token = get_current_token(request)
    add_map("search", search)
    response = api_call(SEARCH_QUERY, token)
    return get_search(response.json())

def handle_details(request, media_id):
    add_map("mediaId", media_id)
    token = get_current_token(request)
    response = api_call(DETAILS_QUERY, token)
    return response.json()["data"]["Media"]

def handle_saving(request, media_id):
    add_map("mediaId", media_id)
    for key in ["score", "progress", "status"]:
        if request.session[key]:
            add_map(key, request.session[key])
    token = get_current_token(request)
    response = api_call(MUTATION_QUERY, token)
    return response.json()["data"]["SaveMediaListEntry"]["media"]["title"]["romaji"]

def handle_progress(request, media_id):
    add_map("mediaId", media_id)
    user_id = get_current_user(request)["id"]
    add_map("userId", user_id)
    token = get_current_token(request)
    response = api_call(PROGRESS_QUERY, token)
    return response.json()["data"]["MediaList"]
