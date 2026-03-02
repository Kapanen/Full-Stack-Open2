const Content = ({ parts }) => {
  return (
    <div>
        {parts.map((part, index) =>
          <p key={index}>{part.part} {part.exercises}</p>
        )} 
    </div>
  )
}

export default Content