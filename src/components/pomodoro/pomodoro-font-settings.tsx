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
    <div className="mx-6 flex flex-col items-center justify-between gap-5 border-t border-gray-200 pt-6 sm:flex-row">
      <Label className="text-center text-[11px] font-bold uppercase tracking-[0.3em] md:text-[13px]">Font</Label>
      <RadioGroup
        className="flex justify-center"
        value={selectedFontValue}
        onValueChange={(value) => handleValueChange(value)}
      >
        <RadioGroupItem
          className="h-[40px] w-[40px] bg-gray-100 font-space"
          value="font-space"
          id="font-space"
          variant="font"
          selectedText="Aa"
          isSelected={selectedFontValue === 'font-space'}
        />
        <RadioGroupItem
          className="h-[40px] w-[40px] bg-gray-100 font-kumbh"
          value="font-kumbh"
          id="font-kumbh"
          variant="font"
          selectedText="Aa"
          isSelected={selectedFontValue === 'font-kumbh'}
        />
        <RadioGroupItem
          className="h-[40px] w-[40px] bg-gray-100 font-roboto"
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
