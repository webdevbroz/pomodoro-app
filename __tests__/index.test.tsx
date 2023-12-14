/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { Button } from '@/src/components/ui/button';

test('renders a button with the correct text', () => {
  render(<Button >CLick me</Button>);
  const button = screen.getByText('Click me');
  //TODO fix TS error
  expect(button).toBeInTheDocument();
});
