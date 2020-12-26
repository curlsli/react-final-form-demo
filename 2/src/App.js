/* eslint-disable jsx-a11y/accessible-emoji */
import React, { forwardRef, MutableRefObject, useEffect, useImperativeHandle, useRef, useState } from 'react'
import Styles from './Styles'
import { Form, Field } from 'react-final-form'
import { required, limit20, limitFn } from './validate'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

const composeValidators = (...validators) => value => validators.reduce((error, validator) => error || validator(value), undefined);


const Condition = ({ when, is, children }) => {
  return (
    <Field name={when} subscription={{ value: true }}>
      {({ input: { value } }) => (value === is ? children : null)}
    </Field>
  );
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

    const verifyName = async values => {
      await sleep(2000)
      if (
        ~['aaaa', 'bbbb'].indexOf(
          values && values.toLowerCase()
        )
      ) {
        return 'Username error!'
      }

      return undefined;
    }

    return (
        <Styles>
          <h1>React Final Form - Simple Example</h1>
          <Form
            onSubmit={onSubmit}
            initialValues={{
              type: '1',
            }}
            render={({ handleSubmit, form, submitting, pristine, values, validating }) => {
                formRef.current = {
                    form,
                    values
                }
                return (
                    <form onSubmit={handleSubmit}>
                      <div>
                        <label>type</label>
                        <div>
                        <label>
                          <Field
                            name="type"
                            component="input"
                            type="radio"
                            value="1"
                            ref={inputRef}
                          />
                          类型1
                        </label>
                        <label>
                          <Field
                            name="type"
                            component="input"
                            type="radio"
                            value="2"
                          />类型2
                        </label>
                        </div>
                      </div>

                      <Condition when="type" is="1">
                        <div>
                          <Field 
                            name="firstName"
                            validate={
                              composeValidators(required, limit20, verifyName)
                            }
                          >
                            {({ input, meta }) => (
                              <div>
                                <label>First Name</label>
                                <input {...input} type="text" placeholder="First Name" />
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                {validating &&  'validating ...'}
                              </div>
                            )}
                          </Field>
                        
                        </div>
                        <div>
                          <Field 
                            name="lastName"
                            validate={
                              composeValidators(required, val => limitFn(val, 5))
                            }
                          >
                            {({ input, meta }) => (
                              <div>
                                <label>Last Name</label>
                                <input {...input} type="text" placeholder="Last Name" />
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                              </div>
                            )}
                          </Field>
                        </div>
                      </Condition>

                      <Condition when="type" is="2">
                        <div>
                            <Field 
                              name="useName"
                              validate={
                                composeValidators(required, limit20)
                              }
                            >
                              {({ input, meta }) => (
                                <div>
                                  <label>User Name</label>
                                  <input {...input} type="text" placeholder="User Name" />
                                  {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                              )}
                            </Field>
                          
                          </div>
                          <div>
                            <Field 
                              name="password"
                              validate={
                                composeValidators(required, limit20)
                              }
                            >
                              {({ input, meta }) => (
                                <div>
                                  <label>PassWord</label>
                                  <input {...input} type="text" placeholder="PassWord" />
                                  {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                              )}
                            </Field>
                          </div>
                      </Condition>
                      
            
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