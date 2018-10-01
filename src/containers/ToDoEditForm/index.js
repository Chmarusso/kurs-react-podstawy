import React, { Component } from 'react'
import { Formik, Field } from 'formik'
import { get, update } from '../../helpers/toDoItemApi'
import { SubmitButton, TextInput, Label, Select } from '../../helpers/theme'
import { Redirect } from 'react-router-dom'

class ToDoEditForm extends Component {
  state = {
    fetched: false,
    todoItem: null,
    finished: false
  }

  itemId = () => this.props.match.params.itemId

  componentDidMount = async () => {
    const todoItem = await get(this.itemId())
    this.setState({todoItem, fetched: true})
  }

  render() {
    return (
      <div>Editing task #{this.itemId()}
        {this.state.fetched
          ? <Formik
              initialValues={{...this.state.todoItem}}
              onSubmit={(values, actions) => {
                update(this.itemId(), {...values})
                this.setState({finished: true})
              }}
              validate={(values) => {
                let errors = {};
                if (!values.content) {
                  errors.content = 'Required'
                } else if (values.content.includes('ass')) {
                  errors.content = 'Mind your language'
                } else if (values.content.length < 3) {
                  errors.content = 'Too short'
                }

                return errors
              }}
              render={({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Label>
                    Content *
                    {errors.content && touched.content && <div>{errors.content}</div>}
                    <TextInput
                      onBlur={handleBlur}
                      name="content"
                      onChange={handleChange}
                      value={values.content}
                    />
                  </Label>
                  <Label>
                    Priority
                    <Select name="priority" onChange={handleChange} value={values.priority}>
                      <option value="low">Low</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </Select>
                  </Label>
                  <Label>
                    Done?
                    <input type="checkbox" onChange={handleChange} name="done" value={values.done} checked={values.done} />
                  </Label>
                  <SubmitButton type="submit">
                    Submit
                  </SubmitButton>
                </form>
              )}
            />
          : <p>Loading</p>
        }
        {this.state.finished && <Redirect to='/' />}
      </div>
    )
  }
}

export default ToDoEditForm
