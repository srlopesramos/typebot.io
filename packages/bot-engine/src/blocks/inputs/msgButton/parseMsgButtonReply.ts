import type { MsgButtonInputBlock } from "@typebot.io/blocks-inputs/msgButton/schema";
import type { ParsedReply } from "../../../types";

export const parseMsgButtonReply = (
  inputValue: string,
  {
    items,
    replyId,
  }: {
    items: MsgButtonInputBlock["items"];
    replyId: string | undefined;
  },
): ParsedReply => {
  const matchedItem = [...items]
    .sort((a, b) => {
      const aContent = a.buttonText ?? "";
      const bContent = b.buttonText ?? "";
      return bContent.length - aContent.length;
    })
    .find((item) => {
      if (replyId && item.id === replyId) return true;
      if (item.id === inputValue) return true;
      const itemContent = item.buttonText;
      if (itemContent && inputValue.trim() === itemContent.trim()) return true;
      return false;
    });

  if (!matchedItem) return { status: "fail" };

  const content = matchedItem.buttonText;
  if (!content) return { status: "fail" };

  return {
    status: "success",
    content,
    outgoingEdgeId: matchedItem.outgoingEdgeId,
  };
};
