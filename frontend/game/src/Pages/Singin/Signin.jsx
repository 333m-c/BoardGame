import React, {useState } from 'react'
import style from './Signin.module.css'
import { json } from 'react-router-dom'


export default function Signin() {
    const[username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword]= useState('')
    const [email,setEmail]=useState('')
    const [id,setId]=useState({
        username:'',
        password:'',
        email:''
    })
    const [dataJson,setDataJson] =useState()
    async function postSingin(){
        const dataForPost ={    
            username:username,
            password:password,
            email:email
        }
        const data = await fetch('http://localhost:1234/singin',{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(dataForPost)
        })
        const jsondata = await data.json()

        console.log(jsondata.singin)
        setDataJson(jsondata.singin)

        if(jsondata.singin == "true"){
            window.location.href='/login'
        }
        else{
            alert("This user already has.")
        }
    }

    function onSubmitClick(e){
        e.preventDefault()

        if(confirmPassword==password&&email!=''&&password!=''&&username!=''){
            setId({
                username:username,
                password:password,
                email:email
            })
            postSingin()
            setEmail('')
            setConfirmPassword('')
            setPassword('')
            setUsername('')

        }
        else if(email==''||password==''||username==''){
            alert('Please fullfill.')
        }
        else{
            alert('Confirm password is wrong.')
            setConfirmPassword('')
            e.preventDefault()
        }
    }
    return (
        <div className={style.container}>
            <div className={style.box}>
                <div>
                    <center><p className={style.head}>SIGN IN</p></center>
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
                    <div className={style.boxInput}>
                        <p className={style.text}>Confirm Password :</p>
                        <input className={style.inputText} type='password' placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}></input>
                    </div>
                    <div className={style.boxInput}>
                        <p className={style.text}>Email :</p>
                        <input className={style.inputText} type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email}></input>
                    </div>
                    <center>
                        <div className={style.boxInput}>
                            <button type='submit' className={style.buttoneiei}>Sign in</button>
                        </div>
                    </center>
                </form>
            </div>
        </div>
    )
}
