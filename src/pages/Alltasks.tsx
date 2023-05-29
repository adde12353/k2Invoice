import { useContext } from "react";
import { contextApp } from '../App';

interface Task {
  id: number;
  name: string;
}

function AllTask() {
  const { taskData, setTaskData } = useContext<contextApp | null>(contextApp);

  function deleteTask(id: number) {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'DELETE'
    });

    const filter = taskData.filter((item: Task) => item.id !== id);
    setTaskData(filter);
  }

  console.log(taskData);

  return (
    <>
      <h2>All Task</h2>

      <table>
        <tbody>
          <tr>
            <td className="headerCell">Task Name</td>
            <td className="headerCell">Delete?</td>
          </tr>
        </tbody>
        <tbody>
          {taskData && taskData.map((item: Task, index: number) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td onClick={() => { deleteTask(item.id) }}>Delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default AllTask;
