import * as z from "zod";

export const siaFormSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Insira um endereço de e-mail válido.",
  }),
  description: z.string().min(10, {
    message:
      "A descrição do terreno deve ser mais detalhada (mín. 10 caracteres).",
  }),
});

export type SIAFormData = z.infer<typeof siaFormSchema>;
