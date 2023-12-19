/**
 * @jest-environment jsdom
 */
import { ProgressCircle, RenderTimerText, StringToTextElement, CircularProgress } from '@/src/components/circular-progress';
import { render, screen } from '@testing-library/react';

describe('ProgressCircle', () => {
  test('renders progress circle component', () => {
    const testColour = 'lightgrey';
    const testPercentage = 80;

    render(<ProgressCircle data-testid={`progress-circle-${testColour}-test`} colour={testColour} percentage={testPercentage} />);
    const progressCircle = screen.getByTestId(`progress-circle-${testColour}-test`);

    // test that the progress circle is rendered
    expect(progressCircle).toBeInTheDocument();

    // test that the progress circle has the correct colour
    expect(progressCircle).toHaveAttribute('stroke', testColour);

    // test that the progress circle has the correct percentage
    const r = 197.5;
    const circ = 2 * Math.PI * r;
    const strokePercentage = ((100 - +testPercentage) * circ) / 100;
    const strokePercentageToString = strokePercentage.toString();
    expect(progressCircle).toHaveAttribute('stroke-dashoffset', strokePercentageToString);
  });
});

describe('StringToTextElement', () => {
  test('renders string to text element component', () => {
    const testXvalue = 27;
    const testMinutes = 25;
    const testMinutesToString = testMinutes.toString();

    render(
      <StringToTextElement data-testid="strings-to-text-element-test" xvalue={testXvalue} text={testMinutesToString} />
    );

    for (let i = 0; i < testMinutesToString.length; i++) {
      const StringToTextElement = screen.getByTestId(`strings-to-text-element-test-${i}`);

      // test that the string to to text element is rendered
      expect(StringToTextElement).toBeInTheDocument();

      // test that the string to to text element has the correct x value
      const expectedXValue = `${testXvalue + i * 13}%`;
      expect(StringToTextElement).toHaveAttribute('x', expectedXValue);

      // test that the string to to text element has the correct text
      expect(StringToTextElement).toHaveTextContent(testMinutesToString[i]);
    }
  });
});

describe('RenderTimerText', () => {
  test('renders timer text component', () => {
    const testMinutes = 23;
    const testMinutesToString = testMinutes.toString();
    const testSeconds = 59;
    const testSecondsToString = testSeconds.toString();

    render(
      <RenderTimerText
        data-testid="render-timer-text-test"
        minutes={testMinutesToString}
        seconds={testSecondsToString}
      />
    );

    // test that the timer text component is rendered
    const timerText = screen.getByTestId('render-timer-text-test');
    expect(timerText).toBeInTheDocument();

    // test that the timer text component has the correct number of children
    expect(timerText.children.length).toBe(5);

    // test that the timer text component has the correct first child
    const firstChild = timerText.children[0];
    expect(firstChild).toHaveAttribute('x', '27%');
    expect(firstChild).toHaveTextContent(testMinutesToString[0]);

    // test that the timer text component has the correct second child
    const secondChild = timerText.children[1];
    expect(secondChild).toHaveAttribute('x', '40%');
    expect(secondChild).toHaveTextContent(testMinutesToString[1]);

    // test that the timer text component has the correct third child
    const thirdChild = timerText.children[2];
    expect(thirdChild).toHaveAttribute('x', '194.17');
    expect(thirdChild).toHaveAttribute('y', '226.66');
    expect(thirdChild).toHaveTextContent(':');

    // test that the timer text component has the correct fourth child
    const fourthChild = timerText.children[3];
    expect(fourthChild).toHaveAttribute('x', '60%');
    expect(fourthChild).toHaveTextContent(testSecondsToString[0]);

    // test that the timer text component has the correct fifth child
    const fifthChild = timerText.children[4];
    expect(fifthChild).toHaveAttribute('x', '73%');
    expect(fifthChild).toHaveTextContent(testSecondsToString[1]);
  });
});


describe('CircularProgress', () => {
  const testColour = 'blue';
  const testPercentage = 50;
  const testMinutes = 10;
  const testMinutesToString = testMinutes.toString();
  const testSeconds = 20;
  const testSecondsToString = testSeconds.toString();

  test('renders the circular progress component', () => {
    render(<CircularProgress colour={testColour} percentage={testPercentage} minutes={testMinutesToString} seconds={testSecondsToString} />);
    const progressElement = screen.getByTestId('circular-progress-test');
    expect(progressElement).toBeInTheDocument();
  });

  test('renders progress circle component', () => {
    render(<CircularProgress colour={testColour} percentage={testPercentage} minutes={testMinutesToString} seconds={testSecondsToString} />);
    const upperCircle = screen.getByTestId(`progress-circle-${testColour}-test`);
    expect(upperCircle).toHaveAttribute('stroke', 'blue');
    expect(upperCircle).toHaveAttribute('stroke-dashoffset', expect.any(String));
  });

  test('renders timer text component', () => {
    render(<CircularProgress colour={testColour} percentage={testPercentage} minutes={testMinutesToString} seconds={testSecondsToString} />);
    const timerText = screen.getByTestId('render-timer-text-test');
    expect(timerText).toHaveTextContent('10:20');
  });

  test('handles invalid percentage values correctly', () => {
    render(<CircularProgress colour="blue" percentage={-testPercentage} minutes={testMinutesToString} seconds={testSecondsToString} />);
    const upperCircle = screen.getByTestId(`progress-circle-${testColour}-test`);
    expect(upperCircle).toHaveAttribute('stroke-dashoffset', expect.any(String));
  });
});
