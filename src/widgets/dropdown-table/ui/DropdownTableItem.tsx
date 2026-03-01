"use client";

import { ReactNode, useState } from "react";
import { DropdownTableItemRenderProps } from "./DropdownTable";

interface Props {
  renderTrigger: (props: DropdownTableItemRenderProps) => ReactNode;
  renderContent: () => ReactNode;
}

const DropdownTableItem = ({ renderTrigger, renderContent }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <div className="w-full">
      {renderTrigger({ isOpen, toggle })}
      {isOpen && renderContent()}
    </div>
  );
};

export default DropdownTableItem;
