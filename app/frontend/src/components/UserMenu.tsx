import React from "react";
import type { User } from "../types";

interface UserMenuProps {
  user: User | null;
}

const UserMenu = ({ user }: UserMenuProps) => {
  return (
    <div className="absolute top-full origin-top opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 bg-gray-800 shadow-md rounded-md mt-5 w-40 right-0 transition duration-300 text-gray-300 divide-y divide-gray-600">
      <div className="block px-4 py-2 hover:bg-gray-700 rounded-t-md">
        {"Logged in as: " + user?.name}
      </div>
      <a href="/" className="block px-4 py-2 hover:bg-gray-700">
        Profile
      </a>
      <a href="/" className="block px-4 py-2 hover:bg-gray-700">
        Settings
      </a>
      <a
        href="http://localhost:8000/auth/logout"
        className="block px-4 py-2 hover:bg-gray-700 rounded-b-md"
      >
        Logout
      </a>
    </div>
  );
};

export default UserMenu;
