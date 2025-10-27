import React from "react";
import type { User } from "../types";

interface UserMenuProps {
  user: User | null;
}

const UserMenu = ({ user }: UserMenuProps) => {
  return (
    <div className="absolute top-full origin-top opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 bg-gray-800 shadow-md rounded-md mt-5 w-40 right-0 transition duration-300 text-gray-300 divide-y divide-gray-600 border border-gray-600">
      <div className="block px-4 py-2 hover:bg-gray-700 rounded-t-md">
        <div className="text-sm text-gray-400 ">{"Logged in as"}</div>
        <div className="font-medium">{user?.name}</div>
      </div>
      <a href="/" className="block px-4 py-2 hover:bg-gray-700">
        Profile (WIP)
      </a>
      <a href="/" className="block px-4 py-2 hover:bg-gray-700">
        Settings (WIP)
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
