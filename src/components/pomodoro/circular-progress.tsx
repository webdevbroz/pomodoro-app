import { ReactElement } from 'react';

interface CircularTimerProps {
  colour: string;
  percentage: number;
  minutes: string;
  seconds: string;
}

type ProgressCircleProps = Pick<CircularTimerProps, 'colour' | 'percentage'>;
type RenderTimerTextProps = Pick<CircularTimerProps, 'minutes' | 'seconds'>;

const X_AXIS = -5;
const Y_AXIS = 205;

export const cleanPercentage = (percentage: number): number => {
  const isNegative = !Number.isFinite(percentage) || percentage < 0; // we can set non-numbers to 0 here
  const isTooHigh = percentage > 100;
  return isNegative ? 0 : isTooHigh ? 100 : percentage;
};

export const ProgressCircle = ({ colour, percentage }: ProgressCircleProps): ReactElement => {
  // An SVG circle with stroke-width renders two concentric circles (or a doughnut like image)
  // with its internal radius as r - ½ the stroke width and its external radius as r + ½ stroke-width.\
  // For a circle with d=400, r should be (r - strokeWidth / 2)
  const r = 163.5; // (r * 2) + strokeWidth needs to equal the size of the intended circle - this this case 339
  const circ = 2 * Math.PI * r;
  const strokePercentage = ((100 - percentage) * circ) / 100; // where stroke will start, e.g. from 15% to 100%.
  const stroke = strokePercentage !== circ ? colour : ''; // if strokePercentage is 100% then we don't want to show the stroke
  const strokeDashoffset = percentage ? strokePercentage : 0; // if percentage is 0 then we don't want to show the stroke
  return (
    <circle
      data-testid={`progress-circle-${colour}-test`}
      r={r}
      cx={X_AXIS}
      cy={Y_AXIS}
      fill="transparent"
      stroke={stroke} // remove colour as 0% sets full circumference
      strokeWidth={12}
      strokeDasharray={circ}
      strokeDashoffset={strokeDashoffset}
      strokeLinecap="round"
    ></circle>
  );
};

export const StringToTextElement = ({ text, xvalue }: { text: string; xvalue: number }): ReactElement => {
  return (
    <>
      {text.split('').map((char, index) => (
        <text
          data-testid={`strings-to-text-element-test-${index}`}
          className="fill-on-dark-background text-8xl font-bold"
          dominantBaseline="central"
          textAnchor="middle"
          key={index}
          x={`${xvalue + index * 13}%`}
          y="50%"
        >
          {char}
        </text>
      ))}
    </>
  );
};

export const RenderTimerText = ({ minutes, seconds }: RenderTimerTextProps): ReactElement => {
  const xLogic = 205;
  const yLogic = 205 + 33.66;
  return (
    // https://developer.mozilla.org/en-US/docs/Web/SVG/Element/text
    // xlogic and ylogic refers to the positioning of the semicolon.
    <g data-testid="render-timer-text-test">
      <StringToTextElement xvalue={27} text={minutes} />
      <text className="fill-on-dark-background text-8xl font-bold" textAnchor="middle" x={xLogic} y={yLogic}>
        :
      </text>
      <StringToTextElement xvalue={59} text={seconds} />
    </g>
  );
};

export const CircularTimer = ({ colour, percentage, minutes, seconds }: CircularTimerProps): ReactElement => {
  const pct = cleanPercentage(percentage);
  return (
    <svg
      data-testid="circular-progress-test"
      className="flex rounded-full bg-gradient-to-r from-dark-blue to-desaturated-blue drop-shadow-primary"
      height="100%"
      width="100%"
      viewBox="0 0 410 410"
    >
      <g transform={`rotate(-90 ${'100 100'})`} fill="black">
        <ProgressCircle data-testid="progress-circle-lower" colour="lightgrey" percentage={percentage} />
        <circle r={183.5} cx={X_AXIS} cy={Y_AXIS} fill="#161932"></circle>
        <ProgressCircle data-testid="progress-circle-upper" colour={colour} percentage={pct} />
      </g>
      <RenderTimerText minutes={minutes} seconds={seconds} />
    </svg>
  );
};
