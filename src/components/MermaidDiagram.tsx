"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import mermaid from "mermaid";

interface MermaidProps {
  chart: string;
  className?: string;
}

export function MermaidDiagram({ chart, className = "" }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: theme === "dark" ? "dark" : "default",
      securityLevel: "loose",
      darkMode: theme === "dark",
      themeVariables: {
        fontFamily: "inter",
        fontSize: "16px",
        primaryTextColor: theme === "dark" ? "#ffffff" : "#000000",
        lineColor: theme === "dark" ? "#60a5fa" : "#2563eb",
        mainBkg: theme === "dark" ? "#1e293b" : "#ffffff",
        nodeBorder: theme === "dark" ? "#60a5fa" : "#2563eb",
        clusterBkg: theme === "dark" ? "#1e293b" : "#ffffff",
        titleColor: theme === "dark" ? "#ffffff" : "#000000",
      },
      flowchart: {
        htmlLabels: true,
        curve: "basis",
        nodeSpacing: 50,
        rankSpacing: 50,
      },
    });

    const renderDiagram = async () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
        const id = "mermaid-" + Math.random().toString(36).substr(2, 9);
        try {
          const { svg } = await mermaid.render(id, chart);
          containerRef.current.innerHTML = svg;
        } catch (error) {
          console.error("Error rendering Mermaid diagram:", error);
          containerRef.current.innerHTML = "Error rendering diagram";
        }
      }
    };

    renderDiagram();
  }, [chart, theme]);

  return (
    <div
      className={`${className} [&_svg]:max-w-full [&_.edge-pattern]:stroke-2`}
      ref={containerRef}
    />
  );
}
