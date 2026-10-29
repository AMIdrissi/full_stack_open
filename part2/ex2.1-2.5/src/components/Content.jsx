import Header from "./Header";
import Part from "./Part";

const Content = ({ course }) => {
  const total_exercises = course.parts.reduce(
    (sum, part) => (sum += part.exercises),
    0,
  );

  return (
    <>
      <Header text={course.name} />
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <p style={{ fontWeight: "bold" }}>Total of {total_exercises} exercises</p>
    </>
  );
};

export default Content;
