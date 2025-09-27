import React, { type ReactNode } from "react";
import { Link } from "react-router-dom";

interface User {
  about: string;
  id: number;
  bannerImage: string;
  name: string;
  avatar: {
    medium: string;
  };
}

interface Props {
  user: User | null;
  children?: ReactNode;
  messages?: { text: string; category?: string }[];
}

const BaseLayout = ({ user, children, messages }: Props) => {
  return (
    <div data-theme="light" lang="en">
      <header className="site-header">
        <div className="brand">
          <a className="logo" href="/">
            UnofficialAniList<span className="accent">Local</span>
          </a>
        </div>
        <nav className="main-nav">
          <ul>
            <li>
              <Link to="/search">Search</Link>
            </li>
            <li>
              <Link to="/lists">My Lists</Link>
            </li>
            {user ? (
              <li className="user-block">
                {user.avatar.medium && (
                  <img
                    alt={user.name}
                    className="avatar"
                    src={user.avatar.medium}
                  />
                )}
                <span className="username">{user.name}</span>
                <a className="btn small outline" href="/auth/logout">
                  Logout
                </a>
              </li>
            ) : (
              <li>
                <a className="btn primary small" href="/auth/login">
                  Login
                </a>
              </li>
            )}
          </ul>
        </nav>
      </header>

      <div className="layout">
        <main className="content">
          {messages && messages.length > 0 && (
            <div className="messages">
              {messages.map((m, i) => (
                <div key={i} className={`message ${m.category ?? "info"}`}>
                  {m.text}
                </div>
              ))}
            </div>
          )}
          {children}
        </main>
        <aside className="sidebar">
          <section className="panel">
            <h3>Status</h3>
            {user ? (
              <p>
                Logged in as <strong>{user.name}</strong>
              </p>
            ) : (
              <p>You are not logged in.</p>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
};

export default BaseLayout;
