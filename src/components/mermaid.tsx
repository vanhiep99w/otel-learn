'use client';

import { useEffect, useId, useRef, useState } from 'react';

type MermaidProps = {
  chart: string;
};

function isDarkMode() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function Mermaid({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function renderChart() {
      try {
        const { default: mermaid } = await import('mermaid');
        const dark = isDarkMode();

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: dark ? 'dark' : 'default',
        });

        const { svg, bindFunctions } = await mermaid.render(
          `mermaid-${id}`,
          chart,
        );

        if (cancelled || !containerRef.current) return;

        containerRef.current.innerHTML = svg;
        bindFunctions?.(containerRef.current);
        setError(null);
      } catch (cause) {
        if (cancelled) return;

        setError(cause instanceof Error ? cause.message : 'Không thể render Mermaid diagram.');
      }
    }

    renderChart();

    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  if (error) {
    return (
      <details className="my-4 rounded-lg border p-4">
        <summary className="cursor-pointer text-sm font-medium">
          Không thể render diagram
        </summary>
        <p className="mt-2 text-sm text-red-600">{error}</p>
        <pre className="mt-3 overflow-x-auto text-sm">
          <code>{chart}</code>
        </pre>
      </details>
    );
  }

  return (
    <div
      ref={containerRef}
      className="my-6 flex min-h-12 justify-center overflow-x-auto rounded-lg border p-4 [&_svg]:max-w-full"
      role="img"
      aria-label="Mermaid diagram"
    />
  );
}
