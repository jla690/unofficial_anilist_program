import React, { useEffect, useState } from "react";
import BaseLayout from "./BaseLayout";
import type { Media, User } from "../types";
import api from "../api";
import { useParams } from "react-router-dom";

interface Props {
  user: User | null;
}

const MediaDetail = ({ user }: Props) => {
  const [media, setMedia] = useState<Media | null>(null);
  const [progress, setProgress] = useState<number | undefined>(undefined);
  const [status, setStatus] = useState<string>("");
  const [score, setScore] = useState<number | undefined>(undefined);

  const mediaParams = useParams<{ media_id: string }>();

  const fetchMediaDetails = async () => {
    try {
      console.log(mediaParams);
      const response = await api.get("/media_detail/" + mediaParams.media_id);
      console.log(response.data);
      setMedia(response.data);
    } catch (error) {
      console.log(error);
      setMedia(null);
    }
  };

  useEffect(() => {
    if (!media) {
      fetchMediaDetails();
    }
  }, [media]);
  return (
    <BaseLayout user={user}>
      <article className="detail">
        <div className="detail-header">
          <img
            alt="Cover"
            className="detail-cover"
            src={
              media?.media.coverImage.extraLarge ||
              media?.media.coverImage?.extraLarge ||
              ""
            }
          />
          <div className="detail-info">
            <h1>
              {media?.media.title.english ||
                media?.media.title.romaji ||
                media?.media.title.native ||
                ""}
            </h1>
            <div className="badge-line">
              {media?.media.meanScore && (
                <span className="badge score">{media.media.meanScore}</span>
              )}
              {media?.user_data.status && (
                <span
                  className={`badge status-${media.user_data.status.toLowerCase()}`}
                >
                  {media.user_data.status}
                </span>
              )}
              {media?.media.type && (
                <span className="badge">{media.media.type}</span>
              )}
            </div>
            <p className="detail-desc">
              {media?.media.description
                ? media?.media.description
                    .replace(/<[^>]+>/g, "")
                    .slice(0, 400) +
                  (media?.media.description.length > 400 ? "…" : "")
                : ""}
            </p>
            <p className="meta-line">
              {media?.media.episodes && (
                <span>
                  <strong>Episodes:</strong> {media.media.episodes}
                </span>
              )}
              {media?.media.chapters && (
                <span>
                  {" "}
                  <strong>Chapters:</strong> {media.media.chapters}
                </span>
              )}
              {media?.media.volumes && (
                <span>
                  {" "}
                  <strong>Volumes:</strong> {media.media.volumes}
                </span>
              )}
            </p>
            {media?.media.genres && (
              <p className="genres">
                {media.media.genres.map((g) => (
                  <span className="tag" key={g}>
                    {g}
                  </span>
                ))}
              </p>
            )}
            <form
              className="inline-form"
              onSubmit={(e) => {
                e.preventDefault();
                // handle save logic here
              }}
            >
              <input
                type="number"
                name="progress"
                placeholder="Progress"
                min={0}
                value={progress ?? ""}
                onChange={(e) => setProgress(Number(e.target.value))}
              />
              <select
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Status</option>
                <option value="CURRENT">CURRENT</option>
                <option value="PLANNING">PLANNING</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="PAUSED">PAUSED</option>
                <option value="DROPPED">DROPPED</option>
                <option value="REPEATING">REPEATING</option>
              </select>
              <input
                type="number"
                name="score"
                placeholder="Score"
                min={0}
                max={100}
                step={1}
                value={score ?? ""}
                onChange={(e) => setScore(Number(e.target.value))}
              />
              <button className="btn small primary" type="submit">
                Save
              </button>
            </form>
            {media?.media.siteUrl && (
              <p>
                <a
                  className="external-link"
                  href={media.media.siteUrl}
                  rel="noopener"
                  target="_blank"
                >
                  View on AniList →
                </a>
              </p>
            )}
          </div>
        </div>
      </article>
    </BaseLayout>
  );
};

export default MediaDetail;
