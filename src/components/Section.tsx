import React, { ReactNode } from 'react';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export default function Section({ id, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`py-24 ${className}`}>
      <div className="max-w-5xl mx-auto px-6">
        {children}
      </div>
    </section>
  );
}
