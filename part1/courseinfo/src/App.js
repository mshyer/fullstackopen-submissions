const Header = (props) => {
  return (
    <h1>
      {props.course}
    </h1>
  );

};

const Part = (props) => {
  return (
    <p>{props.part} {props.num_exercises}</p>
  );
};

const Total = (props) => {
  return (<p>Total: {props.total}</p>)
};

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].name} num_exercises={props.parts[0].exercises}/>
      <Part part={props.parts[1].name} num_exercises={props.parts[1].exercises}/>
      <Part part={props.parts[2].name} num_exercises={props.parts[2].exercises}/>
    </div>
  );
};

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  const parts = [part1, part2, part3];  
  const total = parts.reduce((sum, partObj) => sum + partObj.exercises);

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
      <Content parts={parts} />
      <Total total={total}/>
    </div>
  )
}

export default App;
