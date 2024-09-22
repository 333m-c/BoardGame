import React, { useState, useContext, useEffect } from 'react'
import style from './ReserveGame.module.css'
import Box from '../../Component/Box/Box'
import Popup from '../../Component/Popup/Popup'
import UserContext from '../../usercontext'
import { useNavigate } from 'react-router-dom'

export default function Reserve(props) {
    const { setUser, user } = useContext(UserContext);
    const [text, setText] = useState('')
    const navigate = useNavigate()


    const [show, setShow] = useState(false)
    const [popup, setPopup] = useState()
    const [data, setData] = useState([])

    async function getData() {
        const postData = {
            text: text
        }
        const res = await fetch('http://localhost:1234/listGame1', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        const json = await res.json()
        setData(json)
    }


    function showPopup(name) {
        setShow(!show)
        setPopup(<Popup name={name} unShow={unShowPopup} type={'Game'} />)
    }
    function unShowPopup() {
        setShow(!show)
        setPopup()
    }
    useEffect(() => {
        getData()
    }, [text])
    if (user.isLogin == "false") {
        navigate('/login')
    }

    return (
        <div className={style.bigBox}>
            <div className={style.boxSerch}>
                <input type='serch' className={style.serch} placeholder='   Serch' onChange={(e) => setText(e.target.value)} value={text}></input>
            </div>
            <div>
                <div className={style.container}>
                    {data.map((item) => {
                        return (
                            <Box name={item.name} url={item.image} left={''} show={() => showPopup(item.name)} price={'20'} />
                        )
                    })}
                </div>
            </div>
            {popup}
        </div>
    )
}
