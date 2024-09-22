import React, { useEffect, useState ,useContext} from 'react'
import style from './Popup.module.css'
import BoxReserve from '../BoxReserve/BoxReserve'
import UserContext from '../../usercontext'
import { useNavigate } from 'react-router-dom'

export default function Popup(props) {
    const navigate = useNavigate()
    const { setUser,user } = useContext(UserContext);
    const [count, setCount] = useState(0)
    const [date, setDate] = useState()
    const [arr, setArr] = useState([])
    const [many, setMany] = useState()
    const [jsonData, setJsonData] = useState({
        reserve: []
    })
    const [error, setError] = useState(<div />)
    const [showButton, setShowButton] = useState(false)
    const time = ['11.00-12.00', '12.00-13.00', '13.00-14.00',
        '14.00-15.00', '15.00-16.00', '16.00-17.00',
        '17.00-18.00', '18.00-19.00', '19.00-20.00',
        '20.00-21.00', '21.00-22.00', '22.00-23.00'
    ]
    const [num,setCnum] =useState(0)
    const dateInput = new Date(date)
    function reserve(t) {
        console.log(t)
    }

    function countNum(index) {
        setArr((arr) => [...arr, index])
        incressCount()
        setCount(arr.length())
    }
    function disCountNum(index) {
        setArr((arr)=>arr.filter(item=>item!==index))
        setCount(arr.length())
    }

    async function getData() {
        const postData = {
            name: props.name,
            date: date
        }
        const data = await fetch(`http://localhost:1234/reserve${props.type}1`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        const json = await data.json()
        if(json.status=='false'){
            setError(<div className={style.error}>Not Found</div>)
            setJsonData({
                reserve: []
            })
            setShowButton(false)
            return
        }
        setJsonData(json)
        setError(<div />)
    }

    async function putData() {
        const putData = {
            name: props.name,
            date: date,
            data: arr,
            username:user.username
        }
        try {
            const data = await fetch(`http://localhost:1234/reserve${props.type}1`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(putData)
            })
            const json = await data.json()
            if (json.status == 'false') {
                alert('Can\'t reserve.')
            }
            else{
                alert('Reserve success.')
                setTimeout(()=>{
                    navigate('/reserve')
                },500)
            }
        } catch {
            alert('Can\'t reserve.')
        }
    }

    function reserve() {
        if(setArr.length<=1){
            putData()
            setArr([])
            console.log(arr)
            setTimeout(() => {
                getData()
            }, 1000)
            
        }
    }

    function submitForm(e) {
        e.preventDefault()
        console.log(date)
        console.log(dateInput)
        console.log(dateInput.getDate())
        console.log(dateInput.getMonth() + 1)
        console.log(dateInput.getFullYear())
        setShowButton(true)
        getData()
    }

    useEffect(() => {
        if (arr.length == 0) {
            setMany(<div />)
        }
        else {
            setMany(
                <div className={style.countBox}>
                    <p>เลือกอยู่ {arr.length} รายการ</p>
                </div>)
        }
    }, [arr])
    let elementButton = null
    if (showButton) {
        elementButton = <center><button className={style.button} onClick={reserve}>Done</button></center>
    }

    return (
        <div className={style.bigContainer}>
            <div className={style.container}>
                <div>
                    <center><h1>RESERVE</h1></center>
                    <p>{many}</p>
                </div>
                <div>
                    <form onSubmit={(e) => { submitForm(e) }} className={style.form}>
                        <label htmlFor="dateInput" className={style.labelDate}>{props.name}</label>
                        <input type='date' value={(date)} onChange={(e) => setDate(e.target.value)} id="dateInput" className={style.date}></input>
                        <button type='submit' className={style.submitDate}>SERCH</button>
                    </form>
                </div>
                <div className={style.boxContainer}>
                    {jsonData.reserve.map((item, index) => {
                        if (item == 0) {
                            return (
                                <>
                                    <div className={style.boxFull}>
                                        <p>FULL</p>
                                    </div>
                                </>
                            )
                        }
                        else {
                            return (
                                <>
                                    <BoxReserve count={() => countNum(index)} time={time[index]} disCount={() => disCountNum(index)} />
                                </>
                            )
                        }
                    })}
                    {error}
                </div>
                <div>
                    {elementButton}
                </div>
                <div>
                    <button onClick={props.unShow} className={style.xExit}>x</button>
                </div>
            </div>
        </div>
    )
}
