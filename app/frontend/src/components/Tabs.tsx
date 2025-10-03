interface Props {
  type: string;
}

const Tabs = ({ type }: Props) => {
  return (
    <div className="text-sm font-medium text-center text-gray-400 border-b border-gray-600">
      <ul className="flex flex-wrap -mb-px justify-center">
        <li className="me-2">
          <a
            href="/lists?type=ANIME"
            aria-current={type === "ANIME" ? "page" : undefined}
            className={
              "inline-block p-4 border-b-2 rounded-t-lg " +
              (type === "ANIME"
                ? "text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500"
                : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300")
            }
          >
            Anime
          </a>
        </li>
        <li className="me-2">
          <a
            href="/lists?type=MANGA"
            aria-current={type === "MANGA" ? "page" : undefined}
            className={
              "inline-block p-4 border-b-2 rounded-t-lg " +
              (type === "MANGA"
                ? "text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500"
                : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300")
            }
          >
            Manga
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Tabs;
