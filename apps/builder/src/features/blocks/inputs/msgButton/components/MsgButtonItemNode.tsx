import { useTranslate } from "@tolgee/react";
import type {
  Item,
  ItemIndices,
} from "@typebot.io/blocks-core/schemas/items/schema";
import { defaultMsgButtonType } from "@typebot.io/blocks-inputs/msgButton/constants";
import {
  MsgButtonType,
  type MsgButtonItem,
} from "@typebot.io/blocks-inputs/msgButton/schema";
import { Button } from "@typebot.io/ui/components/Button";
import { Popover } from "@typebot.io/ui/components/Popover";
import { Link02Icon } from "@typebot.io/ui/icons/Link02Icon";
import { Settings01Icon } from "@typebot.io/ui/icons/Settings01Icon";
import { useState } from "react";
import { useTypebot } from "@/features/editor/providers/TypebotProvider";
import { useGraph } from "@/features/graph/providers/GraphProvider";
import { MsgButtonItemSettings } from "./MsgButtonItemSettings";

type Props = {
  item: MsgButtonItem;
  indices: ItemIndices;
  isMouseOver: boolean;
};

export const MsgButtonItemNode = ({ item, indices, isMouseOver }: Props) => {
  const { t } = useTranslate();
  const { deleteItem, updateItem, createItem } = useTypebot();
  const { openedNodeId, setOpenedNodeId } = useGraph();

  const buttonType = item.buttonType ?? defaultMsgButtonType;
  const buttonText = item.buttonText || "Clique para editar";
  const isUrlType = buttonType === MsgButtonType.URL;

  const updateItemSettings = (settings: Omit<MsgButtonItem, "id">) => {
    updateItem(indices, { ...item, ...settings } as Item);
  };

  return (
    <Popover.Root
      isOpen={openedNodeId === item.id}
      onClose={() => {
        setOpenedNodeId(undefined);
      }}
    >
      <Popover.Trigger
        render={(props) => (
          <div className="flex px-4 py-2 justify-center w-full" {...props}>
            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-gray-3 border border-gray-6 max-w-[200px]">
              {isUrlType && (
                <Link02Icon className="w-4 h-4 text-blue-9 shrink-0" />
              )}
              <span className="truncate text-sm">
                {buttonText}
              </span>
            </div>
            {isMouseOver && (
              <div className="flex rounded-md bg-gray-1 absolute -right-1 -top-1 z-10 animate-in fade-in-0">
                <Button
                  aria-label={t("blocks.inputs.button.openSettings.ariaLabel")}
                  variant="ghost"
                  size="icon"
                  className="shadow-md"
                  onClick={() => setOpenedNodeId(item.id)}
                >
                  <Settings01Icon />
                </Button>
              </div>
            )}
          </div>
        )}
      />
      <Popover.Popup side="right" className="p-4 min-w-[300px]">
        <MsgButtonItemSettings
          item={item}
          onSettingsChange={updateItemSettings}
        />
      </Popover.Popup>
    </Popover.Root>
  );
};
