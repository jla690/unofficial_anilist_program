import requests
import json
import os

url = 'https://graphql.anilist.co'
file_path = 'data.json'
query = '''
query ($type: MediaType!, $userId: Int!) {
  MediaListCollection(type: $type, userId: $userId) {
    lists {
      name
      entries {
        id
        media {
          id
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

def api_call():
    try:
        return requests.post(url, json={'query': query, 'variables': variables})
    except:
        print("Error with POST request")

def file_writing(obj):
    if obj is None:
        exit(1)
    if not os.path.exists('data.json'):
        with open('data.json', 'w') as f:
            json.dump(obj, f, ensure_ascii=False, indent=2)


def main():
    json_object = None
    response = api_call()
    try:
        json_object = json.loads(response.text)
    except:
        print("Error parsing text")
        exit(1)

    file_writing(json_object)
    

if __name__ == '__main__':
    main()