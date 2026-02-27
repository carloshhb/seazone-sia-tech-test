"use client";

import { TypewriterText } from "./typewriter";

export function SIALoading() {
  return (
    <div className="flex flex-col items-center gap-6 py-12">
      <div className="relative flex h-24 w-24 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-ui-blue-secondary/20" />
        <span
          className="absolute inset-2 rounded-full bg-ui-blue-secondary/15"
          style={{
            animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite 0.3s",
          }}
        />
        <span
          className="absolute inset-4 rounded-full bg-ui-blue-secondary/10"
          style={{
            animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite 0.6s",
          }}
        />
        <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary shadow-lg">
          <svg
            className="h-5 w-5 animate-spin text-primary-foreground"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="text-base font-medium text-foreground">
          SIA está processando os dados...
        </p>
        <TypewriterText />
      </div>
    </div>
  );
}
