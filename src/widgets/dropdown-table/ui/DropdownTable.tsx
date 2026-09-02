import { Key, ReactNode } from "react";
import DropdownTableItem from "./DropdownTableItem";

export interface DropdownTableItemRenderProps {
  isOpen: boolean;
  toggle: () => void;
}

interface BaseProps<T> {
  data: T[];
  getKey?: (item: T, index: number) => Key;
  emptyContent?: ReactNode;
  className?: string;
  defaultOpen?: boolean;
}

interface Props<T> extends BaseProps<T> {
  renderTrigger: (
    item: T,
    index: number,
    props: DropdownTableItemRenderProps,
  ) => ReactNode;
  renderContent: (item: T, index: number) => ReactNode;
}

const DropdownTable = <T,>(props: Props<T>) => {
  const {
    data,
    emptyContent = (
      <div className="w-full flex items-center justify-center py-20 text-greyscale-50">
        내용이 없습니다.
      </div>
    ),
    className = "w-full pb-30",
    defaultOpen = false,
  } = props;

  if (data.length === 0) {
    return <div className={className}>{emptyContent}</div>;
  }

  const { getKey, renderTrigger, renderContent } = props;

  return (
    <div className={className}>
      {data.map((item, index) => (
        <DropdownTableItem
          key={getKey ? getKey(item, index) : index}
          defaultOpen={defaultOpen}
          renderTrigger={(itemProps) => renderTrigger(item, index, itemProps)}
          renderContent={() => renderContent(item, index)}
        />
      ))}
    </div>
  );
};

export default DropdownTable;
