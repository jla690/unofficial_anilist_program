import React from "react";

interface MediaFormProps {
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
}: MediaFormProps) => {
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
          className="mx-2 block text-sm font-medium mb-1 text-left pl-5 cursor-auto"
        >
          Chapters/Episodes:
        </label>
        <input
          id="episodeId"
          className="bg-slate-600 px-1 w-[11.75rem] rounded-md block mx-auto text-gray-300"
          type="number"
          name="progress"
          placeholder=""
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
          className="mx-2 block text-sm font-medium mb-1 text-left pl-5 cursor-auto"
          htmlFor="statusId"
        >
          Status:
        </label>
        <select
          id="statusId"
          className="bg-slate-600 w-[11.75rem] rounded-sm block mx-auto appearance-none text-gray-300"
          name="status"
          value={status ?? ""}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">None</option>
          <option value="CURRENT">CURRENT</option>
          <option value="PLANNING">PLANNING</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="PAUSED">PAUSED</option>
          <option value="DROPPED">DROPPED</option>
          <option value="REPEATING">REPEATING</option>
        </select>
      </div>

      {/* Score */}
      <div className="">
        <label
          className="mx-2 block text-sm font-medium mb-1 text-left pl-5 cursor-auto"
          htmlFor="scoreId"
        >
          Score:
        </label>
        <input
          id="scoreId"
          className="bg-slate-600 px-1 w-[11.75rem] rounded-sm block mx-auto text-gray-300"
          type="number"
          name="score"
          placeholder=""
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
        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm mb-5 font-medium block mx-auto"
        type="submit"
      >
        Save
      </button>
    </form>
  );
};

export default MediaForm;
