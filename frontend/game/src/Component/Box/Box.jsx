import React from 'react'
import style from './Box.module.css'
import { NavLink } from 'react-router-dom'

export default function Box(props) {
    let text
    if(props.left==''){
        text =''
    }
    else{
        text ='-'+props.left+'.'
    }
    return (
        <>
        <div className={style.bigbox}>
            <div className={style.box}onClick={props.show}>
                <center>
                    <img className={style.image} src={props.url} />
                    <p className={style.text}>{props.name}</p>
                    <p className={style.left}> {text}</p>
                </center>
            </div>
        </div>
        </>
    )
}
