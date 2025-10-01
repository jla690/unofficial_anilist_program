import React from "react";
import type { UserListItem } from "../types";
import { Link } from "react-router-dom";

interface Props {
  lists: UserListItem[];
}

const ListResults = ({ lists }: Props) => {
  return (
    <div className="text-gray overflow-x-auto">
      <table className="w-full table-auto">
        <thead className="border-b border-gray-700">
          <tr>
            <th className="text-xs text-gray-300 uppercase px-6 py-3 text-center font-medium">
              Title
            </th>
            <th className="text-xs text-gray-300 uppercase px-6 py-3 text-center font-medium">
              Site Score
            </th>
            <th className="text-xs text-gray-300 uppercase px-6 py-3 text-center font-medium">
              Current Chapter/Episode
            </th>
            <th className="text-xs text-gray-300 uppercase px-6 py-3 text-center font-medium">
              User Score
            </th>
            <th className="text-xs text-gray-300 uppercase px-6 py-3 text-center font-medium">
              Current Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {lists.map((item) => (
            <tr key={item.media.id} className="hover:bg-gray-700">
              <td className="title-cell">
                <Link
                  to={"/media_detail/" + item.media.id}
                  className="text-blue-500 hover:text-blue-600 font-medium"
                >
                  {item.media.title.english ||
                    item.media.title.romaji ||
                    item.media.title.native}
                </Link>
              </td>
              <td className="px-6 py-4 text-sm text-gray-300">
                {item.media.averageScore || "—"}
              </td>
              <td className="px-6 py-4 text-sm text-gray-300">
                {item.progress}
              </td>
              <td className="px-6 py-4 text-sm text-gray-300">
                {item.score * 10}
              </td>
              <td className="px-6 py-4 text-sm text-gray-300">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    item.status === "CURRENT"
                      ? "bg-green-700 text-gray-300"
                      : item.status === "PLANNING"
                      ? "bg-blue-700 text-gray-300"
                      : item.status === "PAUSED"
                      ? "bg-purple-700 text-gray-300"
                      : "bg-pink-700 text-gray-300"
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
  );
};

export default ListResults;
