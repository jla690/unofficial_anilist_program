import React, { type ReactNode } from "react";
import BaseLayout from "./BaseLayout";

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

const Home = ({ user, children, messages }: Props) => {
  return (
    <BaseLayout user={user}>
      <section className="hero">
        <h1 className="hero-title">Unofficial AniList Local</h1>
        <p className="hero-subtitle">
          A personal dashboard to search, track, and manage your anime & manga
          lists locally.
        </p>
        {!user ? (
          <a className="btn primary large" href="/auth/login">
            Login with AniList
          </a>
        ) : (
          <div className="quick-links">
            <a className="card-link" href="/search">
              <div className="card">
                <h3>Search</h3>
                <p>Find anime & manga metadata.</p>
              </div>
            </a>
            <a className="card-link" href="/lists">
              <div className="card">
                <h3>My Lists</h3>
                <p>View & update your watching/reading progress.</p>
              </div>
            </a>
          </div>
        )}
      </section>
    </BaseLayout>
  );
};

export default Home;
