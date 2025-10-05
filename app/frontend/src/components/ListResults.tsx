import type { UserListItem } from "../types";
import { Link } from "react-router-dom";
import UserStatusBadge from "./UserStatusBadge";

interface ListResultsProps {
  lists: UserListItem[];
}

const ListResults = ({ lists }: ListResultsProps) => {
  return (
    <div className="text-gray-300 overflow-x-auto">
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
              <td className="px-6 py-4 text-sm text-gray-300">
                <Link
                  to={"/media_detail/" + item.media.id}
                  className="text-blue-500 hover:text-blue-600 font-medium"
                >
                  {item.media.title.english ||
                    item.media.title.romaji ||
                    item.media.title.native}
                </Link>
              </td>
              <td className="px-6 py-4 text-sm text-gray-300 font-medium">
                {item.media.averageScore || "—"}
              </td>
              <td className="px-6 py-4 text-sm text-gray-300 font-medium">
                {item.progress}
              </td>
              <td className="px-6 py-4 text-sm text-gray-300 font-medium">
                {item.score * 10}
              </td>
              <td className="px-6 py-4 text-sm text-gray-300">
                <UserStatusBadge status={item.status}></UserStatusBadge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListResults;
