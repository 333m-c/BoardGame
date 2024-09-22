import React, { useState,useContext } from 'react'
import style from './ReservePlace.module.css'
import table from '../../Image/Table.jpg'
import room from '../../Image/unnamed.jpg'
import vip from '../../Image/VIPROOM.png'
import Box from '../../Component/Box/Box'
import Popup from '../../Component/Popup/Popup'
import { NavLink,useNavigate } from 'react-router-dom'
import UserContext from '../../usercontext'

export default function Reserve(props) {
    const { setUser,user } = useContext(UserContext);
    const navigate = useNavigate()
    const object = [{
        type: "TABLE",
        image: table,
        price: 20
    }, {
        type: "VIPROOM",
        image: vip,
        price: 100
    }, {
        type: "ROOM",
        image: room,
        price: 50
    }]




    if(user.isLogin=="false"){
        navigate('/login')
    }
    return (
        <>

            <div className={style.container}>
                {object.map((item) => {
                    return (
                        <NavLink to={item.type.toLowerCase()} className={style.link}>
                            <Box name={item.type} url={item.image} left={item.price} />
                        </NavLink>
                    )
                })}
            </div>
        </>
    )
}
