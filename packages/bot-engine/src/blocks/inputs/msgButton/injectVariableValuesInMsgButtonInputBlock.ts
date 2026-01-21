import type { MsgButtonInputBlock } from "@typebot.io/blocks-inputs/msgButton/schema";
import type { SessionStore } from "@typebot.io/runtime-session-store";
import { deepParseVariables } from "@typebot.io/variables/deepParseVariables";
import type { Variable } from "@typebot.io/variables/schemas";
import { filterMsgButtonItems } from "./filterMsgButtonItems";

export const injectVariableValuesInMsgButtonInputBlock = (
  block: MsgButtonInputBlock,
  {
    sessionStore,
    variables,
  }: { sessionStore: SessionStore; variables: Variable[] },
): MsgButtonInputBlock => {
  return deepParseVariables(
    filterMsgButtonItems(block, { sessionStore, variables }),
    {
      variables,
      sessionStore,
    },
  );
};
