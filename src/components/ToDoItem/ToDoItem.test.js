import React from 'react'
import { shallow } from 'enzyme'
import ToDoItem from './'
import { expect } from 'chai'
import sinon from 'sinon'

describe('<ToDoItem />', () => {
  const toDoProps = {
    id: 1,
    text: 'Lorem ipsum'
  }

  it('renders text', () => {
    const wrapper = shallow(<ToDoItem {...toDoProps} />)
    expect(wrapper.find('div').text()).to.contain(toDoProps.text)
  })

  it('removes item on removal click', () => {
    const removeHandler = sinon.spy()
    const wrapper = shallow(<ToDoItem {...toDoProps} destroy={removeHandler} />)
    wrapper.find('button').simulate('click')
    expect(removeHandler.calledOnceWith(toDoProps.id)).to.eq(true)
  })

  it('toggles item done flag on click', () => {
    const toggleHandler = sinon.spy()
    const wrapper = shallow(<ToDoItem {...toDoProps} toggleDone={toggleHandler} />)
    wrapper.find('div').simulate('click')
    expect(toggleHandler.calledOnceWith(toDoProps.id)).to.eq(true)
  })
})
