import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import type { User } from "../types";

interface Props {
  user: User | null;
  children?: ReactNode;
  messages?: { text: string; category?: string }[];
}

const BaseLayout = ({ user, children, messages }: Props) => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 px-6 py-4 rounded-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-blue-400">
            Unofficial
            <span className="text-white font-medium">AniListLocal</span>
          </Link>

          <nav className="flex items-center space-x-6">
            <Link
              to="/search"
              className="text-gray-300 hover:text-gray-100 font-medium"
            >
              Search
            </Link>
            <Link
              to="/lists"
              className="text-gray-300 hover:text-gray-100 font-medium"
            >
              My Lists
            </Link>

            {user ? (
              <div className="flex items-center space-x-3">
                {user.avatar.medium && (
                  <img
                    alt={user.name}
                    className="w-7 h-7 rounded-full"
                    src={user.avatar.medium}
                  />
                )}
                <span className="text-gray-300 font-medium">{user.name}</span>
                <a
                  className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1 rounded text-sm font-medium"
                  href="http://localhost:8000/auth/logout"
                >
                  Logout
                </a>
              </div>
            ) : (
              <a
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium"
                href="http://localhost:8000/auth/login"
              >
                Login
              </a>
            )}
          </nav>
        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-1 gap-6 px-6 py-8">
        <main>
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
      </div>
    </div>
  );
};

export default BaseLayout;
