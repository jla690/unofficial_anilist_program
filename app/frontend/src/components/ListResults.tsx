import React from "react";
import type { UserListItem } from "../types";
import { Link } from "react-router-dom";

interface Props {
  lists: UserListItem[];
}

const ListResults = ({ lists }: Props) => {
  return (
    <div className="text-gray-900 overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="text-xs text-gray-500 uppercase px-6 py-3 text-center font-medium">
              Title
            </th>
            <th className="text-xs text-gray-500 uppercase px-6 py-3 text-center font-medium">
              Site Score
            </th>
            <th className="text-xs text-gray-500 uppercase px-6 py-3 text-center font-medium">
              Current Chapter/Episode
            </th>
            <th className="text-xs text-gray-500 uppercase px-6 py-3 text-center font-medium">
              User Score
            </th>
            <th className="text-xs text-gray-500 uppercase px-6 py-3 text-center font-medium">
              Current Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {lists.map((item) => (
            <tr key={item.media.id} className="hover:bg-gray-50">
              <td className="title-cell">
                <Link
                  to={"/media_detail/" + item.media.id}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {item.media.title.english ||
                    item.media.title.romaji ||
                    item.media.title.native}
                </Link>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {item.media.averageScore || "—"}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {item.progress}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {item.score * 10}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    item.status === "CURRENT"
                      ? "bg-green-100 text-green-800"
                      : item.status === "PLANNING"
                      ? "bg-blue-100 text-blue-800"
                      : item.status === "PAUSED"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-pink-100 text-pink-800"
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
