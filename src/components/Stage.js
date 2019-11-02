import React from "react";

import Task from "./Task";

const Stage = ({ name, stageId, tasks, onPressTask }) => {
  return (
    <div
      data-testid={`stage-${stageId}`}
      style={{
        flexGrow: 1,
        margin: "1rem",
        paddingBottom: "1rem",
        background: "#fafafa"
      }}
    >
      <h2>{name}</h2>
      <div>
        {tasks.map((task, key) => (
          <Task
          task={task}
          onPressTask={onPressTask}
          key={`${task.name}-${key}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Stage;
