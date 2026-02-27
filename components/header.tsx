"use client";

export function SIAHeader() {
  return (
    <header className="w-full border-b border-border bg-card">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-2 px-4 py-6 text-center md:py-12">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight text-ui-theme md:text-3xl">
            {"SIA: Inteligência de Expansão Seazone"}
          </h1>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-ui-muted md:text-base">
          Portal para corretores parceiros enviarem oportunidades de terrenos
        </p>
      </div>
    </header>
  );
}
