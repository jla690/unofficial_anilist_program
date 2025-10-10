import { useEffect, useState } from "react";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import BaseLayout from "./BaseLayout";
import type {
  Character,
  Recommendation,
  Media,
  User,
  Tag,
  MediaStats,
} from "../types";
import api from "../api";
import { useParams } from "react-router-dom";
import UserStatusBadge from "./UserStatusBadge";
import MediaForm from "./MediaForm";
import Characters from "./Characters";
import Recommendations from "./Recommendations";
import Tags from "./Tags";
import ScoreDistribution from "./ScoreDistribution";
import StatusDistribution from "./StatusDistribution";

interface MediaDetailProps {
  user: User | null;
}

const MediaDetail = ({ user }: MediaDetailProps) => {
  const [media, setMedia] = useState<Media | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [recommendations, setRecommendations] = useState<
    Recommendation[] | null
  >(null);
  const [characters, setCharacters] = useState<Character[] | null>(null);
  const [tags, setTags] = useState<Tag[] | null>(null);
  const [stats, setStats] = useState<MediaStats | null>(null);

  const mediaParams = useParams<{ media_id: string }>();

  useEffect(() => {
    const fetchMediaDetails = async () => {
      try {
        const response = await api.get("/media_detail/" + mediaParams.media_id);
        setMedia(response.data);
        console.log(response.data);
        setCharacters(
          response.data.media.characters.edges.map((edge: any) => ({
            image: edge.node.image.large,
            name: edge.node.name.full,
            role: edge.role,
          })),
        );
        setRecommendations(
          response.data.media.recommendations.edges.map((edge: any) => ({
            id: edge.node.mediaRecommendation.id,
            title: edge.node.mediaRecommendation.title,
            coverImage: edge.node.mediaRecommendation.coverImage,
          })),
        );
        setProgress(response.data.user_data?.progress ?? null);
        setStatus(response.data.user_data?.status ?? null);
        setScore(response.data.user_data?.score ?? null);
        setTags(response.data.media.tags);
        setStats(response.data.media.stats);
        console.log(response.data.media.stats);
        console.log(status);
      } catch (error) {
        console.log(error);
        setMedia(null);
      }
    };

    if (!media) {
      fetchMediaDetails();
    }
  }, [media, mediaParams.media_id]);

  const appendIfExists = (
    bodyFormData: FormData,
    key: string,
    value: number | string | null,
  ) => {
    if (value != null) bodyFormData.append(key, value.toString());
  };

  const handleSaving = async () => {
    var bodyFormData = new FormData();
    appendIfExists(bodyFormData, "progress", progress);
    appendIfExists(bodyFormData, "status", status);
    appendIfExists(bodyFormData, "score", score);
    try {
      console.log(score);
      const response = await api.post(
        "/api/post/" + media?.media.id + "/progress",
        bodyFormData,
      );
      console.log(response.data);
      if (response.data.success) {
        alert("Successfully Saved");
      } else {
        alert("Error when saving");
      }
    } catch (error) {
      console.log(error);
      alert("Did not successfully save");
    }
  };

  return (
    <BaseLayout user={user}>
      {/* Image */}
      <article className="bg-gray-800 rounded-sm max-h-full grid grid-cols-10">
        <div className="col-span-3 pl-5 pt-5 mb-5 pr-5">
          <img
            alt="Cover"
            className="w-full rounded-lg object-cover shadow-gray-900 shadow-lg"
            src={media?.media.coverImage.extraLarge || undefined}
          />
        </div>

        {/* Title */}
        <div className="col-span-7">
          <h1 className="text-center font-bold mb-5 mt-5 text-3xl px-5 text-gray-300">
            {media?.media.title.english ||
              media?.media.title.romaji ||
              media?.media.title.native ||
              ""}
          </h1>

          {/* Badges */}
          <div className="flex justify-center gap-2">
            {
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-500 text-gray-100">
                {"SITE SCORE: " + (media?.media.meanScore ?? "N/A")}
              </span>
            }
            {<UserStatusBadge status={status}></UserStatusBadge>}
            {media?.media.type && (
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-500 text-gray-100">
                {media.media.type}
              </span>
            )}
            {media?.media.countryOfOrigin && (
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-500 text-gray-100">
                {media.media.countryOfOrigin +
                  " " +
                  getUnicodeFlagIcon(media.media.countryOfOrigin)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="mt-8 mb-8 mx-8 text-left bg-gray-700 rounded-sm px-5 py-5 text-gray-300">
            {media?.media.description
              ? media?.media.description.replace(/<[^>]+>/g, "")
              : "No description available."}
          </p>

          {/* Genre badges */}
          <div className="mb-8">
            <label className="flex justify-center gap-2 font-medium text-bold text-gray-300">
              Genres:
              {media?.media.genres && (
                <p className="genres">
                  {media.media.genres.map((g) => (
                    <span
                      className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-500 justify-center mx-1 mb-5 text-white"
                      key={g}
                    >
                      {g}
                    </span>
                  ))}
                </p>
              )}
            </label>
          </div>

          <div className="flex justify-center text-gray-300">
            {/* Episodes, might get rid of this */}
            <p className="mb-6 mx-5">
              {media?.media.episodes && (
                <div className="font-medium">
                  {"Episodes: " + media?.media.episodes}
                </div>
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

            {/* AniList link */}
            {media?.media.siteUrl && (
              <p>
                <a
                  className="text-blue-500 hover:text-blue-600 font-medium"
                  href={media.media.siteUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  View on AniList →
                </a>
              </p>
            )}
          </div>
        </div>
      </article>

      {/* Forms */}
      <section className="mt-5 grid grid-cols-10 text-gray-300">
        <div className="col-span-2 bg-gray-800 rounded-sm">
          <MediaForm
            setProgress={setProgress}
            setScore={setScore}
            setStatus={setStatus}
            score={score}
            status={status}
            progress={progress}
            savingFunc={handleSaving}
          ></MediaForm>
        </div>

        {/* Characters */}
        <div className="col-span-8 bg-gray-800 rounded-sm ml-5">
          <Characters characters={characters}></Characters>
        </div>
      </section>

      <section className="overflow-hidden grid grid-cols-10 mt-5">
        {/* Tags */}
        <div className="col-span-2">
          <Tags tags={tags}></Tags>
        </div>
        {/* Recommendations */}
        <div className="bg-gray-800 rounded-sm col-span-8 ml-5 text-gray-300">
          <Recommendations recommendations={recommendations}></Recommendations>
        </div>
      </section>
      <section className="flex gap-x-5 mt-5">
        <ScoreDistribution stats={stats}></ScoreDistribution>
        <StatusDistribution stats={stats}></StatusDistribution>
      </section>
    </BaseLayout>
  );
};

export default MediaDetail;
