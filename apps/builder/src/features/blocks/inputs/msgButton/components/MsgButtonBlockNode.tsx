import type { BlockIndices } from "@typebot.io/blocks-core/schemas/schema";
import type { MsgButtonInputBlock } from "@typebot.io/blocks-inputs/msgButton/schema";
import { SetVariableLabel } from "@/components/SetVariableLabel";
import { useTypebot } from "@/features/editor/providers/TypebotProvider";
import { ItemNodesList } from "@/features/graph/components/nodes/item/ItemNodesList";

type Props = {
  block: MsgButtonInputBlock;
  indices: BlockIndices;
};

export const MsgButtonBlockNode = ({ block, indices }: Props) => {
  const { typebot } = useTypebot();

  return (
    <div className="flex flex-col gap-2 w-[90%]">
      {block.options?.messageText && (
        <p className="text-sm text-gray-11 italic px-2">
          {block.options.messageText}
        </p>
      )}
      <ItemNodesList block={block} indices={indices} />
      {block.options?.variableId ? (
        <SetVariableLabel
          variableId={block.options.variableId}
          variables={typebot?.variables}
        />
      ) : null}
    </div>
  );
};
