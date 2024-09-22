import React, { useEffect, useState,useContext } from 'react'
import style from './Home.module.css'
import Layout from '../../Layout/Layout'
import { NavLink } from 'react-router-dom';
import Boradgame1 from '../../Image/Boradgame1.jpg'
import Boradgame2 from '../../Image/Boradgame2.jpg'
import Boradgame3 from '../../Image/Boradgame3.jpg'
import Boradgame4 from '../../Image/Boradgame4.jpg'
import Boradgame5 from '../../Image/Boradgame5.jpg'
import UserContext from '../../usercontext'


export default function Home() {
  const { setUser,user } = useContext(UserContext);
  const arrImage=[Boradgame1,Boradgame2,Boradgame3,Boradgame4,Boradgame5]
  let i=0;
  const [image,setImage]=useState(arrImage[i])
  let isLogin;

  if (user.isLogin=="true") {
    isLogin = '/reserve'
  }
  else {
    isLogin = '/login'
  }

  function changImage(){
    setTimeout(() => {
      setImage(arrImage[i])
    }, 10000);
    if(i>=0&&i<5){
      i++
    }
    else{
      i=0
    }
  }

  useEffect(()=>{
    changImage()
  },[i])
  return (
    <div>
      <img className={style.image} src={image}>
      </img>
      <div className={style.saiggame}><center><h1>CARD GAMES</h1></center></div>
      <div className={style.reserveBox2}><center><NavLink to={isLogin} className={style.reserveBox}><h1 className={style.reserve}>RESERVE NOW!</h1></NavLink></center></div>
    </div>
  )
}
