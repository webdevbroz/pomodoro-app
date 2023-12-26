import { ReactElement } from 'react';

export const cleanPercentage = (percentage: number | string): number => {
  const isNegativeOrNaN = !Number.isFinite(+percentage) || +percentage < 0; // we can set non-numbers to 0 here
  const isTooHigh = +percentage > 100;
  return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
};

export const ProgressCircle = ({
  colour,
  percentage,
}: {
  colour: string;
  percentage: number | string;
}): ReactElement => {
  // An SVG circle with stroke-width renders two concentric circles (or a doughnut like image)
  // with its internal radius as r - ½ the stroke width and its external radius as r + ½ stroke-width.\
  // For a circle with d=400, r should be (r - strokeWidth / 2)
  const r = 197.5; // (r * 2) + strokeWidth needs to equal the size of the intended circle - this this case 410
  const circ = 2 * Math.PI * r;
  const strokePercentage = ((100 - +percentage) * circ) / 100; // where stroke will start, e.g. from 15% to 100%.
  const stroke = strokePercentage !== circ ? colour : ''; // if strokePercentage is 100% then we don't want to show the stroke
  const strokeDashoffset = percentage ? strokePercentage : 0; // if percentage is 0 then we don't want to show the stroke
  return (
    <circle
      data-test-id={`progress-circle-${colour}-test`}
      r={r}
      cx={-5}
      // cy={-105} // Can remove this and inclde in transform translate attribute
      fill="transparent"
      stroke={stroke} // remove colour as 0% sets full circumference
      strokeWidth={15}
      strokeDasharray={circ}
      strokeDashoffset={strokeDashoffset}
      transform="scale(1, -1) translate(0, -205)" // this flips the progress bar to empty clockwise
    ></circle>
  );
};

export const StringToTextElement = ({ text, xvalue }: { text: string; xvalue: number }): ReactElement => {
  return (
    <>
      {text.split('').map((char, index) => (
        <text
          data-test-id={`strings-to-text-element-test-${index}`}
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

export const RenderTimerText = ({ minutes, seconds }: { minutes: string; seconds: string }): ReactElement => {
  const xLogic = 205 - 21.66 / 2;
  const yLogic = 205 + 21.66;
  return (
    // https://developer.mozilla.org/en-US/docs/Web/SVG/Element/text
    // 21.66 is the width of the semicolon html element
    <g data-test-id="render-timer-text-test">
      <StringToTextElement xvalue={27} text={minutes} />
      <text className="fill-on-dark-background text-8xl" x={xLogic} y={yLogic}>
        :
      </text>
      <StringToTextElement xvalue={60} text={seconds} />
    </g>
  );
};

export const CircularProgress = ({
  colour,
  percentage,
  minutes,
  seconds,
}: {
  colour: string;
  percentage: number;
  minutes: string;
  seconds: string;
}): ReactElement => {
  const pct = cleanPercentage(percentage);
  return (
    <svg data-test-id="circular-progress-test" className="flex" width={410} height={410}>
      <g transform={`rotate(-90 ${'100 100'})`}>
        <ProgressCircle data-test-id="progress-circle-lower" colour="lightgrey" percentage={percentage} />
        <ProgressCircle data-test-id="progress-circle-upper" colour={colour} percentage={pct} />
      </g>
      <RenderTimerText minutes={minutes} seconds={seconds} />
    </svg>
  );
};
