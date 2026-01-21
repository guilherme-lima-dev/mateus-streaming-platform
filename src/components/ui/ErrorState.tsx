import { Button } from "./Button";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = "Ocorreu um erro ao carregar os dados.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <div className="text-red-500 text-6xl">⚠️</div>
      <p className="text-gray-300 text-center">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="primary">
          Tentar novamente
        </Button>
      )}
    </div>
  );
}
