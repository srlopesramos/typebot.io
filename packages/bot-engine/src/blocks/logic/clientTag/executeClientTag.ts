import {
  ClientTagType,
  type ClientTagBlock,
} from "@typebot.io/blocks-logic/clientTag/schema";
import type { SessionState } from "@typebot.io/chat-session/schemas";
import type { SessionStore } from "@typebot.io/runtime-session-store";
import { parseVariables } from "@typebot.io/variables/parseVariables";
import { updateVariablesInSession } from "../../../updateVariablesInSession";
import type { ExecuteLogicResponse } from "../../../types";

export const executeClientTag = (
  block: ClientTagBlock,
  {
    state,
    sessionStore,
  }: {
    state: SessionState;
    sessionStore: SessionStore;
  },
): ExecuteLogicResponse => {
  const variables = state.typebotsQueue[0]?.typebot.variables ?? [];

  const tagType = block.options?.tagType ?? ClientTagType.CONVERSA;
  const rawTagValue = block.options?.tagValue;
  let tagValue = "";
  
  if (rawTagValue && typeof rawTagValue === "string" && rawTagValue.length > 0) {
    try {
      tagValue = parseVariables(variables, { fieldToParse: "id", sessionStore })(
        String(rawTagValue),
      );
    } catch {
      tagValue = String(rawTagValue);
    }
  }

  const formattedOutput = `[label:${tagType}]:["${tagValue}"]`;

  const clientTag = {
    type: tagType,
    value: tagValue,
    output: formattedOutput,
  };

  console.log("[Client Tag]", clientTag);

  let newSessionState = state;

  if (block.options?.variableId) {
    const existingVariable = variables.find(
      (v) => v.id === block.options?.variableId,
    );

    if (existingVariable) {
      const currentValue = existingVariable.value ?? "";
      const newValue =
        typeof currentValue === "string" && currentValue.length > 0
          ? `${currentValue}${formattedOutput}`
          : formattedOutput;

      const { updatedState } = updateVariablesInSession({
        newVariables: [{ ...existingVariable, value: newValue }],
        state,
        currentBlockId: block.id,
      });

      newSessionState = updatedState;
    }
  }

  return {
    outgoingEdgeId: block.outgoingEdgeId,
    newSessionState,
    clientSideActions: [
      {
        type: "clientTag",
        clientTag: {
          name: tagType,
          value: tagValue,
        },
      },
    ],
  };
};
