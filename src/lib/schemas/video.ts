import { z } from "zod";

export const createVideoSchema = z.object({
  title: z
    .string()
    .min(1, "Título é obrigatório")
    .max(200, "Título deve ter no máximo 200 caracteres"),
  description: z
    .string()
    .min(1, "Descrição é obrigatória")
    .max(1000, "Descrição deve ter no máximo 1000 caracteres"),
  duration: z
    .number()
    .int("Duração deve ser um número inteiro")
    .positive("Duração deve ser maior que zero")
    .max(86400, "Duração não pode exceder 24 horas"),
});

export const updateVideoSchema = createVideoSchema;

export type CreateVideoFormData = z.infer<typeof createVideoSchema>;
export type UpdateVideoFormData = z.infer<typeof updateVideoSchema>;
