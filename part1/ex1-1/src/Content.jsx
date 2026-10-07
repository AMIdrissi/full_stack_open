const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => {
        return <Part part={part.name} exercise={part.exercises} />;
      })}
    </div>
  );
};

export default Content;
