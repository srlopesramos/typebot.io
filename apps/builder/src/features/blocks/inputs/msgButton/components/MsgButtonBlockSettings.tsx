import { useTranslate } from "@tolgee/react";
import type { MsgButtonInputBlock } from "@typebot.io/blocks-inputs/msgButton/schema";
import { Field } from "@typebot.io/ui/components/Field";
import type { Variable } from "@typebot.io/variables/schemas";
import { DebouncedTextInputWithVariablesButton } from "@/components/inputs/DebouncedTextInput";
import { VariablesCombobox } from "@/components/inputs/VariablesCombobox";

type Props = {
  options?: MsgButtonInputBlock["options"];
  onOptionsChange: (options: MsgButtonInputBlock["options"]) => void;
};

export const MsgButtonBlockSettings = ({ options, onOptionsChange }: Props) => {
  const { t } = useTranslate();

  const updateMessageText = (messageText: string) =>
    onOptionsChange({ ...options, messageText });

  const updateSaveVariable = (variable?: Variable) =>
    onOptionsChange({ ...options, variableId: variable?.id });

  return (
    <div className="flex flex-col gap-4">
      <Field.Root>
        <Field.Label>Texto da Mensagem</Field.Label>
        <DebouncedTextInputWithVariablesButton
          defaultValue={options?.messageText ?? ""}
          onValueChange={updateMessageText}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>
          {t("blocks.inputs.settings.saveAnswer.label")}
        </Field.Label>
        <VariablesCombobox
          initialVariableId={options?.variableId}
          onSelectVariable={updateSaveVariable}
        />
      </Field.Root>
    </div>
  );
};
