import { useContext } from "react";
import { Link } from "react-router-dom";
import { contextApp } from '../App';
import dayjs from "dayjs";

interface Task {
  name: string;
  time: number;
}

interface InvoiceItem {
  id: number;
  name: string;
  date: string;
  betald: boolean;
  createDate: string;
  task: Task[];
  formatDay?: string;
  time?: number;
  timmpris?: number;
  dueDate: string
}

const Faktura: React.FC = () => {
  const { invoiceData, setinvoiceData } = useContext<contextApp | null>(contextApp);

  let totalPrice = 0;
  invoiceData && invoiceData.map((item: InvoiceItem) => {
    const date = dayjs(item.dueDate).format('DD/MM/YYYY');
    item.formatDay = date;
    item.task.map(items => {
      totalPrice += items.time;
    });
    item.time = totalPrice;
  });

  function deleteInvoice(id: number) {
    fetch(`http://localhost:3000/invoice/${id}`, {
      method: 'DELETE'
    });

    const filter = invoiceData.filter((item: InvoiceItem) => item.id !== id);
    setinvoiceData(filter);
  }

  return (
    <>
      <h2>Fakturor</h2>
      <table>
        <tbody>
          <tr>
            <td className="headerCell">Projekt namn</td>
            <td className="headerCell">Förfaller</td>
            <td className="headerCell">summa</td>
            <td className="headerCell">Ta bort?</td>
          </tr>
        </tbody>
        <tbody>
          {invoiceData && invoiceData.map((item: InvoiceItem, index:number) => (
            <tr key={index}>
              <Link to={"/faktura/" + item.id}><td>{item.name}</td></Link>
              <td>{item.formatDay}</td>
              <td>{Math.trunc(item.time! / 60000 * item.timmpris! / 60)}kr</td>
              <td onClick={() => { deleteInvoice(item.id) }}>Delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Faktura;
