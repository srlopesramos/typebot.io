import {
  ClientTagType,
  type ClientTagBlock,
} from "@typebot.io/blocks-logic/clientTag/schema";
import {
  clientTagTypeLabels,
  defaultClientTagOptions,
} from "@typebot.io/blocks-logic/clientTag/constants";
import { Field } from "@typebot.io/ui/components/Field";
import { Select } from "@typebot.io/ui/components/Select";
import { DebouncedTextareaWithVariablesButton } from "@/components/inputs/DebouncedTextarea";
import { VariablesCombobox } from "@/components/inputs/VariablesCombobox";
import type { Variable } from "@typebot.io/variables/schemas";

type Props = {
  options: ClientTagBlock["options"];
  onOptionsChange: (options: ClientTagBlock["options"]) => void;
};

const tagTypeOptions = [
  { value: ClientTagType.CONVERSA, label: clientTagTypeLabels[ClientTagType.CONVERSA] },
  { value: ClientTagType.CONTATO, label: clientTagTypeLabels[ClientTagType.CONTATO] },
  { value: ClientTagType.KANBAN, label: clientTagTypeLabels[ClientTagType.KANBAN] },
];

export const ClientTagSettings = ({ options, onOptionsChange }: Props) => {
  const updateTagType = (tagType: string) =>
    onOptionsChange({
      ...options,
      tagType: tagType as typeof ClientTagType[keyof typeof ClientTagType],
    });

  const updateTagValue = (tagValue: string) =>
    onOptionsChange({
      ...options,
      tagValue,
    });

  const updateVariableId = (variable?: Pick<Variable, "id">) =>
    onOptionsChange({
      ...options,
      variableId: variable?.id,
    });

  return (
    <div className="flex flex-col gap-4">
      <Field.Root>
        <Field.Label>Tipo de Tag</Field.Label>
        <Select.Root
          value={options?.tagType ?? defaultClientTagOptions.tagType}
          onValueChange={updateTagType}
        >
          <Select.Trigger />
          <Select.Popup>
            {tagTypeOptions.map((option) => (
              <Select.Item key={option.value} value={option.value}>
                {option.label}
              </Select.Item>
            ))}
          </Select.Popup>
        </Select.Root>
      </Field.Root>

      <Field.Root>
        <Field.Label>Valor da Tag</Field.Label>
        <DebouncedTextareaWithVariablesButton
          defaultValue={options?.tagValue ?? ""}
          onValueChange={updateTagValue}
          placeholder="Ex: comecou_fluxo"
        />
      </Field.Root>

      <Field.Root>
        <Field.Label>Salvar em variável (opcional)</Field.Label>
        <VariablesCombobox
          onSelectVariable={updateVariableId}
          initialVariableId={options?.variableId}
        />
      </Field.Root>
    </div>
  );
};
