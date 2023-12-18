// import Placeholder from './src/components/placeholder';
import Logo from "./src/components/Logo";
export default function Home() {
  return (
    <div className="flex max-h-128 min-w-1 flex-col md:max-h-142 md:w-128 lg:max-h-132">
      <div className=" flex h-32 w-full items-center">
        <Logo />
      </div>
      <div className="h-32 w-full border-4 border-white"></div>
      <div className="h-112 w-full border-4 border-white"></div>
      <div className="h-32 w-full border-4 border-white"></div>
    </div>
  );
}
