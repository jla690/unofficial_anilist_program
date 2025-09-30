import React, { type ReactNode } from "react";
import { Link } from "react-router-dom";
import type { User } from "../types";

interface Props {
  user: User | null;
  children?: ReactNode;
  messages?: { text: string; category?: string }[];
}

const BaseLayout = ({ user, children, messages }: Props) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-gray-900">
            UnofficialAniList<span className="text-blue-600">Local</span>
          </Link>

          <nav className="flex items-center space-x-6">
            <Link to="/search" className="text-gray-600 hover:text-gray-900">
              Search
            </Link>
            <Link to="/lists" className="text-gray-600 hover:text-gray-900">
              My Lists
            </Link>

            {user ? (
              <div className="flex items-center space-x-3">
                {user.avatar.medium && (
                  <img
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                    src={user.avatar.medium}
                  />
                )}
                <span className="text-gray-700">{user.name}</span>
                <a
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm"
                  href="/auth/logout"
                >
                  Logout
                </a>
              </div>
            ) : (
              <a
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                href="http://localhost:8000/auth/login"
              >
                Login
              </a>
            )}
          </nav>
        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 px-6 py-8">
        <main className="lg:col-span-3">
          {messages && messages.length > 0 && (
            <div className="mb-6 space-y-2">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`p-3 rounded ${
                    m.category === "error"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>
          )}
          {children}
        </main>

        <aside className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Status</h3>
            {user ? (
              <p className="text-gray-600 text-sm">
                Logged in as <strong>{user.name}</strong>
              </p>
            ) : (
              <p className="text-gray-600 text-sm">You are not logged in.</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BaseLayout;
