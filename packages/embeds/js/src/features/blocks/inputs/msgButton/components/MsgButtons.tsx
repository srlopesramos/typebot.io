import { MsgButtonType } from "@typebot.io/blocks-inputs/msgButton/schema";
import type { MsgButtonInputBlock } from "@typebot.io/blocks-inputs/msgButton/schema";
import { For, Show, createMemo } from "solid-js";
import type { InputSubmitContent } from "@/types";

type Props = {
  chunkIndex: number;
  defaultItems: MsgButtonInputBlock["items"];
  options: MsgButtonInputBlock["options"];
  onSubmit: (value: InputSubmitContent) => void;
};

export const MsgButtons = (props: Props) => {
  const formatButtonLine = (item: MsgButtonInputBlock["items"][number]) => {
    const buttonType = item.buttonType === MsgButtonType.URL ? "url" : "text";
    const buttonText = item.buttonText || "Button";
    
    if (buttonType === "url" && item.buttonUrl) {
      return `[BUTTON]:"type":"${buttonType}","text":"${buttonText}","url":"${item.buttonUrl}"`;
    }
    return `[BUTTON]:"type":"${buttonType}","text":"${buttonText}"`;
  };

  const formattedOutput = createMemo(() => {
    const messageText = props.options?.messageText || "";
    const buttonLines = props.defaultItems
      .filter((item) => item.buttonText)
      .map(formatButtonLine);
    
    return {
      messageText,
      buttonLines,
      fullText: messageText 
        ? `${messageText}\n\n${buttonLines.join("\n")}`
        : buttonLines.join("\n"),
    };
  });

  const handleSubmit = () => {
    props.onSubmit({
      type: "text",
      value: formattedOutput().fullText,
    });
  };

  return (
    <div class="flex flex-col items-end gap-2 w-full typebot-msg-buttons-input">
      <div class="bg-gray-2 border border-gray-6 rounded-lg p-4 w-full max-w-md font-mono text-sm">
        <Show when={formattedOutput().messageText}>
          <p class="text-gray-12 mb-3 whitespace-pre-wrap">{formattedOutput().messageText}</p>
        </Show>
        
        <Show
          when={formattedOutput().buttonLines.length > 0}
          fallback={<p class="text-gray-9">No buttons configured</p>}
        >
          <For each={formattedOutput().buttonLines}>
            {(line) => (
              <p class="text-blue-11 text-xs break-all">{line}</p>
            )}
          </For>
        </Show>
      </div>

      <button
        type="button"
        class="px-4 py-2 bg-blue-9 hover:bg-blue-10 text-white rounded-md text-sm font-medium transition-colors"
        onClick={handleSubmit}
      >
        Enviar
      </button>
    </div>
  );
};
