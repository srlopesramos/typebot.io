import { useTranslate } from "@tolgee/react";
import { defaultMsgButtonType } from "@typebot.io/blocks-inputs/msgButton/constants";
import {
  MsgButtonType,
  type MsgButtonItem,
} from "@typebot.io/blocks-inputs/msgButton/schema";
import { LogicalOperator } from "@typebot.io/conditions/constants";
import type { Condition } from "@typebot.io/conditions/schemas";
import { Field } from "@typebot.io/ui/components/Field";
import { Input } from "@typebot.io/ui/components/Input";
import { MoreInfoTooltip } from "@typebot.io/ui/components/MoreInfoTooltip";
import { Select } from "@typebot.io/ui/components/Select";
import { Switch } from "@typebot.io/ui/components/Switch";
import { useState, useEffect } from "react";
import { ConditionForm } from "@/features/blocks/logic/condition/components/ConditionForm";

type Props = {
  item: MsgButtonItem;
  onSettingsChange: (updates: Omit<MsgButtonItem, "id">) => void;
};

export const MsgButtonItemSettings = ({ item, onSettingsChange }: Props) => {
  const { t } = useTranslate();
  
  const [buttonText, setButtonText] = useState(item.buttonText ?? "");
  const [buttonUrl, setButtonUrl] = useState(item.buttonUrl ?? "");

  useEffect(() => {
    setButtonText(item.buttonText ?? "");
    setButtonUrl(item.buttonUrl ?? "");
  }, [item.id]);

  const updateIsDisplayConditionEnabled = (isEnabled: boolean) =>
    onSettingsChange({
      ...item,
      displayCondition: {
        ...item.displayCondition,
        isEnabled,
      },
    });

  const updateDisplayCondition = (condition: Condition) =>
    onSettingsChange({
      ...item,
      displayCondition: {
        ...item.displayCondition,
        condition,
      },
    });

  const updateButtonType = (buttonType: string) =>
    onSettingsChange({
      ...item,
      buttonType: buttonType as typeof MsgButtonType.TEXT | typeof MsgButtonType.URL,
    });

  const handleButtonTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setButtonText(e.target.value);
  };

  const handleButtonTextBlur = () => {
    onSettingsChange({
      ...item,
      buttonText,
    });
  };

  const handleButtonUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setButtonUrl(e.target.value);
  };

  const handleButtonUrlBlur = () => {
    onSettingsChange({
      ...item,
      buttonUrl,
    });
  };

  const currentButtonType = item.buttonType ?? defaultMsgButtonType;

  return (
    <div className="flex flex-col gap-4">
      <Field.Root>
        <Field.Label>Tipo do Botão</Field.Label>
        <Select.Root
          value={currentButtonType}
          onValueChange={updateButtonType}
        >
          <Select.Trigger />
          <Select.Popup>
            <Select.Item value={MsgButtonType.TEXT}>Texto</Select.Item>
            <Select.Item value={MsgButtonType.URL}>URL</Select.Item>
          </Select.Popup>
        </Select.Root>
      </Field.Root>

      <Field.Root>
        <Field.Label>Texto do Botão</Field.Label>
        <Input
          value={buttonText}
          onChange={handleButtonTextChange}
          onBlur={handleButtonTextBlur}
          placeholder="Digite o texto do botão"
        />
      </Field.Root>

      {currentButtonType === MsgButtonType.URL && (
        <Field.Root>
          <Field.Label>URL de Destino</Field.Label>
          <Input
            value={buttonUrl}
            onChange={handleButtonUrlChange}
            onBlur={handleButtonUrlBlur}
            placeholder="https://exemplo.com"
          />
        </Field.Root>
      )}

      <Field.Container>
        <Field.Root className="flex-row items-center">
          <Switch
            checked={item.displayCondition?.isEnabled ?? false}
            onCheckedChange={updateIsDisplayConditionEnabled}
          />
          <Field.Label>
            {t("blocks.inputs.settings.displayCondition.label")}
            <MoreInfoTooltip>
              {t(
                "blocks.inputs.button.buttonSettings.displayCondition.infoText.label",
              )}
            </MoreInfoTooltip>
          </Field.Label>
        </Field.Root>
        {(item.displayCondition?.isEnabled ?? false) && (
          <ConditionForm
            condition={
              item.displayCondition?.condition ?? {
                comparisons: [],
                logicalOperator: LogicalOperator.AND,
              }
            }
            onConditionChange={updateDisplayCondition}
          />
        )}
      </Field.Container>
    </div>
  );
};
