"use client";

import { ReactNode, useState } from "react";
import { DropdownTableItemRenderProps } from "./DropdownTable";

interface Props {
  renderTrigger: (props: DropdownTableItemRenderProps) => ReactNode;
  renderContent: () => ReactNode;
  defaultOpen?: boolean;
}

const DropdownTableItem = ({
  renderTrigger,
  renderContent,
  defaultOpen = false,
}: Props) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <div className="w-full">
      {renderTrigger({ isOpen, toggle })}
      {isOpen && renderContent()}
    </div>
  );
};

export default DropdownTableItem;
