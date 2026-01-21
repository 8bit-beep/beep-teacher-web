"use client";

import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  title: string;
  description: string;
  headerOptions?: ReactNode;
  children?: ReactNode;
}

const Section = ({ icon, title, description, headerOptions, children }: Props) => {
  return (
    <section className="w-full h-full flex-1 bg-static-white pt-5 flex flex-col gap-5 rounded-t-large shadow-modal">
      <header className="h-11.5 flex items-center gap-4 px-10">
        <div className="text-static-dark">{icon}</div>
        <div className="flex-1 flex flex-col">
          <h2 className="text-h2 text-static-black font-semibold">{title}</h2>
          <p className="text-caption1 text-greyscale-40">{description}</p>
        </div>
        <div className="flex items-center gap-3">
          {headerOptions}
        </div>
      </header>
      {children}
    </section>
  )
}

export default Section