"use client";

import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  title: string;
  description: string;
  headerOptions?: ReactNode;
  mobileFilter?: ReactNode;
  children?: ReactNode;
}

const Section = ({
  icon,
  title,
  description,
  headerOptions,
  mobileFilter,
  children,
}: Props) => {
  return (
    <section className="w-full h-[calc(100%-86px)] flex-1 bg-static-white pt-5 flex flex-col gap-5 rounded-t-large shadow-modal overflow-hidden">
      <header className="h-11.5 flex items-center gap-2 xl:gap-4 pr-2 pl-4 xl:pr-10 xl:pl-10">
        <div className="text-static-dark">{icon}</div>
        <div className="flex-1 flex flex-col">
          <h2 className="xl:text-h2 text-h3 text-static-black font-semibold">
            {title}
          </h2>
          <p className="xl:text-caption1 text-caption2 text-greyscale-40 hidden xl:block">
            {description}
          </p>
        </div>
        <div className="flex items-center gap-3">{headerOptions}</div>
      </header>
      {mobileFilter && <div className="w-full xl:hidden px-2">{mobileFilter}</div>}
      {children}
    </section>
  );
};

export default Section;
