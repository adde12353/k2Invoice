import { useState, useContext, ChangeEvent } from "react";
import { contextApp } from '../App';
import dayjs from "dayjs";

interface Task {
  id: number;
  name: string;
  time?: number;
}

interface InvoiceData {
  name: string;
  project: string | undefined;
  task: Task[];
  timmpris: number | undefined;
  createDate: dayjs.Dayjs;
  dueDate: dayjs.Dayjs;
  status: string;
}



const Faktura: React.FC = () => {
  const { taskData, projectData, timeData } =  useContext<contextApp | null>(contextApp);
  const [project, setProject] = useState<string>();
  const [task, setTask] = useState<Task>();
  const [totalTasks, setTotalTasks] = useState<number>(0);
  const taskArray: Task[] = [];
  const [taskList, setTasklist] = useState<Task[]>([]);
  const [timmpris, setTimpris] = useState<number>();
  const [namn, setNamn] = useState<string>();

  const inputForm = (e: ChangeEvent<HTMLInputElement> ) => {
    if (e.target.placeholder === "Timmpris") {
      setTimpris(parseInt(e.target.value));
    }
    if (e.target.placeholder === "Namn") {
      setNamn(e.target.value);
    }
    if (e.target.id === "tasks") {
      const task = taskData.find((item: Task) => item.id.toString() === e.target.value.toString());
      setTask(task);
    }
    if (e.target.id === "projects") {
      setProject(e.target.value);
    }
  };

  const addTasks = () => {
    if (task) {
      taskArray.push(task);
      setTasklist([...taskList, task]);
      setTotalTasks(totalTasks + 1);
    }
  };

  const saveInvoice = () => {
    let totalTime = 0;
    taskList.forEach((item) => {
      timeData.forEach((element:any) => {
        const startTIme = dayjs(element.startTime);
        const stopTIme = dayjs(element.stopTime);
        if (item.id === element.taskId) {
          totalTime += stopTIme.diff(startTIme);
          item.time = totalTime;
          console.log(item.time);
        }
      });
    });

    console.log(taskList);

    const invoiceData: InvoiceData = {
      name: namn || "",
      project: project,
      task: taskList,
      timmpris: parseInt(timmpris?.toString() || "0"),
      createDate: dayjs(),
      dueDate: dayjs().add(1, 'month'),
      status: "Ej betald"
    };
    console.log(invoiceData);

    fetch('http://localhost:3000/invoice', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invoiceData)
    }).then(() => { console.log("klart") })
      .catch((err) => { console.log(err, "eeros") });

  };

  return (
    <>
      <h2>Create Invoice</h2>
      <div className="inputCard">
        <select name="" id="projects" 
        onChange={() =>inputForm}>
          <option defaultChecked>Välj task</option>
          {projectData && projectData.map((task: any) => (
            <option key={task.id}
              value={task.id}
            >{task.name}</option>
          ))}
        </select>

        <div>
          <select name="" id="tasks" onChange={() =>inputForm}>
            <option defaultChecked>Välj task</option>
            {taskData && taskData.map((task: any) => (
              <option key={task.id}
                value={task.id}
              >{task.name}</option>
            ))}
          </select>

          <button
            onClick={addTasks}
            className="addBtn"
          >Add task</button>
        </div>
        <p>Antal task : {totalTasks}</p>

        <input
          type="number"
          required
          placeholder="Timmpris"
          onChange={inputForm}
        />
        <input
          type="text"
          required
          placeholder="Namn"
          onChange={inputForm}
        />

        <button
          onClick={saveInvoice}
        >Spara faktura</button>
      </div>
    </>
  );
};

export default Faktura;
