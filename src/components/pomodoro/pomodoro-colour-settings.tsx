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
    <RadioGroup className="flex justify-center" onValueChange={handleValueChange}>
      <RadioGroupItem
        className="dark:bg-secondary-peach h-[40px] w-[40px] ring-offset-red-950"
        value="#f87070"
        id="peach"
        checked={selectedColourValue === Colours.SecondaryPeach}
      />
      <RadioGroupItem
        className="dark:bg-secondary-aqua h-[40px] w-[40px]"
        value="#70f3f8"
        id="aqua"
        checked={selectedColourValue === Colours.secondaryAqua}
      />
      <RadioGroupItem
        className="dark:bg-secondary-purple h-[40px] w-[40px]"
        value="#d881f8"
        id="purple"
        checked={selectedColourValue === Colours.secondaryPurple}
      />
    </RadioGroup>
  );
}
