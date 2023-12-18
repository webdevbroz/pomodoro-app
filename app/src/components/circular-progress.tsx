import { ReactElement } from 'react';

export const cleanPercentage = (percentage: number | string): number => {
  const isNegativeOrNaN = !Number.isFinite(+percentage) || +percentage < 0; // we can set non-numbers to 0 here
  const isTooHigh = +percentage > 100;
  return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
};

const ProgressCircle = ({ colour, percentage }: { colour: string; percentage: number | string }): ReactElement => {
  // An SVG circle with stroke-width renders two concentric circles (or a doughnut like image)
  // with its internal radius as r - ½ the stroke width and its external radius as r + ½ stroke-width.\
  // For a circle with d=400, r should be (r - strokeWidth / 2)
  const r = 197.5; // (r * 2) + strokeWidth needs to equal the size of the intended circle - this this case 410
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - +percentage) * circ) / 100; // where stroke will start, e.g. from 15% to 100%.
  return (
    <circle
      r={r}
      cx={-5}
      // cy={-105} // Can remove this and inclde in transform translate attribute
      fill="transparent"
      stroke={strokePct !== circ ? colour : ''} // remove colour as 0% sets full circumference
      strokeWidth={15}
      strokeDasharray={circ}
      strokeDashoffset={percentage ? strokePct : 0}
      transform="scale(1, -1) translate(0, -205)" // this flips the progress bar to empty clockwise
    ></circle>
  );
};

const StringToSpans = ({ text, xvalue }: { text: string; xvalue: number }): ReactElement => {
  return (
    <>
      {text.split('').map((char, index) => (
        <text
          className="fill-on-dark-background text-8xl font-bold"
          dominantBaseline="central"
          textAnchor="middle"
          key={index}
          x={`${xvalue + index * 13}` + '%'}
          y="50%"
        >
          {char}
        </text>
      ))}
    </>
  );
};

const RenderTimerText = ({ minutes, seconds }: { minutes: string; seconds: string }): ReactElement => {
  return (
    // https://developer.mozilla.org/en-US/docs/Web/SVG/Element/text
    // 21.66 is the width of the semicolon html element
    <>
      <StringToSpans xvalue={27} text={minutes} />
      <text className="fill-on-dark-background text-8xl" x={205 - 21.66 / 2} y={205 + 21.66}>
        :
      </text>
      <StringToSpans xvalue={60} text={seconds} />
    </>
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
    <svg className="flex " width={410} height={410}>
      <g transform={`rotate(-90 ${'100 100'})`}>
        <ProgressCircle colour="lightgrey" percentage={percentage} />
        <ProgressCircle colour={colour} percentage={pct} />
      </g>
      <RenderTimerText minutes={minutes} seconds={seconds} />
    </svg>
  );
};
