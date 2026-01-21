interface EmptyStateProps {
  message: string;
  icon?: string;
}

export function EmptyState({ message, icon = "📭" }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <div className="text-6xl">{icon}</div>
      <p className="text-gray-400 text-center text-lg">{message}</p>
    </div>
  );
}
