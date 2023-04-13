import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './footer.css'

export default class Footer extends Component {
  buttons = [
    { name: 'all', text: 'All' },
    { name: 'active', text: 'Active' },
    { name: 'completed', text: 'Completed' },
  ]

  render() {
    const { allCount, doneCount, onFilterChange, onClearCompleted } = this.props
    const buttonClass = classNames({
      // prettier-ignore
      'all': this.buttons.name === 'all',
      // prettier-ignore
      'active': this.buttons.name === 'active',
      // prettier-ignore
      'completed': this.buttons.name === 'completed',
    })
    const buttons = this.buttons.map(({ name, text, type }) => {
      return (
        <li key={name}>
          <button type={type} name={name} className={buttonClass} onClick={() => onFilterChange(name)}>
            {text}
          </button>
        </li>
      )
    })
    return (
      <footer className="footer">
        <div className="todo-count">{allCount - doneCount} items left</div>
        <ul className="filters">{buttons}</ul>
        <button type="button" className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      </footer>
    )
  }

  static defaultProps = {
    allCount: 0,
    doneCount: 0,
    filter: 'all',
  }
  static propTypes = {
    allCount: PropTypes.number,
    doneCount: PropTypes.number,
    filter: PropTypes.string,
    onFilterChange: PropTypes.func.isRequired,
    onClearCompleted: PropTypes.func.isRequired,
  }
}
