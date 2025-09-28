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
      <section className="hero flex flex-col justify-center items-center">
        <h1 className="hero-title">Unofficial AniList Local</h1>
        <p className="hero-subtitle text-center max-w-xl">
          A personal dashboard to search, track, and manage your anime & manga
          lists locally.
        </p>
        {!user && (
          <a className="btn primary large" href="/auth/login">
            Login with AniList
          </a>
        )}
      </section>
      <section className="hero mt-6">
        <h1 className="text-lg font-bold text-left">Trending</h1>
      </section>
    </BaseLayout>
  );
};

export default Home;
