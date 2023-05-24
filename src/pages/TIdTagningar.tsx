import { useState, useContext } from "react"
import {contextApp} from '../App'
import dayjs from "dayjs";

function Time() {
    const value:any = useContext(contextApp);
    const [task, setTask] = useState(value);
    const [idValue, setIdValue] = useState()
    

    let timeIstrue = []
    value && value.forEach(item => {
        if(item.startTime) {
            timeIstrue.push(item)
        }
    });
    

    timeIstrue.map(item => {
        const date1 = dayjs(item.startTime)
        const date2 = dayjs(item.stopTime)
        console.log(date2.diff(date1) / 1000 )
        item.totalTime = Math.trunc(date2.diff(date1) / 1000)
    })
  
  return (
    <>
   
        <h3>Lista</h3>
        {timeIstrue && timeIstrue.map(item =>(
            <div>
  <p>{item.name}</p>
            <p>{item.totalTime}</p>
            </div>
          
        ))}

    </>
  )
}

export default Time