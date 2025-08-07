'use client';

import React, { useEffect, useRef, useState } from 'react';
import './CodeBlocks.scss';

type CodeBlockProps = {
  code: string;
};

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const preRef = useRef<HTMLPreElement>(null);
  const [visualLines, setVisualLines] = useState(1);

  useEffect(() => {
    const calculateLines = () => {
      if (preRef.current) {
        const lineHeight = parseFloat(
          getComputedStyle(preRef.current).lineHeight
        );

        const height = preRef.current.clientHeight;
        const numLines = Math.max(1, Math.round(height / lineHeight));
        setVisualLines(numLines);
      }
    };

    calculateLines();

    window.addEventListener('resize', calculateLines);
    return () => window.removeEventListener('resize', calculateLines);
  }, [code]);

  return (
    <div className="code-container">
      <div className="line-numbers">
        {Array.from({ length: visualLines }).map((_, i) => (
          <span key={i}>{i + 1}</span>
        ))}
      </div>
      <pre ref={preRef} className="code-content">
        {code}
      </pre>
    </div>
  );
};

export default CodeBlock;
