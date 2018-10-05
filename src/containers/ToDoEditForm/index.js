import React, { Component } from 'react'
import { get, update } from '../../helpers/toDoItemApi'
import { Formik } from 'formik'
import { withRouter } from 'react-router-dom'
import {
  SubmitButton,
  TextInput,
  Label,
  Select,
  ErrorMsg
} from '../../helpers/theme'
import * as _ from 'ramda'

class ToDoEditForm extends Component {
  state = {
    toDoItem: null,
    fetched: false,
    disabled: false
  }

  itemId = () => this.props.match.params.itemId

  componentDidMount = async () => {
    const toDoItem = await get(this.itemId())
    this.setState({toDoItem, fetched: true})
  }

  render() {
    return (
      <div>
        Edit form {this.itemId()}
        {this.state.fetched
          ? <Formik
              initialValues={{...this.state.toDoItem}}
              onSubmit={async (values) => {
                await update(this.itemId(), {...values})
                this.props.history.push('/')
              }}
              validate={(values) => {
                let errors = {}

                if (!values.content) {
                  errors.content = "Required"
                } else if (values.content.length < 3) {
                  errors.content = 'Too short. Minium 3 characters...'
                } else if (values.content.includes('ass')) {
                  errors.content = 'Mind your language'
                }

                if(_.isEmpty(errors)) {
                  this.setState({disabled: false})
                } else {
                  this.setState({disabled: true})
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
                isSubmitting
              }) => (
                <form onSubmit={handleSubmit}>
                  <Label>
                    Content *
                    <ErrorMsg>{errors.content}</ErrorMsg>
                    <TextInput
                      name='content'
                      onChange={handleChange}
                      value={values.content}
                    />
                  </Label>

                  <Label>
                    Priority
                    <Select name='priority' onChange={handleChange}
                      value={values.priority}>
                      <option value='low'>Low</option>
                      <option value='high'>High</option>
                      <option value='urgent'>Urgent</option>
                    </Select>
                  </Label>

                  <Label>
                    Done?
                    <input type='checkbox' name='done' value={values.done}
                      checked={values.done} onChange={handleChange} />
                  </Label>
                  <br/>
                  <SubmitButton type='submit' disabled={this.state.disabled}>
                    Update
                  </SubmitButton>
                </form>
              )}
            />
          : <p>Loading....</p>
        }
      </div>
    )
  }
}

export default withRouter(ToDoEditForm)
