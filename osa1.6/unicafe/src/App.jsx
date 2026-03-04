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
      <table>
        <tbody>
          <tr>
        <td>
          <p>good</p>
          <p>neutral</p>
          <p>bad</p>
          <p>all</p>
          <p>average</p>
          <p>positive</p>
        </td>
        <td>
          <p>{props.good}</p>
          <p>{props.neutral}</p>
          <p>{props.bad}</p>
          <p>{props.total}</p>
          <p>{props.average}</p>
          <p>{props.positive}%</p>
        </td>
        </tr>
        </tbody>
      </table>
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