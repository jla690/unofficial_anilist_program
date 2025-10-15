# Unofficial AniList Program

A learning project: an unofficial, local AniList web client built with FastAPI (backend), React + TypeScript + Tailwind CSS (frontend).  
Features include login, anime & manga list management, searching, recommendations, graphs, and more.

## Features

- AniList authentication (login/logout)
- View user anime/manga lists
- Search for anime/manga
- Update progress, status, and score for specific titles
- View detailed title info (characters, tags, distribution graphs)
- Recommendations and character lists
- Profile dropdown/menu
- Status and score distribution graphs
- Docker setup (WIP)
- Modern UI

## TODO

- Trending anime & manga display with thumbnails
- Redis integration for caching (researching usefulness)

## Tech Stack

- **Backend:** FastAPI (Python)
- **Frontend:** React, TypeScript, Tailwind CSS
- **API:** AniList GraphQL
- **DevOps:** Docker (WIP)

## Getting Started

1. Clone the repo.
2. In the main directory, run `uvicorn app.main:app --reload`
3. In app/frontend run `npm install` then `npm run dev`
4. Visit `localhost:5137` in your browser.
5. Authenticate using AniList.

## Screenshots
TODO

## License

MIT
