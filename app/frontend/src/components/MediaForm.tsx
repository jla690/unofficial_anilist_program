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
      <div>
        <label
          htmlFor="episodeid"
          className="mx-2 block text-sm font-medium mb-1"
        >
          Chapters/Episodes:
        </label>
        <input
          id="episodeid"
          className="bg-gray-700 rounded-lg px-1 mx-2 max-w-15"
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
      <label className="mx-2">
        Status:
        <select
          className="bg-gray-700 rounded-lg px-1 mx-2"
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
      </label>
      <label className="mx-2">
        Score:
        <input
          className="bg-gray-700 rounded-lg px-1 mx-2 max-w-15"
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
      </label>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
        type="submit"
      >
        Save
      </button>
    </form>
  );
};

export default MediaForm;
