import React, { Component } from "react";
import "./App.css";

import Controls from "./components/Controls";
import Board from "./components/Board";

const NUM_STAGES = 4;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        { name: "task 0", stage: 0 },
        { name: "task 1", stage: 0 },
        { name: "task 2", stage: 0 },
        { name: "task 3", stage: 0 },
        { name: "task 4", stage: 1 },
        { name: "task 5", stage: 1 },
        { name: "task 6", stage: 1 },
        { name: "task 7", stage: 2 },
        { name: "task 8", stage: 2 },
        { name: "task 9", stage: 3 }
      ],
      selectedTask: {}
    };
    this.stagesNames = ["Backlog", "To Do", "Ongoing", "Done"];

    this.onMoveTask = this.onMoveTask.bind(this);
    this.onPressTask = this.onPressTask.bind(this);
    this.onDeleteTask = this.onDeleteTask.bind(this);
    this.onCreateNewTask = this.onCreateNewTask.bind(this);
  }

  onCreateNewTask(name, stage = 0) {
    let newTask = { name, stage };
    this.setState(({ tasks }) => {
      tasks.push(newTask);
      return { tasks };
    });
  }

  onDeleteTask({ taskId }) {
    this.setState(({ tasks }) => {
      tasks.splice(taskId, 1);
      return { tasks, selectedTask: {} };
    });
  }

  onPressTask(selectedTask) {
    this.setState({ selectedTask });
  }

  onMoveTask(isBack) {
    const { tasks, selectedTask } = this.state;
    const { taskId } = selectedTask;
    const stage = tasks[taskId].stage;
    tasks[taskId].stage = isBack ? stage - 1 : stage + 1;
    const newSelectedTask = { ...tasks[taskId], taskId };
    this.setState({ tasks, selectedTask: newSelectedTask });
  }

  render() {
    const { tasks, selectedTask } = this.state;
    const stagesTasks = [];
    for (let i = 0; i < NUM_STAGES; ++i) {
      stagesTasks.push([]);
    }
    tasks.forEach((task, index) => {
      stagesTasks[task.stage].push({ ...task, taskId: index });
    });

    return (
      <div className="App">
        <Controls
          selectedTask={selectedTask}
          onMoveTask={this.onMoveTask}
          onDeleteTask={this.onDeleteTask}
          stagesLenth={this.stagesNames.length}
          onPressCreateTaskButton={this.onCreateNewTask}
        />
        <Board
          stagesTasks={stagesTasks}
          onPressTask={this.onPressTask}
          stagesNames={this.stagesNames}
        />
      </div>
    );
  }
}

export default App;
