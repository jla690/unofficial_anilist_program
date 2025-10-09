import React, { useEffect, useState } from "react";
import BaseLayout from "./BaseLayout";
import api from "../api";
import type { User, SearchListItem } from "../types";
import SearchResults from "./SearchResults";
import { useSearchParams } from "react-router-dom";

interface SearchProps {
  user: User | null;
}

const globalSearchCache: { [query: string]: SearchListItem[] | null } = {};

const Search = ({ user }: SearchProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") ?? "");
  const [lists, setLists] = useState<SearchListItem[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      if (globalSearchCache[query]) {
        setLists([...(globalSearchCache[query] || [])]);
        return globalSearchCache[query];
      }
      const response = await api.get("/search", {
        params: { search: query },
      });
      setLists(response.data.lists);
      globalSearchCache[query] = response.data.lists;
    } catch (error) {
      console.log(error);
      setLists(null);
      globalSearchCache[query] = null;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ query: query });
      handleSearch(query);
    } else {
      setSearchParams({});
    }
  };

  useEffect(() => {
    const urlQuery = searchParams.get("query");
    if (urlQuery) {
      setQuery(urlQuery);
      handleSearch(urlQuery);
    } else {
      setLists(null);
      setQuery("");
    }
  }, [searchParams]);

  return (
    <BaseLayout user={user}>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-300 mb-2">Search</h2>
          <p className="text-gray-300">Search for your favourite anime/manga</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg">
          <div className="flex gap-3">
            <input
              className="text-gray-300 flex-1 px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              name="search"
              placeholder="Search for anime or manga..."
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-gray-300 px-6 py-2 rounded-md font-medium transition-colors"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>

        {/* Results */}
        {lists ? (
          <SearchResults lists={lists}></SearchResults>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-300">
              No search results yet. Try searching for something!
            </p>
          </div>
        )}
      </div>
    </BaseLayout>
  );
};

export default Search;
