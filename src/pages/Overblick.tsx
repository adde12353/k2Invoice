import { useContext } from "react";
import { contextApp } from '../App';
import dayjs from "dayjs";

interface Task {
  time: number;
}

interface InvoiceItem {
  task: Task[];
  timmpris?: number;
  createDate: string;
}

interface timeData {
  id: number;
  taskId?: number;
  startTime: string;
  stopTime: string
}


const Faktura: React.FC = () => {
  const { invoiceData, taskData, projectData, timeData } = useContext<contextApp | null>(contextApp);

  const projectTotal = projectData && projectData.length;
  const taskDataTotal = taskData && taskData.length;
  const invoiceDataTotal = invoiceData && invoiceData.length;

  const filterData = timeData;
  const date = dayjs().subtract(1, 'month');
  let filterDataArray: any[] = [];
  filterData && filterData.forEach((item: timeData) => {
    if (dayjs(item.startTime).isAfter(dayjs(date))) {
      filterDataArray.push(item);
    }
  });

  const totalTime = filterDataArray.length;

  const filterMoney = invoiceData;
  const MoneyDate = dayjs().subtract(1, 'year');
  let MoneyTotal = 0;
  filterMoney && filterMoney.forEach((item: InvoiceItem) => {
    if (dayjs(item.createDate).isAfter(dayjs(MoneyDate))) {
      let time = 0;
      item.task.forEach((element: Task) => {
        time += element.time;
      });
      MoneyTotal += time / 60000 * item.timmpris! / 60;
    }
  });
  MoneyTotal = Math.trunc(MoneyTotal);

  return (
    <>
      <h2>Överblick</h2>
      <p>Andtal projekt: {projectTotal}</p>
      <p>Andtal tasks: {taskDataTotal}</p>
      <p>Andtal Fakturor: {invoiceDataTotal}</p>
      <p>Tid loggat 30 dagar: {totalTime}</p>
      <p>Pris under hela året: {MoneyTotal}kr</p>
    </>
  );
};

export default Faktura;
