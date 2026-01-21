import type { ChoiceInputBlock } from "@typebot.io/blocks-inputs/choice/schema";
import type { MsgButtonInputBlock } from "@typebot.io/blocks-inputs/msgButton/schema";
import type { PictureChoiceBlock } from "@typebot.io/blocks-inputs/pictureChoice/schema";

export const parseItemContent = (
  item:
    | ChoiceInputBlock["items"][number]
    | PictureChoiceBlock["items"][number]
    | MsgButtonInputBlock["items"][number],
) => {
  // Buttons (choice)
  if ("content" in item) return item.content;
  // MsgButton
  if ("buttonText" in item) return item.buttonText;
  // Picture choice
  if ("title" in item) return item.title || item.pictureSrc;
};
