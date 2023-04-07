import React, { Component } from "react";
import PropTypes from "prop-types";

import "./newTaskForm.css";

export default class NewTaskForm extends Component {
  state = {
    value: "",
  };

  changeState = (evt) => {
    this.setState({ value: evt.target.value });
  };

  submitValue = (evt) => {
    evt.preventDefault();
    const { value } = this.state;
    const { addItem } = this.props;

    if (value.trim() !== "") {
      addItem(value);
    }
    this.setState({ value: "" });
  };

  render() {
    return (
      <header className="header">
        <h1>Todos</h1>
        <form onSubmit={this.submitValue}>
          <input
            type="text"
            className="new-todo edit"
            placeholder="What needs to be done?"
            autoFocus
            value={this.state.value}
            onChange={this.changeState}
          />
        </form>
      </header>
    );
  }

  static propTypes = {
    addItem: PropTypes.func.isRequired,
  };
}
