import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ReactElement, useState } from 'react';

interface PomodoroColourSettingsProps {
  onColourChange: (colour: string) => void;
}

export default function PomodoroColourSettings({ onColourChange }: PomodoroColourSettingsProps): ReactElement {
  const handleValueChange = (value: string) => {
    onColourChange(value);
  };
  return (
    <div>
      <RadioGroup className="flex" onValueChange={handleValueChange}>
        <RadioGroupItem className='dark:bg-secondary-peach' value="#f87070" id="peach" />
        <RadioGroupItem className='dark:bg-secondary-aqua' value="#70f3f8" id="aqua" />
        <RadioGroupItem className='dark:bg-secondary-purple' value="#d881f8" id="purple" />
      </RadioGroup>
    </div>
  );
}
