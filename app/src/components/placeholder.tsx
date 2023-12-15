import { Button } from '@/src/components/ui/button';

export default function Placeholder({ text }: { text?: string }) {
  return <Button className="text-on-light-background">{text}</Button>;
}
