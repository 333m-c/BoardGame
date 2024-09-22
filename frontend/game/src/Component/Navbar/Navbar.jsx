import React, { useEffect, useState, useContext } from 'react'
import style from './Navbar.module.css'
import UserLogo from '../../Image/userWhite.png'
import { NavLink, useNavigate } from 'react-router-dom';
import menu from '../../Image/Menu.png'
import UserContext from '../../usercontext'




export default function Navbar() {
  const { setUser, user } = useContext(UserContext);
  const [showUser, setShowUser] = useState(null)
  const navigate = useNavigate()
  let slide;
  let isLogin;
  let reserve;
  let profile;
  let comunity
  const [show, setShow] = useState(null);
  function logout(){
    document.cookie='SaigHub='
    window.location.href='/'
  }
  function showTab() {
    if (show == false || show == null) {
      setShow(true)
    }
    else {
      setShow(false)
    }
  }

  let userElement = null
  if(showUser == null){
    userElement=<div/>
  }
  else if (showUser) {
    userElement = <div className={style.userContainer}>
      <center>
        <div><NavLink to='/profile' className={style.textUser}>PROFILE</NavLink></div>
        <div className={style.textUser} onClick={logout}>LOGOUT</div>
      </center>
    </div>
  }
  else{
    userElement = <div className={style.userContainerunshow}>
    <center>
      <div><NavLink to='/profile' className={style.textUser}>PROFILE</NavLink></div>
      <div className={style.textUser} onClick={logout}>LOGOUT</div>
    </center>
  </div>
  }


  if (user.isLogin == 'true') {
    isLogin = <div className={style.login} onClick={() => setShowUser(!showUser)}><img src={user.profile} className={style.userWhite}></img></div>
    reserve = '/reserve'
    comunity = '/comunity'
  }
  else {
    isLogin = <div className={style.boxLogin}><NavLink to='/login' className={style.login} >LOGIN</NavLink></div>
    reserve = '/login'
    comunity = '/login'
  }

  if (show == null) {
    slide = <div></div>
  }

  else if (show) {
    slide =
      <div className={style.box} onClick={showTab}>
        <div className={style.slideContaineractive}>
          <div className={style.barboxslide}><NavLink to='/' className={style.barslide}>HOME</NavLink></div>
          <div className={style.barboxslide}><NavLink to={reserve} className={style.barslide}>RESERVE</NavLink></div>
          <div className={style.barboxslide}><NavLink to={comunity} className={style.barslide}>COMMUNITY</NavLink></div>
        </div>
      </div>
  }
  else {
    slide =
      <div className={style.slideContainerdisactive}>
        <div className={style.barboxslide}><NavLink to='/' className={style.barslide}>HOME</NavLink></div>
        <div className={style.barboxslide}><NavLink to={reserve} className={style.barslide}>RESERVE</NavLink></div>
        <div className={style.barboxslide}><NavLink to={comunity} className={style.barslide}>COMMUNITY</NavLink></div>
      </div>
  }

  async function checkUser() {
    if(document.cookie.slice(8)!=''){
      const token = {
        token: document.cookie.slice(8)
      }
      const data = await fetch('http://localhost:1234', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(token)
      })
      const jsondata = await data.json();
      if (jsondata.isLogin == 'true') {
        setUser({
          username: jsondata.username,
          profile: jsondata.profile,
          status: jsondata.status,
          isLogin: jsondata.isLogin,
          email: jsondata.email,
          history: jsondata.history,
          index:jsondata.index
        })
      }
    }
    else{
      setUser({
        username: '',
        profile: '',
        status: '',
        isLogin: 'false',
        email: '',
        history:'',
        login:'false'
      })
    }
  }
  useEffect(() => {
    checkUser()
  }, [])
  return (
    <>
      <div className={`${style.bar}`}>
        <NavLink to='/' className={style.logo}>CARD GAMES</NavLink>
        <img onClick={showTab} className={style.menu} src={menu}></img>
        <NavLink to='/' className={style.home}>HOME</NavLink>
        <NavLink to={reserve} className={style.home}>RESERVE</NavLink>
        <NavLink to={comunity} className={style.home}>COMMUNITY</NavLink>
        {isLogin}
      </div>
      {slide}
      {userElement}
    </>
  )
}
