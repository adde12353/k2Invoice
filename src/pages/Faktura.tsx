import { useState, useContext, useEffect } from "react"
import { useParams } from "react-router-dom";
import {contextApp} from '../App'

function Faktura() {
  const [data, setData] = useState()
  const {id} = useParams()
  useEffect(() => {
    fetch('http://localhost:3000/invoice')
    .then(results => results.json())
    .then(data => 
      {const newData = data.find(item => item.id == id)
        setData(newData)
      }
      )
  },[])

  
  
  
  return (
    <>
    <h2>Faktura</h2>
    <p>{data && data.name}</p>
    <p>{data && data.dueDate}</p>
 <div className="invoiceCardSection">
  
  

 </div>
      
 
    </>
  )
}

export default Faktura