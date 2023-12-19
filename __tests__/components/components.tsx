/**
 * @jest-environment jsdom
 */

import Logo from '@/src/components/Logo';
import { render, screen } from '@testing-library/react';

it('renders Logo component', () => {
  render(<Logo />);

  const logo = screen.getByAltText('pomodoro app logo');

  expect(logo).toBeInTheDocument();
});
