const Header = ({name}) => {
  return (
    <h1>
      {name}
    </h1>
  );

};

const Part = (props) => {
  return (
    <p>{props.part} {props.num_exercises}</p>
  );
};

const Total = (props) => {
  return (<p>Total exercises: {props.total}</p>)
};

const Content = ({parts}) => {
  return (
    <ul>
      {
      parts.map(partObj => {
        return (
          <Part part={partObj.name}
          num_exercises={partObj.exercises} 
          key={partObj.id} />
        )
      })
      }
    </ul>
  );
};

const Course = ({course}) => {
  let total = course.parts.reduce((acc, part) => acc + part.exercises, 0);
  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total total={total} />
    </div>

  );
}

export default Course