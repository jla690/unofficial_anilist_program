import React from "react";
import type { SearchListItem } from "../types";

interface Props {
  lists: SearchListItem[];
}

const SearchResults = ({ lists }: Props) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Search Results ({lists.length})
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Episodes/Chapters
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Format
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Country
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
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
  );
};

export default SearchResults;
