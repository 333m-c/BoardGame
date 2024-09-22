import React, { useEffect, useState,useContext } from 'react'
import style from './Login.module.css'
import { NavLink,useNavigate } from 'react-router-dom'
import UserContext from '../../usercontext'

export default function Login() {
    const [password, setPassword] = useState()
    const [username, setUsername] = useState()
    const [profile,setProfile] = useState()
    const [isLogin, setIsLogin] = useState(false)
    const [forgot, setForgot] = useState()
    const [singin, setSingin] = useState()
    const { setUser,user } = useContext(UserContext);
    const [dataJson,setDataJson]=useState()
    const navigate = useNavigate();

    async function login(){
        const dataForPost={
            username:username,
            password:password
        }
        const data = await fetch('http://localhost:1234/login',{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(dataForPost)
        })
        const jsondata = await data.json()
        if(jsondata.login=='true'){
            setUser(jsondata);
            document.cookie=`SaigHub=${jsondata.token}`;
            window.location.href='/';
        }
        else{
            alert('Username or Password is wrong.')
            setPassword("")
        }
        
    }

    function onSubmitClick(e) {
        e.preventDefault()
        login()
    }


    return (
        <div className={style.container}>
            <div className={style.box}>
                <div>
                    <center><p className={style.head}>LOGIN</p></center>
                </div>
                <form className={style.boxFrom} onSubmit={(e) => onSubmitClick(e)}>
                    <div className={style.boxInput}>
                        <p className={style.text}>Username :</p>
                        <input className={style.inputText} type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username}></input>
                    </div>
                    <div className={style.boxInput}>
                        <p className={style.text}>Password :</p>
                        <input className={style.inputText} type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password}></input>

                    </div>
                    <center>
                        <div className={style.boxInput}>
                            <button type='submit' className={style.buttoneiei}>LOGIN</button>
                        </div>
                        <center>
                            <div className={style.singin}>
                                <NavLink to='/singin' className={style.link}><p className={style.singinText}>Sign in</p></NavLink>
                                <p className={style.line}>|</p>
                                <NavLink to='/forgot' className={style.link}><p className={style.forgot}>Forgot Password?</p></NavLink>
                            </div>

                        </center>
                    </center>
                </form>
            </div>
        </div>
    )
}
