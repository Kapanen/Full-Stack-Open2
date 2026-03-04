import { useState } from 'react'

// simple reusable line for a single statistic
const StatisticLine = ({ text, value }) => {
  return (
    <div>
      {text} {value}
    </div>
  )
}



const Statistics = ({ props }) => {
  const { good, neutral, bad } = props
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = (good / total) * 100

  if (total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={`${positive}%`} />
    </div>
  )
}

const Button = ({ goodClick, neutralClick, badClick }) => (
  <div>
    <button onClick ={goodClick}>good</button>
    <button onClick ={neutralClick}>neutral</button>
    <button onClick ={badClick}>bad</button>
  </div>
)




const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handlegoodClick = () => {setGood (good + 1)}
  const handleneutralClick = () => {setNeutral (neutral + 1)}
  const handlebadClick = () => {setBad (bad + 1)}

  return (
    <div>
      <h1>give feedback</h1>
      <Button goodClick = {handlegoodClick}
        neutralClick = {handleneutralClick}
        badClick = {handlebadClick} />
      <h2>statistics</h2>
      <Statistics props={{ good, neutral, bad }} />
    </div>
  )
}

export default App