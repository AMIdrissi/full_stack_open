const sum = (list_of_numbers) => {
  let S = 0;
  for (const element of list_of_numbers) {
    S += element;
  }
  return S;
};

const Total = ({ exercises }) => {
  return <p>Number of exercises {sum(exercises)}</p>;
};

export default Total;
