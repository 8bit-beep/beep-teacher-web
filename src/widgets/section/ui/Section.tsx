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
    <section className="w-full min-h-0 flex-1 bg-static-white pt-5 flex flex-col gap-5 rounded-large xl:rounded-b-none shadow-modal overflow-hidden">
      <header className="h-11.5 flex items-center justify-between px-3 lg:px-10">
        <div className="flex items-center gap-2 xl:gap-4">
          <div className="text-static-dark">{icon}</div>
          <div className="flex flex-col">
            <h2 className="text-accent lg:text-h3 xl:text-h2">
              {title}
            </h2>
            <p className="hidden lg:flex xl:text-caption1 text-caption2 text-greyscale-40">
              {description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">{headerOptions}</div>
      </header>
      {mobileFilter && (
        <div className="w-full xl:hidden px-2">{mobileFilter}</div>
      )}
      {children}
    </section>
  );
};

export default Section;
