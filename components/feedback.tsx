"use client";

import clsx from "clsx";
import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  Info,
  RotateCcw,
  UserPlus,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { IncompleteCardProps } from "@/lib/types";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";

interface FeedbackCardProps {
  message?: string;
  onReset: () => void;
}

export function SuccessCard({ message, onReset }: FeedbackCardProps) {
  return (
    <Card className="border-success/30 bg-success/5 shadow-sm w-md lg:w-lg">
      <CardContent className="flex flex-col items-center gap-4 p-6 text-center md:p-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/15">
          <CheckCircle2 className="h-7 w-7 text-success" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-foreground">
            Prioridade Alta
          </h3>
          <p className="max-w-sm leading-relaxed text-muted-foreground">
            {message}
          </p>
        </div>
        <Button variant="outline" className="mt-2" onClick={onReset}>
          Enviar nova proposta
        </Button>
      </CardContent>
    </Card>
  );
}

export function InfoCard({ message, onReset }: FeedbackCardProps) {
  return (
    <Card className="border-ui-blue-secondary/30 bg-ui-blue-secondary/5 shadow-sm w-md lg:w-lg">
      <CardContent className="flex flex-col items-center gap-4 p-6 text-center md:p-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ui-blue-secondary/15">
          <Info className="h-7 w-7 text-ui-blue-secondary" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-ui-theme">
            Fora da Região de Operação
          </h3>
          <p className="max-w-sm leading-relaxed text-muted-foreground">
            {message}
          </p>
        </div>
        <Button variant="outline" className="mt-2" onClick={onReset}>
          Enviar nova proposta
        </Button>
      </CardContent>
    </Card>
  );
}

interface RegistrationCardProps {
  email: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function RegistrationCard({
  email,
  onConfirm,
  onCancel,
}: RegistrationCardProps) {
  return (
    <Card className="border-warning/30 bg-warning/5 shadow-sm w-md lg:w-lg">
      <CardContent className="flex flex-col items-center gap-4 p-6 text-center md:p-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-warning/15">
          <UserPlus className="h-7 w-7 text-warning" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-ui-theme">
            Cadastro Necessário
          </h3>
          <p className="max-w-sm leading-relaxed text-ui-muted">
            {
              "Vi que você ainda não é cadastrado. Podemos usar este e-mail para registrar sua proposta?"
            }
          </p>
          <p className="mt-1 text-sm font-medium text-foreground">{email}</p>
        </div>
        <div className="mt-2 flex gap-3">
          <Button onClick={onConfirm}>Confirmar cadastro</Button>
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function IncompleteCard({
  missingFields,
  knownData,
  onComplete,
  onReset,
}: IncompleteCardProps) {
  const [inputValue, setInputValue] = useState("");

  const extractedFields = useMemo(() => {
    return [
      { label: "Localização", value: knownData.city },
      {
        label: "Área (m²)",
        value: knownData.area ? `${knownData.area}m²` : null,
      },
      {
        label: "Valor",
        value: knownData.suggested_price
          ? `R$ ${knownData.suggested_price.toLocaleString("pt-BR")}`
          : null,
      },
    ];
  }, [knownData]);

  function handleSubmit(e: any) {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onComplete({ new_info: inputValue.trim(), knownData });
    setInputValue("");
  }

  return (
    <div className="flex w-full flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="border-warning/30 bg-warning/5 shadow-sm w-md lg:w-lg">
        <CardContent className="flex flex-col gap-5 p-6 md:p-8">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-warning/15">
              <AlertCircle className="h-5 w-5 text-warning" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-semibold text-foreground">
                Refinamento de Dados
              </h3>
              <p className="text-sm leading-relaxed text-ui-muted">
                {
                  "A SIA ainda não consegue dar um veredito. Preciso que você informe: "
                }
                <span className="font-semibold text-primary">
                  {missingFields}
                </span>
                .
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Dados conhecidos
            </p>
            <div className="flex flex-wrap gap-2">
              {extractedFields.map((field) => (
                <Badge
                  key={field.label}
                  variant={field.value ? "secondary" : "outline"}
                  className={clsx("gap-1.5 border", {
                    "border-success/30 bg-success/10 text-success": field.value,
                    "border-destructive/30 bg-destructive/5 text-destructive":
                      !field.value,
                  })}
                >
                  {field.value ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <X className="h-3 w-3" />
                  )}
                  {field.label}: {field.value ?? "Nao identificado"}
                </Badge>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Informar {missingFields}
            </p>
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`Digite aqui: ${missingFields.toLowerCase()}...`}
                className="flex-1 bg-card"
                autoFocus
              />
              <Button
                type="submit"
                className="shrink-0 gap-1.5"
                disabled={!inputValue.trim()}
              >
                Completar Análise
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>

          <Button
            variant={"outline"}
            onClick={onReset}
            className="self-center bg-transparent text-ui-muted text-xs hover:bg-transparent hover:text-accent border-none shadow-none"
          >
            <RotateCcw className="w-3! h-3!" />
            Reiniciar Análise
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
