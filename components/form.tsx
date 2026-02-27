"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface SIAFormProps {
  onSubmit: (data: {
    name: string;
    email: string;
    description: string;
  }) => void;
}

export function SIAForm({ onSubmit }: SIAFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e: any) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !description.trim()) return;
    onSubmit({ name, email, description });
  }

  return (
    <Card className="shadow-md w-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Envie sua oportunidade</CardTitle>
        <CardDescription>
          Preencha os dados abaixo para que a SIA analise seu terreno.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="nome">Nome do Corretor</Label>
            <Input
              id="name"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">{"Descrição do Terreno"}</Label>
            <Textarea
              id="description"
              placeholder={
                "Ex: Tenho um terreno de 500m2 em Florianópolis, frente mar, por 2 milhões"
              }
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="resize-none"
            />
          </div>

          <Button type="submit" size="lg" className="mt-1 gap-2">
            <Send className="h-4 w-4" />
            {"Enviar para Análise da SIA"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
