import React from "react";
import type { Tag } from "../types";

interface TagsProps {
  tags: Tag[] | null;
}

const Tags = ({ tags }: TagsProps) => {
  return (
    <div>
      <h1 className="font-bold text-center my-5">Tags</h1>
      {tags &&
        tags.map((tag) => (
          <section key={tag.name} className="flex justify-between mx-3 my-1">
            <div>{tag.name}</div>
            <div className="">{tag.rank + "%"}</div>
          </section>
        ))}
    </div>
  );
};

export default Tags;
