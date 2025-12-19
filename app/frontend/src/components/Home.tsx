import { useEffect, useState, type ReactNode } from "react";
import BaseLayout from "./BaseLayout";
import type { Media, TrendingMedia, User } from "../types";
import api from "../api";
import TrendingCards from "./TrendingCards";

interface HomeProps {
  user: User | null;
  children?: ReactNode;
  messages?: { text: string; category?: string }[];
}

const API_URL = import.meta.env.VITE_API_URL || "/api";

const Home = ({ user }: HomeProps) => {
  const [manga, setManga] = useState<TrendingMedia[] | null>(null);
  const [anime, setAnime] = useState<TrendingMedia[] | null>(null);

  const fetchTrending = async () => {
    try {
      const response = await api.get("/", {});
      console.log(response.data);
      console.log(response.data.trending_anime.media);
      setManga(response.data.trending_manga.media);
      setAnime(response.data.trending_anime.media);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, []);
  return (
    <BaseLayout user={user}>
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-300 mb-4">
          Unofficial AniList Local
        </h1>
        <p className="text-gray-300 mb-12 max-w-lg mx-auto">
          A personal dashboard to search, track, and manage your anime & manga
          lists locally using the AniList API.
        </p>
        {!user && (
          <div className="mb-5">
            <a
              className="bg-blue-600 hover:bg-blue-700 text-gray-300 px-6 py-4 rounded font-medium"
              href={`${API_URL}/auth/login`}
            >
              Login with AniList
            </a>
          </div>
        )}
      </div>
      <section>
        <h2 className="text-gray-300 font-bold text-2xl text-center mb-5">
          Trending Manga
        </h2>
        <TrendingCards mediaList={manga}></TrendingCards>
      </section>
      <section>
        <h2 className="text-gray-300 font-bold text-2xl text-center my-5">
          Trending Anime
        </h2>
        <TrendingCards mediaList={anime}></TrendingCards>
      </section>
    </BaseLayout>
  );
};

export default Home;
