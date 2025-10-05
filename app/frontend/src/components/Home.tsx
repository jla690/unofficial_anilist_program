import { type ReactNode } from "react";
import BaseLayout from "./BaseLayout";
import type { User } from "../types";

interface HomeProps {
  user: User | null;
  children?: ReactNode;
  messages?: { text: string; category?: string }[];
}

const Home = ({ user }: HomeProps) => {
  return (
    <BaseLayout user={user}>
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold text-gray-300 mb-4">
          Unofficial AniList Local
        </h1>
        <p className="text-gray-300 mb-8 max-w-lg mx-auto">
          A personal dashboard to search, track, and manage your anime & manga
          lists locally.
        </p>
        {!user && (
          <a
            className="bg-blue-600 hover:bg-blue-700 text-gray-300 px-6 py-4 rounded font-medium"
            href="http://localhost:8000/auth/login"
          >
            Login with AniList
          </a>
        )}
      </div>
    </BaseLayout>
  );
};

export default Home;
