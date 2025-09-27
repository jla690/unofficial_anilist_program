import React, { useState, type ReactNode } from "react";
import BaseLayout from "./BaseLayout";
import api from "../api";
import type { User, SearchListItem } from "../types";

interface Props {
  user: User | null;
}

const Search = ({ user }: Props) => {
  const [query, setQuery] = useState("");
  const [lists, setLists] = useState<SearchListItem[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.get("/search", {
        params: { search: query },
      });
      setLists(response.data.lists);
    } catch (error) {
      console.log(error);
      setLists(null);
    } finally {
      setLoading(false);
    }
  };
  return (
    <BaseLayout user={user}>
      <h2>Search</h2>
      <p>Search for your favourite anime/manga</p>
      <form onSubmit={handleSearch}>
        <label>
          <input
            name="search"
            placeholder="Search..."
            type="text"
            value={query}
            onChange={(q) => setQuery(q.target.value)}
          ></input>
        </label>
        <button type="submit" className="btn primary" disabled={loading}>
          {loading ? "Loading" : "Search"}
        </button>
      </form>
      {lists ? (
        <section className="list-section">
          <h3>All Manga</h3>
          <table className="media-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Site Score</th>
                <th>Chapters/Episodes</th>
                <th>Format</th>
                <th>Country of Origin</th>
                <th>Current Status</th>
              </tr>
            </thead>
            <tbody>
              {lists.map((item) => (
                <tr key={item.id}>
                  <td className="title-cell">
                    <a href={"/anime_detail/" + item.id}>
                      {item.title.english ||
                        item.title.romaji ||
                        item.title.native}
                    </a>
                  </td>
                  <td>{item.averageScore || "—"}</td>
                  <td>{item.chapters || item.episodes}</td>
                  <td>{item.format}</td>
                  <td>{item.countryOfOrigin}</td>
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

export default Search;
