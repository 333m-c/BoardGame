import React , { useContext } from 'react'
import style from './Reserve.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import game from '../../Image/game.jpg'
import place from '../../Image/place.jpg'
import UserContext from '../../usercontext'


export default function Reserve() {
    const { setUser,user } = useContext(UserContext);
    const navigate = useNavigate()
    if(user.isLogin=="false"){
        navigate('/login')
    }
    return (
        <div className={style.container}>
            <div className={style.bigbox}>
                <NavLink to='/reserve/game' className={style.box}>
                    <center>
                        <img className={style.image} src ={game}/>
                        <p className={style.text}>GAME</p>
                    </center>
                </NavLink>
            </div>
            <div className={style.bigbox}>
                <NavLink to='/reserve/place' className={style.box}>
                    <center>
                        <img className={style.image} src ={place}/>
                        <p className={style.text}>PLACE</p>
                    </center>
                </NavLink>
            </div>
        </div>
    )
}
