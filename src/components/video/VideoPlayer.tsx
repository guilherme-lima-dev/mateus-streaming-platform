interface VideoPlayerProps {
  videoId: string;
  title: string;
}

export function VideoPlayer({ videoId, title }: VideoPlayerProps) {
  return (
    <div className="w-full aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-4">
          <svg
            className="w-20 h-20 text-gray-600 mx-auto"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        </div>
        <p className="text-gray-400 text-lg">Player será implementado</p>
        <p className="text-gray-500 text-sm mt-2">{title}</p>
      </div>
    </div>
  );
}
