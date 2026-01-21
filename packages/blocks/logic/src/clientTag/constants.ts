import { ClientTagType, type ClientTagBlock } from "./schema";

export const defaultClientTagOptions = {
  tagType: ClientTagType.CONVERSA,
  tagValue: "",
} as const satisfies ClientTagBlock["options"];

export const clientTagTypeLabels = {
  [ClientTagType.CONVERSA]: "Tag de Conversa",
  [ClientTagType.CONTATO]: "Tag de Contato",
  [ClientTagType.KANBAN]: "Tag de Kanban",
} as const;
