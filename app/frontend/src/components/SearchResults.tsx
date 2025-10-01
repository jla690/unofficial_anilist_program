import type { SearchListItem } from "../types";

interface Props {
  lists: SearchListItem[];
}

const SearchResults = ({ lists }: Props) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-gray-300">
          Search Results ({lists.length})
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-800">
            <tr className="border-b border-gray-700">
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                Score
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                Episodes/Chapters
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                Format
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                Country
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {lists.map((item) => (
              <tr key={item.id} className="hover:bg-gray-700">
                <td className="px-6 py-4">
                  <a
                    href={"/media_detail/" + item.id}
                    className="text-blue-500 hover:text-blue-600 font-medium"
                  >
                    {item.title.english ||
                      item.title.romaji ||
                      item.title.native}
                  </a>
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {item.averageScore || "—"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {item.chapters || item.episodes || "—"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-500 text-gray-300">
                    {item.format}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {item.countryOfOrigin}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.status === "FINISHED"
                        ? "bg-green-700 text-gray-300"
                        : item.status === "RELEASING"
                        ? "bg-blue-700 text-gray-300"
                        : "bg-gray-700 text-gray-300"
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
