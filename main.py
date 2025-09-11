import random
import time
import requests
import json
import webbrowser
import os
from urllib.parse import quote

login_url = "https://anilist.co/api/v2/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code"
graphql_url = 'https://graphql.anilist.co'
token_url = "https://anilist.co/api/v2/oauth/token"
file_path = 'data.json'
client_id = int(os.getenv("ANILIST_CLIENT_ID", "30162"))
client_secret = os.getenv("ANILIST_CLIENT_SECRET", "")
redirect_uri = "https://anilist.co/api/v2/oauth/pin"
token_path = 'token.json'
list_from_user_query = '''
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
'''

variables = {
    'id': 15125,
    'type': "MANGA",
    'userId': 7483344
}

def build_login_url():
    return login_url.format(client_id=client_id, redirect_uri=redirect_uri)

def api_call():
    try:
        token = authorization()
        headers = {
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json',
			'Accept': 'application/json'
        }
        return requests.post(graphql_url, json={'query': list_from_user_query, 'variables': variables}, headers=headers)
    except:
        print("Error with POST request")

def token_conversion(code):
    response = requests.post(token_url, json={
        'grant_type': 'authorization_code',
        'client_id': client_id, 
        'client_secret': client_secret, 
        'redirect_uri': redirect_uri, 
        'code': code})
    json_object = response.json()
    return json_object

def file_writing(obj):
    if obj is None:
        print("JSON object is empty")
        return
    with open('data.json', 'w') as f:
        json.dump(obj, f, ensure_ascii=False, indent=2)

def get_token_from_file():
    if not os.path.exists(token_path):
        return None
    with open(token_path) as f:
        token = json.load(f)
        if time.time() >= token["expiration_time"]:
            return None
        return token

def save_token(token):
    if token is None:
        print("Can't save None token")
        return
    token["expiration_time"] = time.time() + token["expires_in"]
    with open(token_path, 'w') as f:
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
    print("Random Pick: ", json.dumps(random_choice, ensure_ascii=False, indent=2))

def main():
    json_object = None
    response = api_call()
    try:
        json_object = response.json()
    except:
        print("Error parsing text")
        exit(1)

    file_writing(json_object)
    get_random_manga(json_object)

if __name__ == '__main__':
    main()