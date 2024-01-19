import { ReactElement, useState } from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Colours } from '@/lib/colours';
import { useSelector } from '@/lib/redux/store';

interface PomodoroColourSettingsProps {
  onColourChange: (colour: string) => void;
}

export default function PomodoroColourSettings({ onColourChange }: PomodoroColourSettingsProps): ReactElement {
  const { colour } = useSelector((state) => state.pomodoroSettings);

  const [selectedColourValue, setSelectedColourValue] = useState<string>(colour);

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
          className="h-[40px] w-[40px] dark:bg-secondary-peach"
          value="#f87070"
          id="peach"
          variant='colour'
          isSelected={selectedColourValue === Colours.SecondaryPeach}
        />
        <RadioGroupItem
          className="h-[40px] w-[40px] dark:bg-secondary-aqua"
          value="#70f3f8"
          id="aqua"
          variant='colour'
          isSelected={selectedColourValue === Colours.SecondaryAqua}
        />
        <RadioGroupItem
          className="h-[40px] w-[40px] dark:bg-secondary-purple"
          value="#d881f8"
          id="purple"
          variant='colour'
          isSelected={selectedColourValue === Colours.SecondaryPurple}
        />
      </RadioGroup>
    </div>
  );
}
