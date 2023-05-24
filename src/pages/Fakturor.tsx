import { useState, useContext, useEffect } from "react"
import {Outlet, Link} from "react-router-dom"
import {contextApp} from '../App'
import dayjs from "dayjs"

function Faktura() {
  const [data, setData] = useState()
  const [filterData, setFilterData] = useState()
  useEffect(() => {
    fetch('http://localhost:3000/invoice')
    .then(results => results.json())
    .then(data => {
      setData(data)
      setFilterData(data)
    })
  },[])
  
  
  function filter30Days() {
    console.log(data)
    const filterData = data
    
    const date = dayjs().subtract(1, 'month')
    let filterDataArray = []
    filterData && filterData.forEach(item => {
      if(dayjs(item.createDate).isAfter(dayjs(date))){
        filterDataArray.push(item)
      }
    })
    setFilterData(filterDataArray)
  }
  function allaFakturor () {
    console.log(data)
    setFilterData(data)
  }

  return (
    <>
    <h2>Fakturor</h2>
    <button
    onClick={filter30Days}
    >
      Sista 30 dagarna
    </button>
    <button
    onClick={allaFakturor}
    >
Alla Fakturor
    </button>
      
    
 <div className="invoiceCardSection">
    
 {filterData && filterData.map((item:any, index:number) => (
          <Link to={"/faktura/" + item.id} key={item.id}><div className="invoiceCard">
            <h3>{item.name}</h3>
            <p>{item.date}</p>
            <p>{item.betald}</p>
          </div></Link>
        ))
      }
 </div>
      
 
    </>
  )
}

export default Faktura