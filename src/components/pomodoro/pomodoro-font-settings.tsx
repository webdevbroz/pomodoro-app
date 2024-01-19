import { ReactElement, useState } from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useSelector } from '@/lib/redux/store';

interface PomodoroFontSettingsProps {
  onFontChange: (font: string) => void;
}

export default function PomodoroFontSettings({ onFontChange }: PomodoroFontSettingsProps): ReactElement {
  const { font } = useSelector((state) => state.pomodoroSettings);

  const [selectedFontValue, setSelectedFontValue] = useState<string>(font);

  const handleValueChange = (value: string) => {
    setSelectedFontValue(value);
    onFontChange(value);
  };

  return (
    <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
      <Label className="text-center font-extrabold uppercase tracking-[0.4em]">Font</Label>
      <RadioGroup
        className="flex justify-center"
        value={selectedFontValue}
        onValueChange={(value) => handleValueChange(value)}
      >
        <RadioGroupItem
          className="h-[40px] w-[40px] font-space dark:bg-on-light-background"
          value="font-space"
          id="font-space"
          variant="font"
          selectedText="Aa"
          isSelected={selectedFontValue === 'font-space'}
        />
        <RadioGroupItem
          className="h-[40px] w-[40px] font-kumbh dark:bg-on-light-background"
          value="font-kumbh"
          id="font-kumbh"
          variant="font"
          selectedText="Aa"
          isSelected={selectedFontValue === 'font-kumbh'}
        />
        <RadioGroupItem
          className="h-[40px] w-[40px] font-roboto dark:bg-on-light-background"
          value="font-roboto"
          id="font-roboto"
          variant="font"
          selectedText="Aa"
          isSelected={selectedFontValue === 'font-roboto'}
        />
      </RadioGroup>
    </div>
  );
}
