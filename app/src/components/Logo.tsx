import { ReactElement } from 'react';
import Image from 'next/image';
import logo from '../../../public/logo.svg';

const Logo = (): ReactElement => (
  <div className="container relative flex h-6 w-29 justify-center md:h-8 md:w-34">
    <Image fill priority src={logo} alt="pomodoro app logo" />
  </div>
);

export default Logo;
