/**
 * @jest-environment jsdom
 */
import Placeholder from '@/src/components/placeholder';
import { render, screen } from '@testing-library/react';

test('renders a button with the correct text', () => {
  render(<Placeholder text="Click me" />);
  const placeHolder = screen.getByText('Click me');
  expect(placeHolder).toBeInTheDocument();
});
