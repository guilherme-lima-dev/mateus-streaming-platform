"use client";

import { useState, FormEvent } from "react";
import { createVideoSchema, updateVideoSchema } from "@/lib/schemas/video";
import type { CreateVideoFormData, UpdateVideoFormData } from "@/lib/schemas/video";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/Button";

interface VideoFormProps {
  initialData?: {
    title: string;
    description: string;
    duration: number;
  };
  onSubmit: (data: CreateVideoFormData | UpdateVideoFormData) => Promise<void>;
  isLoading?: boolean;
  submitLabel?: string;
}

export function VideoForm({
  initialData,
  onSubmit,
  isLoading = false,
  submitLabel = "Salvar",
}: VideoFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [durationMinutes, setDurationMinutes] = useState<number>(
    initialData ? Math.floor(initialData.duration / 60) : 0
  );
  const [durationSeconds, setDurationSeconds] = useState<number>(
    initialData ? initialData.duration % 60 : 0
  );

  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    duration?: string;
  }>({});

  const schema = initialData ? updateVideoSchema : createVideoSchema;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const totalSeconds = durationMinutes * 60 + durationSeconds;
    const formData = {
      title,
      description,
      duration: totalSeconds,
    };

    const validationResult = schema.safeParse(formData);
    
    if (!validationResult.success) {
      const fieldErrors: typeof errors = {};
      validationResult.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0] as keyof typeof fieldErrors] = error.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    if (totalSeconds === 0) {
      setErrors({ duration: "A duração deve ser maior que zero" });
      return;
    }

    setErrors({});
    await onSubmit(validationResult.data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Título"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (errors.title) setErrors({ ...errors, title: undefined });
        }}
        error={errors.title}
        placeholder="Digite o título do vídeo"
      />

      <Textarea
        label="Descrição"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          if (errors.description) setErrors({ ...errors, description: undefined });
        }}
        error={errors.description}
        placeholder="Digite a descrição do vídeo"
        rows={5}
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Minutos
          </label>
          <input
            type="number"
            min="0"
            max="1440"
            value={durationMinutes}
            onChange={(e) => {
              setDurationMinutes(parseInt(e.target.value) || 0);
              if (errors.duration) setErrors({ ...errors, duration: undefined });
            }}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Duração em minutos"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Segundos
          </label>
          <input
            type="number"
            min="0"
            max="59"
            value={durationSeconds}
            onChange={(e) => {
              setDurationSeconds(parseInt(e.target.value) || 0);
              if (errors.duration) setErrors({ ...errors, duration: undefined });
            }}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Duração em segundos"
          />
        </div>
      </div>

      {errors.duration && (
        <p className="text-sm text-red-500">{errors.duration}</p>
      )}

      <div className="flex gap-4">
        <Button type="submit" isLoading={isLoading}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
