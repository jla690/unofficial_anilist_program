# pylint: disable=missing-function-docstring, missing-module-docstring

import os
from pathlib import Path

import requests
from dotenv import load_dotenv
from fastapi import Request

BASE_DIR = Path(__file__).resolve().parent

load_dotenv()
LOGIN_URL = (
    "https://anilist.co/api/v2/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code")
GRAPHQL_URL = "https://graphql.anilist.co"
TOKEN_URL = "https://anilist.co/api/v2/oauth/token"
FILE_PATH = BASE_DIR / "data.json"
client_id = int(os.getenv("ANILIST_CLIENT_ID"))
client_secret = os.getenv("ANILIST_CLIENT_SECRET")
SECRET_KEY = os.getenv("SECRET_KEY")
REDIRECT_URL = "http://localhost:8000/auth/callback"
TOKEN_PATH = BASE_DIR / "token.json"

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

# Gets current user from the request
def get_current_user(request: Request):
    return request.session.get("user")

# Gets token stored in request, returns None if not found
def get_current_token(request: Request):
    token =  request.session.get("token")
    if token is None:
        return None
    return token["access_token"]

# Builds login url
def build_login_url():
    return LOGIN_URL.format(client_id=client_id, redirect_uri=REDIRECT_URL)

# Gets current user data, like name, id, avatar
def get_logged_in_user(request):
    variables = {}
    token = get_current_token(request)
    response = api_call(USER_QUERY, token, variables)
    if response is None:
        return None
    return response.json()["data"]["Viewer"]

# Makes API calls to the Anilist GraphQL server
def api_call(query, token, variables):
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    if token:
        headers["Authorization"] = f"Bearer {token}"
    try:
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

# Makes a call to the token url to get the code returned from logging in. Gets the token
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

# Gets all titles of user
def extract_media_list(json_object):
    all_titles = []
    arrays = json_object["data"]["MediaListCollection"]["lists"]
    for arr in arrays:
        for entry in arr["entries"]:
            all_titles.append(entry)

    return all_titles

# Does search using title
def get_search(json_object):
    all_titles = []
    arrays = json_object["data"]["Page"]["media"]
    for arr in arrays:
        all_titles.append(arr)

    return all_titles

# def get_random_manga(json_object):
#     all_titles = get_all_manga(json_object)
#
#     df = pd.json_normalize(all_titles)
#     random_row = df.sample(n=1).to_markdown(index=False)
#     print(random_row)
#     return random_row


# def get_recommendations(json_object: dict):
#     # no recommendations found
#     edges = json_object["data"]["Media"]["recommendations"]["edges"]
#     title = json_object["data"]["Media"]["title"]
#     if len(edges) == 0:
#         print("No recommendations found for: ", json_object["data"]["Media"]["title"])
#         return


# def get_characters(json_object):
#     edges = json_object["data"]["Media"]["characters"]["edges"]
#     return edges


# def handle_recommendations():
#     search = input("Title of Manga: ")
#     add_map("search", search)
#     response = api_call(RECOMMENDATIONS_QUERY)
#     json_object = response.json()
#     get_recommendations(json_object)
#     return json_object

# Gets all manga of a user
def handle_all_manga(request):
    variables = {}
    token = get_current_token(request)
    if token is None:
        return None
    user_id = get_current_user(request)["id"]
    variables["userId"] = user_id
    variables["type"] = "MANGA"
    response = api_call(LIST_FROM_USER_QUERY, token, variables)
    json_object = response.json()
    formatted = extract_media_list(json_object)
    return formatted

# Gets all anime of a current user
def handle_all_anime(request):
    variables = {}
    token = get_current_token(request)
    if token is None:
        return None
    user_id = get_current_user(request)["id"]
    variables["userId"] = user_id
    variables["type"] = "ANIME"
    response = api_call(LIST_FROM_USER_QUERY, token, variables)
    json_object = response.json()
    formatted = extract_media_list(json_object)
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

# Handles searching
def handle_search(request, search):
    variables = {}
    token = get_current_token(request)
    variables["search"] = search
    response = api_call(SEARCH_QUERY, token, variables)
    if response is None:
        return None
    return get_search(response.json())

# Handles getting details of media
def handle_details(request, media_id):
    variables = {}
    token = get_current_token(request)
    variables["mediaId"] = media_id
    response = api_call(DETAILS_QUERY, token, variables)
    if response is None:
        return None
    return response.json()["data"]["Media"]

# Handles saving of data for media
def handle_saving(request, media_id):
    variables = {}
    token = get_current_token(request)
    if token is None:
        return None
    variables["mediaId"] = media_id
    for key in ["score", "progress", "status"]:
        value = request.session.get(key)
        if value is not None:
            variables[key] = value
    response = api_call(MUTATION_QUERY, token, variables)
    if response is None:
        return None
    return response.json()["data"]["SaveMediaListEntry"]["media"]["title"]["romaji"]

# Gets the progress of media for user
def handle_progress(request, media_id):
    variables = {}
    token = get_current_token(request)
    if token is None:
        return None
    variables["mediaId"] = media_id
    user_id = get_current_user(request)["id"]
    variables["userId"] = user_id
    response = api_call(PROGRESS_QUERY, token, variables)
    if response is None:
        return None
    return response.json()["data"]["MediaList"]
