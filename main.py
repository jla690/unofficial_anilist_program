import json
import os
import random
import re
import time
import webbrowser

import requests
from dotenv import load_dotenv

load_dotenv()
LOGIN_URL = "https://anilist.co/api/v2/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code"
GRAPHQL_URL = "https://graphql.anilist.co"
TOKEN_URL = "https://anilist.co/api/v2/oauth/token"
FILE_PATH = "data.json"
client_id = int(os.getenv("ANILIST_CLIENT_ID"))
client_secret = os.getenv("ANILIST_CLIENT_SECRET")
REDIRECT_URL = "https://anilist.co/api/v2/oauth/pin"
TOKEN_PATH = "token.json"

RECOMMENDATIONS_QUERY = """
query ($search: String!) {
  Media(search: $search) {
    id
    title {
      romaji 
    }
    recommendations(perPage: 20, sort: RATING_DESC) {
      edges {
        node {
          mediaRecommendation {
            id
            averageScore
            popularity
            title {
              romaji native english
                }
            genres
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
        id
        media {
          id
          averageScore
          title {
            romaji
            native
            english
          }
        }
      }
    }
  }
}
"""

variables = {"type": "MANGA", "userId": 7483344}


def build_login_url():
    return LOGIN_URL.format(client_id=client_id, redirect_uri=REDIRECT_URL)


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
    with open("data.json", "w") as f:
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


def get_random_manga(json_object):
    all_titles = []
    for arr in json_object["data"]["MediaListCollection"]["lists"]:
        for entry in arr["entries"]:
            all_titles.append(entry["media"])

    random_choice = random.choice(all_titles)
    print("\n-----------------------")
    print("Random Pick: ", json.dumps(random_choice, ensure_ascii=False, indent=2))


def get_recommendations(json_object):
    # no recommendations found
    if len(json_object["data"]["Media"]["recommendations"]["edges"]) == 0:
        print("No recommendations found for: ", json_object["data"]["Media"]["title"])
        return

    for edge in json_object["data"]["Media"]["recommendations"]["edges"]:
        print(
            json.dumps(
                edge["node"]["mediaRecommendation"], ensure_ascii=False, indent=2
            )
        )


def main():
    print("Which query to run?")
    choice = input("1. Recommendation\n2. Random manga from your list\n")

    # use regex to remove non numbers
    choice = re.sub("[^0-9]", "", choice)
    print(choice)
    response = None
    json_object = None

    # definitely can be refactored
    if choice == "1":
        search = input("Title of Manga: ")
        add_map("search", search)
        response = api_call(RECOMMENDATIONS_QUERY)
        json_object = response.json()
        get_recommendations(json_object)
    elif choice == "2":
        response = api_call(LIST_FROM_USER_QUERY)
        json_object = response.json()
        get_random_manga(json_object)

    file_writing(json_object)


if __name__ == "__main__":
    main()
