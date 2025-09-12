# pylint: disable=missing-function-docstring, missing-module-docstring

from pathlib import Path

import uvicorn
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.middleware.sessions import SessionMiddleware
from starlette.responses import RedirectResponse

from app.queries_and_variables import *

BASE_DIR = Path(__file__).resolve().parent  # this = app/

app = FastAPI()

app.add_middleware(SessionMiddleware, SECRET_KEY)

# Point directly to "static" and "templates" inside app/
app.mount(
    "/static",
    StaticFiles(directory=BASE_DIR / "static"),
    name="static"
)
templates = Jinja2Templates(directory=BASE_DIR / "templates")

def get_current_user(request: Request):
    return request.session.get("user")

def require_auth(request: Request):
    user = get_current_user(request)
    if not user:
        return RedirectResponse(url="/auth/login")
    return user

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    user_data = get_current_user(request)
    print(user_data)
    return templates.TemplateResponse(
        "index.html",
        {
            "request": request,
            "user": user_data,
            "messages": [],
            "now": __import__("datetime").datetime.utcnow
        }
    )

@app.get("/auth/login", response_class=HTMLResponse)
async def login(request: Request):
    return RedirectResponse(url=build_login_url())

@app.get("/auth/callback")
async def callback(request: Request):
    code = request.query_params.get("code")
    if not code:
        return RedirectResponse(url="/")

    token = token_conversion(code)
    save_token(token)
    user_data = get_logged_in_user()
    request.session["user"] = user_data
    request.session["token"] = token
    return RedirectResponse(url="/")

@app.get("/lists", response_class=HTMLResponse)
async def lists(request: Request):
    all_manga = handle_all_manga()
    return templates.TemplateResponse(
        "lists.html",
        {
            "request": request,
            "lists": all_manga,
            "user": get_current_user(request),
            "messages": [],
            "now": __import__("datetime").datetime.utcnow
        }
    )

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)