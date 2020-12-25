/* eslint-disable jsx-a11y/accessible-emoji */
import React, { forwardRef, MutableRefObject, useEffect, useImperativeHandle, useRef, useState } from 'react'
import Styles from './Styles'
import { Form, Field } from 'react-final-form'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

const App = forwardRef((props, ref) => {

    const formRef = useRef({})

    const inputRef = useRef(null)

    // 透传给父组件
    useImperativeHandle(ref, () => {
        return {
            form: formRef.current.form,
            getValues: () => formRef.current.values,
            inputFirstName: inputRef,
        }
    }, [new Date()]);

    const hanldeGetValues = (form, name) => {
        const firstName = form.getFieldState(name)
        console.log( firstName )
        console.log( inputRef )
    }

    useEffect(() => {
        console.log('KKK')
    }, [formRef.current])

    return (
        <Styles>
          <h1>React Final Form - Simple Example</h1>
          <Form
            onSubmit={onSubmit}
            initialValues={{}}
            render={({ handleSubmit, form, submitting, pristine, values }) => {
                formRef.current = {
                    form,
                    values
                }
                return (
                    <form onSubmit={handleSubmit}>
                      <div>
                        <label>First Name</label>
                        <Field
                          name="firstName"
                          component="input"
                          type="text"
                          placeholder="First Name"
                          ref={inputRef}
                        />
                      </div>
                      <div>
                        <label>Last Name</label>
                        <Field
                          name="lastName"
                          component="input"
                          type="text"
                          placeholder="Last Name"
                        />
                      </div>
            
                      <div className="buttons">
                        <button type="submit" disabled={submitting || pristine}>
                          Submit
                        </button>
                        <button
                          type="button"
                          onClick={form.reset}
                          disabled={submitting || pristine}
                        >
                          Reset
                        </button>
                        <button onClick={e => { e.preventDefault(); hanldeGetValues(form, 'firstName') }}>
                          获取First Name value
                        </button>
                      </div>
                    </form>
                  )
            }}
          />
        </Styles>
      )
})

export default App;