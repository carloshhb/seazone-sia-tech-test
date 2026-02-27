"use client";

import { useCallback, useRef, useState } from "react";
import {
  IncompleteCard,
  InfoCard,
  RegistrationCard,
  SuccessCard,
} from "@/components/feedback";
import { SIAForm } from "@/components/form";
import { SIAHeader } from "@/components/header";
import { SIALoading } from "@/components/loading";
import type { MissingDataFieldsResponse, MissingDataResult } from "@/lib/types";

type ViewState =
  | "form"
  | "loading"
  | "success"
  | "info"
  | "registration"
  | "registered"
  | "incomplete";

export default function Home() {
  const [view, setView] = useState<ViewState>("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });
  const [apiResponse, setApiResponse] = useState<MissingDataResult>({
    action: "",
    knownData: { area: null, city: null, suggested_price: null },
    missingFields: "",
    siaDecision: "",
  });
  const [message, setMessage] = useState("");
  const isSubmitting = useRef(false);

  const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL!;

  const executeSiaFlow = async (payload: any) => {
    if (isSubmitting.current) return;

    isSubmitting.current = true;
    setView("loading");

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.action === "pending_registration") {
        setView("registration");
      } else if (result.action === "missing_information") {
        setApiResponse(result);
        setView("incomplete");
      } else {
        setMessage(result.message);
        setView(result.priority === "high" ? "success" : "info");
      }
    } catch (error) {
      console.error("Erro no fluxo da Sia:", error);
      // setView("error");
    } finally {
      isSubmitting.current = false;
    }
  };

  const handleSubmit = useCallback(
    (data: { name: string; email: string; description: string }) => {
      setFormData(data);
      executeSiaFlow({ ...data, action: "initial_check" });
    },
    [],
  );

  const handleReset = useCallback(() => {
    setView("form");
    setFormData({ name: "", email: "", description: "" });
    setMessage("");
  }, []);

  const handleConfirmRegistration = useCallback(() => {
    setView("loading");
    executeSiaFlow({ ...formData, action: "confirm_registration" });
  }, [formData]);

  const handleCompleteInformation = useCallback(
    (data: MissingDataFieldsResponse) => {
      setView("loading");
      executeSiaFlow({
        ...formData,
        new_info: data.new_info,
        knownData: data.knownData,
        action: "refine_data",
      });
    },
    [formData],
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SIAHeader />
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-start px-4 py-8 md:py-8">
        {view === "form" ? <SIAForm onSubmit={handleSubmit} /> : null}
        {view === "loading" ? <SIALoading /> : null}
        {view === "success" && (
          <SuccessCard message={message} onReset={handleReset} />
        )}
        {view === "info" && (
          <InfoCard message={message} onReset={handleReset} />
        )}
        {view === "registration" && (
          <RegistrationCard
            email={formData.email}
            onConfirm={handleConfirmRegistration}
            onCancel={handleReset}
          />
        )}
        {view === "incomplete" && (
          <IncompleteCard
            knownData={apiResponse?.knownData}
            missingFields={apiResponse?.missingFields}
            siaDecision={apiResponse?.siaDecision}
            onReset={handleReset}
            onComplete={handleCompleteInformation}
          />
        )}
      </main>
      <footer className="border-t border-border bg-card py-4 text-center text-xs text-muted-foreground">
        {"SIA · Seazone Inteligência de Expansão"}
      </footer>
    </div>
  );
}
