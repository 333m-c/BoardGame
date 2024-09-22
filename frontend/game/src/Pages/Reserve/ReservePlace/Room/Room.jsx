import React, { useState,useContext, useEffect } from 'react'
import style from './Room.module.css'
import room from '../../../../Image/unnamed.jpg'
import Box from '../../../../Component/Box/Box'
import Popup from '../../../../Component/Popup/Popup'
import UserContext from '../../../../usercontext'   
import { NavLink, useNavigate } from 'react-router-dom'

export default function Reserve() {
    const { setUser,user } = useContext(UserContext);
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [popup, setPopup] = useState()

    const object = [{
        type: "ROOM A",
        image: room,
        price: ''
    },{
        type: "ROOM B",
        image: room,
        price: ''
    },{
        type: "ROOM C",
        image: room,
        price: ''
    }]


    function showPopup(name) {
        setShow(!show)
        setPopup(<Popup name={name} unShow={unShowPopup} type={"Place"}/>)
    }
    function unShowPopup() {
        setShow(!show)
        setPopup()
    }

    const arrow ="<"
    if(user.isLogin=="false"){
        navigate('/login')
    }
    return (
        <>
            <div className={style.container}>
            <NavLink to={"/reserve/place"} className={style.back}>{arrow}</NavLink>
                {object.map((item) => {
                    return (
                        <Box name={item.type} url={item.image} left={item.price} show={() => showPopup(item.type)} />
                    )
                })}
            </div>
            {popup}
        </>
    )
}
