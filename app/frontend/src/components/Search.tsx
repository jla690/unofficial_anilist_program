import React, { useEffect, useRef, useState, type ReactNode } from "react";
import BaseLayout from "./BaseLayout";
import api from "../api";
import type { User, SearchListItem } from "../types";
import SearchResults from "./SearchResults";
import { useSearchParams } from "react-router-dom";

interface Props {
  user: User | null;
}

const Search = ({ user }: Props) => {
  const cache = useRef<{ [query: string]: any }>({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") ?? "");
  const [lists, setLists] = useState<SearchListItem[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      if (cache.current[query]) {
        setLists([...(cache.current[query] || [])]);
        return cache.current[query];
      }
      const response = await api.get("/search", {
        params: { search: query },
      });
      setLists(response.data.lists);
      cache.current[query] = response.data.lists;
    } catch (error) {
      console.log(error);
      setLists(null);
      cache.current[query] = null;
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
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg border border-gray-200"
        >
          <div className="flex gap-3">
            <input
              name="search"
              placeholder="Search for anime or manga..."
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
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
          <SearchResults lists={lists}></SearchResults>
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
