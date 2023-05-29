import { useState, useContext } from "react";
import { contextApp } from '../App';
import dayjs from "dayjs";

interface Task {
  id: number;
  name: string;
}

interface contextApp {
    taskData: any
}

interface TimeLog {
  id: number;
  taskId: number;
  startTime: string;
  stopTime?: string;
  time: number
}

const Time: React.FC = () => {
    
    const { taskData } = useContext<ContextApp | null>(contextApp);
    const [idValue, setIdValue] = useState<number | string>("");

  const [interValID, setIntervalId] = useState<NodeJS.Timer | undefined>();
  const [time, setTime] = useState<number | null>(null);
  const [idTime, setIdTime] = useState<number | null>(null);

  function valueSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    setIdValue(parseInt(e.target.value));
  }

  function startTime() {
    let time: number = 0;
    let timeArray: TimeLog[] = [];

    const idtime = Math.trunc(Math.random() * 1000);
    setIdTime(idtime);

    fetch(`http://localhost:3000/timelog/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: idtime,
        taskId: idValue!,
        startTime: dayjs().format(),
      }),
    })
      .then(() => {
        console.log("klart");
      })
      .catch((err) => {
        console.log(err, "eeros");
      });

    const interID = setInterval((): void => {
      let getTime = JSON.parse(localStorage.getItem("time") || "null");

      time++;

      if (getTime !== null) {
        getTime.forEach((element: TimeLog) => {
          if (element.id == idValue) {
            time = element.time;
            time++;
            element.time = time;
            localStorage.setItem("time", JSON.stringify(getTime));
          } else {
            let findTime = getTime.find((item: TimeLog) => item.id == idValue);
            if (findTime === undefined) {
              const userTime = {
                id: idValue!,
                time: time,
              };
              getTime.push(userTime);
              localStorage.setItem("time", JSON.stringify(getTime));
            }
          }
        });
      } else {
        const test = getTime.find((item: TimeLog) => item.id == idValue);
        console.log(test);
        const userTime = {
          id: idValue!,
          time: time,
        };
        timeArray.push(userTime);
        localStorage.setItem("time", JSON.stringify(timeArray));
      }
      setTime(time);
    }, 1000);
    setIntervalId(interID);
  }

  function stopTime() {
    fetch(`http://localhost:3000/timelog/${idTime}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stopTime: dayjs().format() }),
    })
      .then(() => {
        console.log("klart");
      })
      .catch((err) => {
        console.log(err, "eeros");
      });
    clearInterval(interValID!);
  }

  return (
    <>
      <h3>Time</h3>
      <div className="timeTracker">
        <select name="" id="" onChange={valueSelect}>
          <option defaultChecked>Välj task</option>
          {taskData &&
            taskData.map((task: Task) => (
              <option key={task.id} value={task.id}>
                {task.name}
              </option>
            ))}
        </select>
        <p>{time}</p>
        <button onClick={startTime}>Start</button>
        <button onClick={stopTime}>Stop</button>
      </div>
    </>
  );
};

export default Time;
