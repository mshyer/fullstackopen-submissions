const Header = (props) => {
  return (
    <h1>
      {props.course}
    </h1>
  );

};

const Totals = (props) => {
  return (
    <p>{props.total}</p>
  );
};

const Total = (props) => {
  return (<p>Total: {props.total}</p>)
};

const Content = (props) => {
  return (
    <>
    <p>{props.parts[0]} <Totals total={props.exercises[0]}/></p>
    <p>{props.parts[1]} <Totals total={props.exercises[1]}/></p>
    <p>{props.parts[2]} <Totals total={props.exercises[2]}/></p>
    </>
  );
};

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const parts = [part1, part2, part3];
  const exercises = [exercises1, exercises2, exercises3];
  const total = exercises.reduce((acc, ele) => acc + ele);

  return (
    // <div>
    //   <h1>{course}</h1>
    //   <p>
    //     {part1} {exercises1}
    //   </p>
    //   <p>
    //     {part2} {exercises2}
    //   </p>
    //   <p>
    //     {part3} {exercises3}
    //   </p>
    //   <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    // </div>
    <div>
      <Header course={course} />
      <Content parts={parts} exercises={exercises}/>
      <Total total={total}/>
    </div>
  )
}

export default App;
