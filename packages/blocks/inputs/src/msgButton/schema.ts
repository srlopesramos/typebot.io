import {
  blockBaseSchema,
  itemBaseSchemas,
  optionBaseSchema,
} from "@typebot.io/blocks-base/schemas";
import { conditionSchema } from "@typebot.io/conditions/schemas";
import { z } from "zod";
import { InputBlockType } from "../constants";

export const MsgButtonType = {
  TEXT: "text",
  URL: "url",
} as const;

export const msgButtonOptionsSchema = optionBaseSchema.merge(
  z.object({
    messageText: z.string().optional(),
    isMultipleChoice: z.boolean().optional(),
  }),
);

export const msgButtonItemSchemas = {
  v5: itemBaseSchemas.v5.extend({
    buttonType: z.enum([MsgButtonType.TEXT, MsgButtonType.URL]).optional(),
    buttonText: z.string().optional(),
    buttonUrl: z.string().optional(),
    displayCondition: z
      .object({
        isEnabled: z.boolean().optional(),
        condition: conditionSchema.optional(),
      })
      .optional(),
  }),
  v6: itemBaseSchemas.v6.extend({
    buttonType: z.enum([MsgButtonType.TEXT, MsgButtonType.URL]).optional(),
    buttonText: z.string().optional(),
    buttonUrl: z.string().optional(),
    displayCondition: z
      .object({
        isEnabled: z.boolean().optional(),
        condition: conditionSchema.optional(),
      })
      .optional(),
  }),
};

export const msgButtonItemSchema = z.union([
  msgButtonItemSchemas.v5,
  msgButtonItemSchemas.v6,
]);

export const msgButtonInputV5Schema = blockBaseSchema.merge(
  z.object({
    type: z.enum([InputBlockType.MSG_BUTTON]),
    items: z.array(msgButtonItemSchemas.v5),
    options: msgButtonOptionsSchema.optional(),
  }),
);

export const msgButtonInputSchemas = {
  v5: msgButtonInputV5Schema,
  v6: msgButtonInputV5Schema.extend({
    items: z.array(msgButtonItemSchemas.v6),
  }),
} as const;

export const msgButtonInputSchema = z.union([
  msgButtonInputSchemas.v5,
  msgButtonInputSchemas.v6,
]);

export type MsgButtonItem = z.infer<typeof msgButtonItemSchema>;
export type MsgButtonInputBlock = z.infer<typeof msgButtonInputSchema>;
