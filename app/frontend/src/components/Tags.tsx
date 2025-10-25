import React from "react";
import type { Tag } from "../types";

interface TagsProps {
  tags: Tag[] | null;
}

const Tags = ({ tags }: TagsProps) => {
  return (
    <div>
      <h1 className="font-medium text-center my-5 text-gray-300">Tags</h1>
      {tags &&
        tags.map((tag) => (
          <section
            key={tag.name}
            className="bg-slate-600 flex justify-between mx-3 my-2 px-2 rounded-md text-gray-300 hover:text-blue-400 transition duration-300"
          >
            <div>{tag.name}</div>
            <div className="">{tag.rank + "%"}</div>
          </section>
        ))}
    </div>
  );
};

export default Tags;
