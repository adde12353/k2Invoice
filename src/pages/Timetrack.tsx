import { useState, useContext } from "react"
import {contextApp} from '../App'
import dayjs from "dayjs";

function Time() {
    const value:any = useContext(contextApp);
    const [task, setTask] = useState(value);
    const [idValue, setIdValue] = useState()
    

    const [interValID, setIntervalId] = useState()
    const [time, setTime] = useState(null)

    function valueSelect (e:any){
        setIdValue(e.target.value)
    }

    function startTime () {
        let time:any = 0
        let timeAerray:any = []
        


        fetch(`http://localhost:3000/tasks/${idValue}`, {
            method: "PATCH",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({startTime: dayjs()})
          }).then(() => {console.log("klart")})
          .catch((err) => {console.log(err,"eeros")})
        
        const interID = setInterval((): void => {
            let getTime = JSON.parse(localStorage.getItem('time'))
           
            time++

            if(getTime !== null) {
               getTime.forEach(element => {
                    if(element.id == idValue)
                    {
                        time = element.time
                        time++
                        element.time = time
                        localStorage.setItem('time', JSON.stringify(getTime))
                    }
                    else {
                        let findTime = getTime.find(item => item.id == idValue)
                        if(findTime === undefined){
                            const userTime= {
                                id: idValue,
                                time: time
                        }
                        getTime.push(userTime)
                        console.log(getTime)
                        localStorage.setItem('time', JSON.stringify(getTime))
                        }
                        
                    }
               });
            } else {
                const test = getTime.find(item => item.id == idValue)
                console.log(test)
                const userTime= {
                id: idValue,
                time: time
            } 
            timeAerray.push(userTime)
            localStorage.setItem('time', JSON.stringify(timeAerray))

            }
        setTime(time)
        },1000)
        setIntervalId(interID)
    }

    function stopTime () {
        fetch(`http://localhost:3000/tasks/${idValue}`, {
            method: "PATCH",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({stopTime: dayjs()})
          }).then(() => {console.log("klart")})
          .catch((err) => {console.log(err,"eeros")})
        clearInterval(interValID)

    }
  return (
    <>
   
        <h3>TIme</h3>
        <select 
                name="" 
                id=""
                onChange={valueSelect}
                > 
        {value && value.map((task:any) => (
                <option key={task.id} value={task.id}>{task.name}</option>
        ))} 
         </select>
          
            <p>{idValue}</p>
        <p>{task}</p>
        <p>{time}</p>
        <button onClick={startTime}>Start</button>
        <button onClick={stopTime}>Stop</button>
    </>
  )
}

export default Time