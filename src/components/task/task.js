import React, { Component } from "react";
import PropTypes from "prop-types";

import { formatDistanceToNow } from "date-fns";

import "./task.css";

export default class Task extends Component {
  state = {
    value: this.props.text,
  };

  classChange(done, edit) {
    let classNames = "";
    if (done) {
      classNames = "completed";
    } else if (edit) {
      classNames = "editing";
    }
    return classNames;
  }
  valueChange = (evt) => {
    this.setState({ value: evt.target.value });
  };

  submitFixTask = (evt) => {
    const { id, onFixTask } = this.props;
    evt.preventDefault();
    onFixTask(id, this.state.value);
  };

  render() {
    const { text, id, done, edit, date, onDeleted, onToggleDone, onEdited } =
      this.props;

    const addDate = formatDistanceToNow(date, {
      includeSeconds: true,
      addSuffix: true,
    });

    return (
      <li className={this.classChange(done, edit)}>
        <div className="view">
          <div className="clicable" onClick={onToggleDone}>
            <input id={id} type="checkbox" className="toggle" />
            <label htmlFor={id} onClick={onToggleDone}>
              <span className="description">{text}</span>
              <span className="created">created {addDate}</span>
            </label>
          </div>
          <button
            type="button"
            className="icon icon-edit"
            onClick={onEdited}
          ></button>
          <button
            type="button"
            className="icon icon-destroy"
            onClick={onDeleted}
          ></button>
        </div>
        <form onSubmit={this.submitFixTask}>
          <input
            type="text"
            className="edit"
            value={this.state.value}
            onChange={this.valueChange}
          ></input>
        </form>
      </li>
    );
  }

  static defaultProps = {
    text: "",
    id: `new_id`,
    done: false,
    edit: false,
    date: new Date(),
  };

  static propTypes = {
    text: PropTypes.string,
    id: PropTypes.string,
    done: PropTypes.bool,
    edit: PropTypes.bool,
    date: PropTypes.any,
  };
}
