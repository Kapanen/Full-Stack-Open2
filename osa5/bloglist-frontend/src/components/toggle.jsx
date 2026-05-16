import { useImperativeHandle, useState, forwardRef } from 'react'

const Togglable = forwardRef((props, ref) => {
const [visible, setVisible] = useState(false)

const toggleVisibility = () => {
  setVisible(!visible)
  }
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  const hide={display: visible ? 'none' : ''}
  const show={display: visible ? '' : 'none'}

  return (
    <div>
      <div style={hide}>
        <button onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>

      <div style={show}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

export default Togglable