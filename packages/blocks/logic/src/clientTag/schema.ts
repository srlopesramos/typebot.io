import { blockBaseSchema } from "@typebot.io/blocks-base/schemas";
import { z } from "zod";
import { LogicBlockType } from "../constants";

export const ClientTagType = {
  CONVERSA: "conversa",
  CONTATO: "contato",
  KANBAN: "kanban",
} as const;

export const clientTagOptionsSchema = z.object({
  tagType: z
    .enum([ClientTagType.CONVERSA, ClientTagType.CONTATO, ClientTagType.KANBAN])
    .optional(),
  tagValue: z.string().optional(),
  variableId: z.string().optional(),
});

export const clientTagBlockSchema = blockBaseSchema.merge(
  z.object({
    type: z.enum([LogicBlockType.CLIENT_TAG]),
    options: clientTagOptionsSchema.optional(),
  }),
);

export type ClientTagBlock = z.infer<typeof clientTagBlockSchema>;
