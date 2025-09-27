import React, { useEffect, useState, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import BaseLayout from "./BaseLayout";
import api from "../api";

interface User {
  about: string;
  id: number;
  bannerImage: string;
  name: string;
  avatar: {
    medium: string;
  };
}

interface ListItem {
  id: number;
  chapters?: number | null;
  episodes?: number | null;
  format?: string;
  score: number;
  progress: string;
  countryOfOrigin: string;
  status: string;
  media: {
    averageScore?: number;
    title: {
      english: string;
      romaji: string;
      native: string;
    };
  };
}

interface Props {
  user: User | null;
}

const Lists = ({ user }: Props) => {
  const [lists, setLists] = useState<ListItem[] | null>(null);
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "ANIME";

  const fetchLists = async () => {
    try {
      const response = await api.get("/lists", {
        params: { type: type },
      });
      setLists(response.data.lists);
    } catch (error) {
      console.log(error);
      setLists(null);
    }
  };

  useEffect(() => {
    fetchLists();
  }, [type]);

  return (
    <BaseLayout user={user}>
      <h2>My Lists</h2>
      <div className="tabs">
        <Link
          className={`tab ${type === "ANIME" ? "active" : ""}`}
          to="/lists?type=ANIME"
        >
          Anime
        </Link>
        <Link
          className={`tab ${type === "MANGA" ? "active" : ""}`}
          to="/lists?type=MANGA"
        >
          Manga
        </Link>
      </div>
      {lists ? (
        <section className="list-section">
          <h3>{type === "MANGA" ? "All Manga" : "All Anime"}</h3>
          <table className="media-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Site Score</th>
                <th>Current Chapter/Episode</th>
                <th>User Score</th>
                <th>Current Status</th>
              </tr>
            </thead>
            <tbody>
              {lists.map((item) => (
                <tr>
                  <td className="title-cell">
                    <a href="/anime_detail/{{item.media.id}}">
                      {item.media.title.english ||
                        item.media.title.romaji ||
                        item.media.title.native}
                    </a>
                  </td>
                  <td>{item.media.averageScore || "—"}</td>
                  <td>{item.progress}</td>
                  <td>{item.score * 10}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : (
        <p className="muted">No list data available.</p>
      )}
    </BaseLayout>
  );
};

export default Lists;
