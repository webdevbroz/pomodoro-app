import { ReactElement, useState } from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Colours } from '@/lib/colours';

interface PomodoroColourSettingsProps {
  onColourChange: (colour: string) => void;
}

export default function PomodoroColourSettings({ onColourChange }: PomodoroColourSettingsProps): ReactElement {
  const [selectedColourValue, setSelectedColourValue] = useState<string>(Colours.SecondaryPeach);

  const handleValueChange = (value: string) => {
    setSelectedColourValue(value);
    onColourChange(value);
  };

  return (
    <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
      <Label className="text-center font-extrabold uppercase tracking-[0.4em]">Colour</Label>
      <RadioGroup
        className="flex justify-center"
        value={selectedColourValue}
        onValueChange={(value) => handleValueChange(value)}
      >
        <RadioGroupItem
          className="h-[40px] w-[40px] ring-offset-red-950 dark:bg-secondary-peach"
          value="#f87070"
          id="peach"
          checked={selectedColourValue === Colours.SecondaryPeach}
        />
        <RadioGroupItem
          className="h-[40px] w-[40px] dark:bg-secondary-aqua"
          value="#70f3f8"
          id="aqua"
          checked={selectedColourValue === Colours.SecondaryAqua}
        />
        <RadioGroupItem
          className="h-[40px] w-[40px] dark:bg-secondary-purple"
          value="#d881f8"
          id="purple"
          checked={selectedColourValue === Colours.SecondaryPurple}
        />
      </RadioGroup>
    </div>
  );
}
