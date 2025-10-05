interface UserStatusBadgeProps {
  status: string | null;
}

const UserStatusBadge = ({ status }: UserStatusBadgeProps) => {
  return (
    <span
      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
        status === "CURRENT"
          ? "bg-purple-700 text-gray-300"
          : status === "PLANNING"
            ? "bg-blue-700 text-gray-300"
            : status === "PAUSED"
              ? "bg-pink-500/70 text-gray-300"
              : status === "COMPLETED"
                ? "bg-green-700 text-gray-300"
                : status === "DROPPED"
                  ? "bg-red-700 text-gray-300"
                  : "bg-gray-500 text-gray-300"
      }`}
    >
      {status ?? "NO USER ACTIVITY"}
    </span>
  );
};

export default UserStatusBadge;
