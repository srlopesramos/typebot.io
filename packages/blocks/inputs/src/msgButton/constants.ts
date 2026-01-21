import type { MsgButtonInputBlock } from "./schema";
import { MsgButtonType } from "./schema";

export const defaultMsgButtonInputOptions = {
  messageText: "",
  isMultipleChoice: false,
} as const satisfies MsgButtonInputBlock["options"];

export const defaultMsgButtonType = MsgButtonType.TEXT;
