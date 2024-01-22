import Pomodoro from '@/components/pomodoro/pomodoro';
import Logo from '../components/logo';
import PomodoroStatus from '@/components/pomodoro-status';

export default function Home() {
  return (
    <div className="flex max-h-128 min-w-1 flex-col md:max-h-142 md:w-128 lg:max-h-132">
      <div className=" flex h-32 w-full items-center">
        <Logo />
      </div>
      <div className="flex h-32 w-full items-center justify-center">
        <PomodoroStatus />
      </div>
      <Pomodoro />
    </div>
  );
}
