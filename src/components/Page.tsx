import type { ReactNode } from "react";

interface PageProps {
  children: ReactNode;
}

export default function Page({ children }: PageProps) {
  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      { children }
    </div>
  );
}