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
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ],
  }
  const total = course.parts.reduce((sum, partObj) => sum + partObj.exercises);

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={total}/>
    </div>
  )
}

export default App;
