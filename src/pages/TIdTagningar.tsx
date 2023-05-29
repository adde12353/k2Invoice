import { useContext } from "react";
import { contextApp } from '../App';
import dayjs from "dayjs";

interface TimeDataItem {
  id: number
  startTime: string;
  stopTime: string;
  taskId: number;
  totalTime?: number;
  name?: string;
  formatDate?: string;
}

const Time: React.FC = () => {
  const { timeData, setTimeData, taskData } = useContext<contextApp | null>(contextApp);

  timeData && timeData.map((item: TimeDataItem) => {
    const date1 = dayjs(item.startTime);
    const date2 = dayjs(item.stopTime);
    item.totalTime = Math.trunc(date2.diff(date1) / 1000);
    timeData && taskData.map((task: TimeDataItem) => {
      if (task.id === item.taskId) {
        item.name = task.name;
      }
    });
  });

  //filter 30 dagar
  const filterData = timeData;
  const date = dayjs().subtract(1, 'month');
  let filterDataArray: TimeDataItem[] = [];
  filterData && filterData.forEach((item: TimeDataItem) => {
    if (dayjs(item.startTime).isAfter(dayjs(date))) {
      item.formatDate = dayjs(item.startTime).format('DD/MM/YYYY');
      filterDataArray.push(item);
    }
  });

  function deleteTime(id: number) {
    fetch(`http://localhost:3000/timelog/${id}`, {
      method: 'DELETE'
    });

    const filter = timeData.filter((item: TimeDataItem) => item.id !== id);
    setTimeData(filter);
  }

  return (
    <>
      <h3>Lista</h3>
      <table>
        <tbody>
          <tr>
            <td className="headerCell">Task namn</td>
            <td className="headerCell">Datum</td>
            <td className="headerCell">Total tid</td>
            <td className="headerCell">Ta bort?</td>
          </tr>
        </tbody>
        <tbody>
          {filterData && filterData.map((item: TimeDataItem, index:number) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.formatDate}</td>
              <td>{item.totalTime}</td>
              <td onClick={() => { deleteTime(item.id) }}>Delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Time;
