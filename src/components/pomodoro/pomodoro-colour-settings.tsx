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
    <div className="flex flex-col items-center justify-between gap-5 sm:flex-row border-t border-gray-200 pt-6 mx-6">
      <Label className="text-center font-bold uppercase tracking-[0.3em]">Colour</Label>
      <RadioGroup
        className="flex justify-center"
        value={selectedColourValue}
        onValueChange={(value) => handleValueChange(value)}
      >
        <RadioGroupItem
          className="h-[40px] w-[40px] bg-secondary-peach"
          value="#f87070"
          id="peach"
          variant="colour"
          isSelected={selectedColourValue === Colours.SecondaryPeach}
        />
        <RadioGroupItem
          className="h-[40px] w-[40px] bg-secondary-aqua"
          value="#70f3f8"
          id="aqua"
          variant="colour"
          isSelected={selectedColourValue === Colours.SecondaryAqua}
        />
        <RadioGroupItem
          className="h-[40px] w-[40px] bg-secondary-purple"
          value="#d881f8"
          id="purple"
          variant="colour"
          isSelected={selectedColourValue === Colours.SecondaryPurple}
        />
      </RadioGroup>
    </div>
  );
}
