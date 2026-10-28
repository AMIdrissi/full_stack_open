import { useState } from "react";

const Button = ({ onClickEvent, text }) => {
  return <button onClick={onClickEvent}>{text}</button>;
};

const StatisticLine = ({ text, value, percentage = false }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value} {percentage && "%"}
      </td>
    </tr>
  );
};

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad;

  if (total === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text={"good"} value={props.good} />
          <StatisticLine text={"neutral"} value={props.neutral} />
          <StatisticLine text={"bad"} value={props.bad} />
          <StatisticLine text={"all"} value={total} />
          <StatisticLine text={"average"} value={props.computeAverage()} />
          <StatisticLine
            text={"positive"}
            value={props.computePositivePercent()}
            percentage={true}
          />
        </tbody>
      </table>
    </div>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;

  const handleGoodFeedback = () => {
    setGood(good + 1);
  };

  const handleBadFeedback = () => {
    setBad(bad + 1);
  };

  const handleNeutralFeedback = () => {
    setNeutral(neutral + 1);
  };

  const computeAverage = () =>
    (total == 0 ? 0 : (good + bad * -1) / total).toFixed(2);

  const computePositivePercent = () =>
    total == 0 ? 0 : ((good / total) * 100).toFixed(2);

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button onClickEvent={handleGoodFeedback} text={"good"} />
        <Button onClickEvent={handleNeutralFeedback} text={"neutral"} />
        <Button onClickEvent={handleBadFeedback} text={"bad"} />
      </div>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        computeAverage={computeAverage}
        computePositivePercent={computePositivePercent}
      />
    </div>
  );
}

export default App;
