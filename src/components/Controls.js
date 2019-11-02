import React, { Component } from "react";

class Controls extends Component {
  constructor(props) {
    super(props);
    this.onChangeNewTaskInput = this.onChangeNewTaskInput.bind(this);
    this.onPressCreateTaskButton = this.onPressCreateTaskButton.bind(this);
    this.onPressDeleteTaskButton = this.onPressDeleteTaskButton.bind(this);
    this.state = {
      newTaskInputValue: ""
    };
  }

  onPressCreateTaskButton() {
    const { onPressCreateTaskButton } = this.props;
    if (onPressCreateTaskButton) {
      onPressCreateTaskButton(this.state.newTaskInputValue);
      this.setState({ newTaskInputValue: "" });
    }
  }

  onPressDeleteTaskButton() {
    const { onDeleteTask, selectedTask } = this.props;
    if (onDeleteTask) {
      onDeleteTask(selectedTask);
    }
  }

  onMoveTask({ isBack = false } = {}) {
    const { onMoveTask } = this.props;
    if (onMoveTask) {
      onMoveTask(isBack);
    }
  }

  onChangeNewTaskInput({ target }) {
    this.setState(() => ({
      newTaskInputValue: target.value
    }));
  }

  render() {
    const { selectedTask, stagesLenth } = this.props;
    return (
      <div style={{ padding: "1rem", background: "#D6F3FF" }}>
        <h1>Controls</h1>
        <div style={{ display: "flex" }}>
          <input
            value={this.state.newTaskInputValue}
            onChange={this.onChangeNewTaskInput}
            placeholder="New task name"
            style={{ fontSize: "1rem" }}
            data-testid="new-task-name-input"
          />
          <button
            style={{ marginLeft: "1rem" }}
            disabled={!this.state.newTaskInputValue}
            data-testid="create-task-btn"
            onClick={this.onPressCreateTaskButton}
          >
            Create
          </button>
        </div>
        <div style={{ display: "flex", marginTop: "1rem" }}>
          <input
            readOnly
            placeholder="Selected task name"
            style={{ fontSize: "1rem" }}
            data-testid="selected-task-field"
            value={selectedTask.name || ""}
          />

          <button
            style={{ marginLeft: "1rem" }}
            disabled={!selectedTask.name || selectedTask.stage === 0}
            data-testid="move-back-btn"
            onClick={() => this.onMoveTask({ isBack: true })}
          >
            Move back
          </button>

          <button
            style={{ marginLeft: "1rem" }}
            data-testid="move-forward-btn"
            onClick={() => this.onMoveTask()}
            disabled={
              !selectedTask.name || selectedTask.stage === stagesLenth - 1
            }
          >
            Move forward
          </button>

          <button
            style={{ marginLeft: "1rem" }}
            disabled={!selectedTask.name}
            data-testid="delete-btn"
            onClick={this.onPressDeleteTaskButton}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default Controls;
