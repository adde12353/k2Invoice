import { useState, useContext } from "react"
import {contextApp} from '../App'
import dayjs from "dayjs";

function Faktura() {
  const value:any = useContext(contextApp);
  const [project, setProject] = useState()
  const [task, setTask] = useState()
  let taskArray = []
  const [taskList, setTasklist] = useState()

  const [timmpris, setTimpris] = useState()
  const [namn, setNamn] = useState()
  
  function inputForm (e) {
    if(e.target.placeholder === "Timmpris")
    {
      setTimpris(e.target.value)
    }
    if(e.target.placeholder === "Namn"){
      setNamn(e.target.value)
    }
    if(e.target.id === "tasks"){
      const task = value.find(item => item.id == e.target.value)
      setTask(task)
      console.log(task)
    }
    if(e.target.id === "projects")
    {
      /* const project = value.find(item => item.id == e.target.value) */
      setProject(e.target.value)}
  }

  function addTasks () {
    taskArray.push(task)
    setTasklist(taskArray)
  }


  function saveInvoice () {
    const invoiceData = {
      id: Math.trunc(Math.random() * 1000),
      name: namn,
      project: project,
      task: [value[0], value[1]],
      timmpris: parseInt(timmpris),
      createDate: dayjs(),
      dueDate: dayjs().add(1, 'month'),
      betald: false
    }
    console.log(invoiceData)

    fetch('http://localhost:3000/invoice', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(invoiceData)
      }).then(() => {console.log("klart")})
      .catch((err) => {console.log(err,"eeros")})

  }

  return (
    <>
    <h2>Create Invoice</h2>
    <select name="" id="projects">
      <option value="">project</option>
    </select>

        <select name="" id="tasks" onChange={inputForm}>
        {value && value.map((task:any) => (
          <option key={task.id} 
          value={task.id}
          >{task.name}</option>
  ))}</select>
  <button
  onClick={addTasks}
  ></button>

          <input 
          type="number" 
          placeholder="Timmpris"

          onChange={inputForm}
          />
          <input 
          type="text" 
          placeholder="Namn"
          onChange={inputForm}
          />
      <p>{timmpris}</p>
      <p>{namn}</p>
        <p>{taskList && taskList.map(item => (
          <p key={item.id}>{item}</p>
        ))}</p>
      <p>
        {project}
      </p>
      <button
      onClick={saveInvoice}
      >Save invcoice</button>
    </>
  )
}

export default Faktura