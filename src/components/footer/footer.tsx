import React, { Component } from 'react'
import classNames from 'classnames'

import './footer.css'

type IProps = {
  allCount: number
  doneCount: number
  filter: string
  onFilterChange: (name: string) => void
  onClearCompleted: () => void
}

export default class Footer extends Component<IProps> {
  buttons = [
    { name: 'all', text: 'All' },
    { name: 'active', text: 'Active' },
    { name: 'completed', text: 'Completed' },
  ]

  render() {
    const { allCount, doneCount, onFilterChange, filter, onClearCompleted } = this.props

    const buttons = this.buttons.map(({ name, text }) => {
      const buttonNames = classNames({
        // prettier-ignore
        'selected': name === filter,
      })

      return (
        <li key={name}>
          <button name={name} className={buttonNames} onClick={() => onFilterChange(name)}>
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
}
