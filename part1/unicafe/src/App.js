import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.cbFunc}>
      {props.text}
    </button>
  )
}

const Datum = (props) => {
  return (
    <tr>
      <th>{props.text}:</th>
      <td> {props.count}</td>
    </tr>
  )
}

const Stats = ({good, neutral, bad, all, average, positive}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <>
      <p>No feedback given</p>
      </>
    )
  }
  return (
  <table>
    <tbody>
      <Datum text={'good'} count={good}/>
      <Datum text={'neutral'} count={neutral}/>
      <Datum text={'bad'} count={bad}/>
      <Datum text={'all'} count={all}/>
      <Datum text={'average'} count={average}/>
      <Datum text={'positive'} count={positive}/>
    </tbody>
  </table>
  )

}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  let all = good + neutral + bad;
  let average = (good - bad) / (good + neutral + bad);
  let positive = 100 * (good / (good + neutral + bad));

  const incrementGood = () => {
    console.log('good')
    setGood(good + 1)
  }
  
  function incrementNeutral() {
    console.log('neutral')
    setNeutral(neutral + 1)
  }
  
  function incrementBad() {
    console.log('bad')
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button cbFunc={incrementGood} text='Good'/>
      <Button cbFunc={incrementNeutral} text='Neutral'/>
      <Button cbFunc={incrementBad} text='Bad'/>

      <h1>statistics</h1>
      <Stats 
        good={good} 
        bad={bad} 
        neutral={neutral} 
        all={all} 
        average={average} 
        positive={positive}/>
    </div>
  )
}

export default App