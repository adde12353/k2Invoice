import { useContext } from "react";
import { useParams } from "react-router-dom";
import { contextApp } from '../App';

interface Task {
  name: string;
  time: number;
}

interface InvoiceData {
  id: string;
  name: string;
  status: string;
  dueDate: string;
  task: Task[];
  timmpris: number;
  time: number
}

const Faktura: React.FC = () => {
  const { invoiceData } = useContext<contextApp | null>(contextApp);
  const { id } = useParams<{ id: string }>();
  const newData = invoiceData && invoiceData.find((item: InvoiceData) => item.id === id);


  let totalPrice = 0;
  newData?.task.forEach((element: InvoiceData)=> {
    totalPrice += element.time;
  });

  return (
    <>
      <h2>Faktura</h2>
      <p>Kundens namn: {newData?.name}</p>
      <p>Status: {newData?.status}</p>
      <p>Förfallodag: {newData?.dueDate}</p>
      <p>Tasks:</p>
      {newData?.task.map((task:any, index:number) => (
        <div key={index}>
          <p>Tasknamn: {task.name}</p>
          <p>Tid: {task.time}</p>
        </div>
      ))}
      <p>Totaltid: {Math.trunc(totalPrice / 60000)}m * {newData?.timmpris}/hr = {Math.trunc(newData?.timmpris / 60 * totalPrice / 60000)}kr</p>
      <div className="invoiceCardSection">
        {/* Add your content here */}
      </div>
    </>
  );
};

export default Faktura;
