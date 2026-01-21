import {
  ClientTagType,
  type ClientTagBlock,
} from "@typebot.io/blocks-logic/clientTag/schema";
import { clientTagTypeLabels } from "@typebot.io/blocks-logic/clientTag/constants";
import { cx } from "@typebot.io/ui/lib/cva";

export const ClientTagContent = ({ block }: { block: ClientTagBlock }) => {
  const tagType = block.options?.tagType ?? ClientTagType.CONVERSA;
  const tagValue = block.options?.tagValue ?? "";

  const hasContent = tagValue;

  const formatOutput = () => {
    if (!tagValue) return "";
    return `[label:${tagType}]:["${tagValue}"]`;
  };

  return (
    <p
      className={cx(
        "line-clamp-4",
        hasContent ? "text-gray-12" : "text-gray-9",
      )}
    >
      {hasContent ? (
        <span className="font-mono text-xs">
          {formatOutput()}
        </span>
      ) : (
        <span>
          <strong>{clientTagTypeLabels[tagType]}</strong>
          <br />
          Click to edit...
        </span>
      )}
    </p>
  );
};
