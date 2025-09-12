# pylint: disable=missing-function-docstring, missing-module-docstring

import json
import os
import re
import time
import webbrowser

import pandas as pd
import requests
from dotenv import load_dotenv

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

RECOMMENDATIONS_QUERY = """
query ($search: String!) {
  Media(search: $search) {
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

LIST_FROM_USER_QUERY = """
query ($type: MediaType!, $userId: Int!) {
  MediaListCollection(type: $type, userId: $userId) {
    lists {
      name
      entries {
        media {
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

variables = {"type": "MANGA", "userId": 7483344}


def print_markdown(json_object):
    print(pd.json_normalize(json_object).to_markdown(index=False))


def initialize_pandas():
    pd.set_option('display.max_columns', None)
    pd.set_option('display.width', None)
    pd.set_option('display.max_colwidth', None)


def build_login_url():
    return LOGIN_URL.format(client_id=client_id, redirect_uri=REDIRECT_URL)


def get_logged_in_user():
    response = api_call(USER_QUERY).json()
    return response["data"]["Viewer"]


def api_call(query):
    try:
        token = authorization()
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


def handle_recommendations():
    search = input("Title of Manga: ")
    add_map("search", search)
    response = api_call(RECOMMENDATIONS_QUERY)
    json_object = response.json()
    get_recommendations(json_object)
    return json_object


def handle_all_manga():
    response = api_call(LIST_FROM_USER_QUERY)
    json_object = response.json()
    formatted = get_all_manga(json_object)
    return formatted

def handle_random_manga():
    response = api_call(LIST_FROM_USER_QUERY)
    json_object = response.json()
    formatted = get_random_manga(json_object)
    return formatted

def handle_characters():
    search = input("Title of Manga: ")
    add_map("search", search)
    response = api_call(CHARACTER_QUERY)
    json_object = response.json()
    get_characters(json_object)
    return json_object


def main():
    obj = handle_all_manga()
    print(obj)
    file_writing(obj)
    # initialize_pandas()
    # print("Which query to run?")
    # choice = input("1. Recommendation\n2. Random manga from your list\n3. Characters from Manga\n")
    #
    # # use regex to remove non numbers
    # choice = re.sub("[^0-9]", "", choice)
    # print(choice)
    # json_object = None
    #
    # if choice == "1":
    #     json_object = handle_recommendations()
    # elif choice == "2":
    #     json_object = handle_random_manga()
    # elif choice == "3":
    #     json_object = handle_characters()
    #
    # file_writing(json_object)


if __name__ == "__main__":
    main()
