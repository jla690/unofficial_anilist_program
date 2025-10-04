import React from "react";

interface Props {
  savingFunc: () => Promise<void>;
  score: number | null;
  progress: number | null;
  status: string | null;
  setProgress: React.Dispatch<React.SetStateAction<number | null>>;
  setStatus: React.Dispatch<React.SetStateAction<string | null>>;
  setScore: React.Dispatch<React.SetStateAction<number | null>>;
}

const MediaForm = ({
  savingFunc,
  score,
  progress,
  status,
  setProgress,
  setScore,
  setStatus,
}: Props) => {
  return (
    <form
      className="mt-6 space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        savingFunc();
      }}
    >
      {/* Episodes */}
      <div>
        <label
          htmlFor="episodeId"
          className="mx-2 block text-sm font-medium mb-1 text-left pl-5"
        >
          Chapters/Episodes:
        </label>
        <input
          id="episodeId"
          className="bg-gray-700 px-1 w-[11.75rem] rounded-sm"
          type="number"
          name="progress"
          placeholder="Progress"
          min={0}
          value={progress ?? ""}
          onChange={(e) => {
            const val = e.target.value;
            setProgress(val === "" ? null : Number(val));
          }}
        />
      </div>

      {/* Status */}
      <div>
        <label
          className="mx-2 block text-sm font-medium mb-1 text-left pl-5"
          htmlFor="statusId"
        >
          Status:
        </label>
        <select
          id="statusId"
          className="bg-gray-700 px-1 w-[11.75rem] rounded-sm"
          name="status"
          value={status ?? ""}
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
      </div>
      <div>
        <label
          className="mx-2 block text-sm font-medium mb-1 text-left pl-5"
          htmlFor="scoreId"
        >
          Score:
        </label>
        <input
          id="scoreId"
          className="bg-gray-700 px-1 w-[11.75rem] rounded-sm"
          type="number"
          name="score"
          placeholder="Score"
          min={0}
          max={10}
          step={1}
          value={score ?? ""}
          onChange={(e) => {
            const val = e.target.value;
            setScore(val === "" ? null : Number(val));
          }}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm mb-5 font-medium"
        type="submit"
      >
        Save
      </button>
    </form>
  );
};

export default MediaForm;
