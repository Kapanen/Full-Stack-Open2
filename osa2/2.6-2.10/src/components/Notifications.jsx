const Notification = ({ message }) => {
  if (!message || message.message === '') {
    return null
  }

  return (
    <div className={`notification ${message.type}`}>
      {message.message}
    </div>
  )
}

export default Notification