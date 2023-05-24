import { useState, useContext } from "react"
import {contextApp} from '../App'


function CreateTask() {
 
    const [project, setProject] = useState()
    const [task, setTask] = useState()


    function projectChange (e:any) {
      setProject(e.target.value)
    }
    function taskChange (e:any) {
      setTask(e.target.value)
    }

    function saveProject() {

      const projectData = {
        name: project,
        id: Math.random() * 1000
      }

      fetch('http://localhost:3000/projects', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(projectData)
      }).then(() => {console.log("klart")})
      .catch((err) => {console.log(err,"eeros")})
    }

    function saveTask() {

      const taskData = {
        name: task,
        id: Math.random() * 1000
      }

      fetch('http://localhost:3000/tasks', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(taskData)
      }).then(() => {console.log("klart")})
      .catch((err) => {console.log(err,"eeros")})
    }

    return (
      <>
      <div>
      <h2>Skapa projekt</h2>
        <input 
        type="text" 
        placeholder="Projekt namn"
        value={project}
        onChange={projectChange}
        />
        <p>{project}</p>
        <button
        onClick={saveProject}>
          Spara projekt
        </button>
      </div>

      <div>
      <h2>Skapa ett task</h2>
        <input 
        type="text" 
        placeholder="Projekt namn"
        value={task}
        onChange={taskChange}
        />
        <p>{task}</p>
        <button
        onClick={saveTask}
        >Spara</button>
      </div>
      

      </>
    )
  }
  
  export default CreateTask
