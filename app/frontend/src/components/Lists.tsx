import React, { useEffect, useState, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import BaseLayout from "./BaseLayout";
import api from "../api";
import type { User, UserListItem } from "../types";
import Tabs from "./Tabs";
import ListResults from "./ListResults";

interface Props {
  user: User | null;
}

const Lists = ({ user }: Props) => {
  const [lists, setLists] = useState<UserListItem[] | null>(null);
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "ANIME";

  const fetchLists = async () => {
    try {
      const response = await api.get("/lists", {
        params: { type: type },
      });
      setLists(response.data.lists);
    } catch (error) {
      console.log(error);
      setLists(null);
    }
  };

  useEffect(() => {
    fetchLists();
  }, [type]);

  return (
    <BaseLayout user={user}>
      <h2 className="text-2xl text-gray-300 font-bold mb-6">My Lists</h2>
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <Tabs type={type}></Tabs>
        {lists ? (
          <ListResults lists={lists}></ListResults>
        ) : (
          <p className="mt-6 muted text-gray-300">Loading...</p>
        )}
      </div>
    </BaseLayout>
  );
};

export default Lists;
