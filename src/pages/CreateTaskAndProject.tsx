import { useState } from "react";

interface ProjectData {
  name: string;
}

interface TaskData {
  name: string;
}

const CreateTask: React.FC = () => {
  const [project, setProject] = useState<string | undefined>();
  const [task, setTask] = useState<string | undefined>();
  const [finishedPost, setFinishedPost] = useState<string | undefined>();
  const [finishedTask, setFinishedTask] = useState<string | undefined>();

  const projectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProject(e.target.value);
  };

  const taskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const saveProject = () => {
    const projectData: ProjectData = {
      name: project || "",
    };

    fetch('http://localhost:3000/projects', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData)
    }).then(() => { setFinishedPost("Skapat") })
      .catch((err) => { setFinishedPost(err) });
  };

  const saveTask = () => {
    const taskData: TaskData = {
      name: task || "",
    };

    fetch('http://localhost:3000/tasks', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData)
    }).then(() => { setFinishedTask("klart") })
      .catch((err) => { setFinishedTask(err) });
  };

  return (
    <>
      <div className="inputCard">
        <h2>Skapa projekt</h2>
        <input
          type="text"
          placeholder="Projekt namn"
          value={project}
          onChange={projectChange}
        />
        <p>{finishedPost}</p>
        <button
          onClick={saveProject}>
          Spara projekt
        </button>
      </div>

      <div className="inputCard">
        <h2>Skapa ett task</h2>
        <input
          type="text"
          placeholder="Projekt namn"
          value={task}
          onChange={taskChange}
        />
        <p>{finishedTask}</p>
        <button
          onClick={saveTask}
        >Spara</button>
      </div>
    </>
  );
};

export default CreateTask;
