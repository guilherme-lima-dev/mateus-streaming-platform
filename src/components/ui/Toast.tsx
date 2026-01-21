"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
}

export function Toast({
  message,
  type = "info",
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const colors = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
  };

  return (
    <div
      className={`fixed bottom-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-up`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-center justify-between gap-4">
        <p>{message}</p>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 focus:outline-none"
          aria-label="Fechar notificação"
        >
          ×
        </button>
      </div>
    </div>
  );
}
