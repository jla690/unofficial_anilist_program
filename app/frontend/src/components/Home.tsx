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
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold text-white mb-4">
          Unofficial AniList Local
        </h1>
        <p className="text-gray-300 mb-8 max-w-lg mx-auto">
          A personal dashboard to search, track, and manage your anime & manga
          lists locally.
        </p>
        {!user && (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-medium"
            onClick={() =>
              (window.location.href = "http://localhost:8000/auth/login")
            }
          >
            Login with AniList
          </button>
        )}
      </div>
    </BaseLayout>
  );
};

export default Home;
