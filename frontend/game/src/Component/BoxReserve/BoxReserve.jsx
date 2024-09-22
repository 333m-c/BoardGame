import React, { useState } from 'react'
import './BoxReserve.css'
export default function BoxReserve(props) {
    const [box, setBox] = useState(
        <div className='box' onClick={boxSelected}>
            <div onClick={props.count}>
                <p>{props.time}</p>
            </div>
        </div>)

    function boxSelected() {
        setBox(
            <div className='boxSelected' onClick={boxUnSelected}>
                <div onClick={props.disCount}>
                    <p>{props.time}</p>
                </div>
            </div>)
        console.log(css)
    }
    function boxUnSelected(){
        setBox(
            <div className='box' onClick={boxSelected}>
            <div onClick={props.count}>
                <p>{props.time}</p>
            </div>
        </div>
        )
    }
    
    

    return (
        <>
            {box}
        </>
    )
}
