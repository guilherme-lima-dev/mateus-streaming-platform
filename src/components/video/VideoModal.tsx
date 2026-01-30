"use client";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function VideoModal({ isOpen, onClose, children }: VideoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      <div className="relative w-full max-w-4xl px-4">

        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-2xl"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
