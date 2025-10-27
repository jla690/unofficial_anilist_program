# Unofficial AniList Program

A learning project: an unofficial, local AniList web client built with FastAPI (backend), React + TypeScript + Tailwind CSS (frontend).  
Features include login, anime & manga list management, searching, recommendations, graphs, and more.

### Home Page - Logged Out
![Logged out](/docs/logged_out_front_page.png)

### Home Page - Logged In
![Logged in](/docs/logged_in_front_page.png)

### Search Feature
![Search](/docs/search.png)

### Manga List
![Manga List](/docs/manga_list.png)

### Anime List
![Anime List](/docs/anime_list.png)

### Media Details
![Media Detail](/docs/media_detail.png)

### User Profile Dropdown
![Dropdown](/docs/user_dropdown.png)

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
- Trending anime & manga display with thumbnails

## TODO

- Redis integration for caching (probably not viable)
- Banner image for media details
- Settings (not sure if possible)
- Profile page

## Tech Stack

- **Backend:** FastAPI (Python)
- **Frontend:** React, TypeScript, Tailwind CSS
- **API:** AniList GraphQL
- **DevOps:** Docker (WIP)

## Getting Started

1. Clone the repo.
2. In the main directory, run `uvicorn app.main:app --reload`
3. In another terminal window, go to app/frontend and run `npm run dev`
4. Visit `localhost:5137` in your browser.
5. Authenticate using AniList.

## Screenshots
TODO
