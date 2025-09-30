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
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Search</h2>
          <p className="text-gray-600">Search for your favourite anime/manga</p>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="bg-white p-6 rounded-lg border border-gray-200"
        >
          <div className="flex gap-3">
            <input
              name="search"
              placeholder="Search for anime or manga..."
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="text-black flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>

        {/* Results */}
        {lists ? (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Search Results ({lists.length})
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Episodes/Chapters
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Format
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Country
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {lists.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <a
                          href={"/media_detail/" + item.id}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {item.title.english ||
                            item.title.romaji ||
                            item.title.native}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {item.averageScore || "—"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {item.chapters || item.episodes || "—"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                          {item.format}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {item.countryOfOrigin}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            item.status === "FINISHED"
                              ? "bg-green-100 text-green-800"
                              : item.status === "RELEASING"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No search results yet. Try searching for something!
            </p>
          </div>
        )}
      </div>
    </BaseLayout>
  );
};

export default Search;
