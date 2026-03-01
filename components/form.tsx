"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { type SIAFormData, siaFormSchema } from "@/lib/formSchema";

interface SIAFormProps {
  onSubmit: (data: {
    name: string;
    email: string;
    description: string;
  }) => void;
}

export function SIAForm({ onSubmit }: SIAFormProps) {
  const form = useForm<SIAFormData>({
    resolver: zodResolver(siaFormSchema),
    defaultValues: {
      name: "",
      email: "",
      description: "",
    },
  });

  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [description, setDescription] = useState("");

  // function handleSubmit(e: any) {
  //   e.preventDefault();
  //   if (!name.trim() || !email.trim() || !description.trim()) return;
  //   onSubmit({ name, email, description });
  // }

  return (
    <Card className="shadow-md w-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Envie sua oportunidade</CardTitle>
        <CardDescription>
          Preencha os dados abaixo para que a SIA analise seu terreno.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="name"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Corretor</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="email"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="description"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição do Terreno</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ex: Tenho um terreno de 500m2 em Florianópolis, frente mar, por 2 milhões"
                        rows={4}
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="mt-1 gap-2"
              disabled={form.formState.isSubmitting}
            >
              <Send className="h-4 w-4" />
              {form.formState.isSubmitting
                ? "Enviando..."
                : "Enviar para Análise da SIA"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
