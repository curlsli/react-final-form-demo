/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useRef, useState, useEffect } from 'react'
import { render } from 'react-dom'
import App from './App'

const Index = () => {
  const formRef = useRef(null)

  const [values, setValues] = useState(null);

  useEffect(() => {
    console.log( 'formRef:', formRef )
  }, [formRef])

  const handleClick = () => {
    console.log('**************************************************')
    const { form, inputFirstName } = formRef.current;
    const { getFieldState, setConfig } = form;

    // 获取field
    console.log( getFieldState('firstName') );
    
    // 获取子组件ref
    inputFirstName.current.focus();
    setValues(formRef.current.getValues())
  }

  return (
    <>
      <App ref={formRef}/>
      <button onClick={handleClick}>
        获取子组件Form的值
      </button>
      <pre>
        {
          JSON.stringify(values, 0, 2)
        }
      </pre>
    </>
  )
}

render(<Index />, document.getElementById('root'))
