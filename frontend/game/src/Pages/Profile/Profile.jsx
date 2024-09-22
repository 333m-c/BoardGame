import React, { useEffect, useState, useContext } from 'react'
import style from './Profile.module.css'
import UserContext from '../../usercontext'
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const { setUser, user } = useContext(UserContext);
    const navigate = useNavigate()
    if (user.isLogin == "false") {
        navigate('/login')
    }
    const time = ['11.00-12.00', '12.00-13.00', '13.00-14.00',
        '14.00-15.00', '15.00-16.00', '16.00-17.00',
        '17.00-18.00', '18.00-19.00', '19.00-20.00',
        '20.00-21.00', '21.00-22.00', '22.00-23.00'
    ]
    const [newPassword, setNewPassword] = useState(false)
    const [password, setPassword] = useState()
    const [checkPassword, setCheckPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [showHistory, setShowHistory] = useState(false)
    const [image, setImage] = useState(user.profile)
    const [getHistory,setGetHistory]=useState({
        history:[]
    })
    //https://media.istockphoto.com/id/1358773518/vector/black-thug-life-meme-glasses-in-pixel-art-style.jpg?s=612x612&w=0&k=20&c=93g1fyCWjMZQ1-f4WKgTC47k7xZhQXW_M_MJ2xo6IzY=
    let a = '>'
    let historyElement = null
    async function getdata(){
        setShowHistory(!showHistory)
        const dataForPost = {
            username: user.username,
        }
        const data = await fetch('http://localhost:1234/gethistory', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataForPost)
        })
        const json =await data.json()
        console.log(json.history)
        setGetHistory(json)

    }

    async function changeNewPassword() {
        const dataForPost = {
            username: user.username,
            password: checkPassword,
            newPassword: password
        }
        const data = await fetch('http://localhost:1234/chang', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataForPost)
        })
        const jsondata = await data.json()
        if (jsondata.status == "true") {
            alert("Change password success")
            setNewPassword(false)
        }
        else {
            setCheckPassword("")
            setConfirmPassword("")
            setPassword("")
            alert("Password is worng")
        }
    }


    function changepassword(e) {
        e.preventDefault()
        if (password != confirmPassword) {
            setConfirmPassword("")
            alert("Password is worng")
            return
        }
        if(password==''||confirmPassword==''||checkPassword==''){
            alert("Please fill data")
            return
        }
        changeNewPassword()
    }

    async function cancelReserve(index){
        const dataPut={
            indexHistory:index,
            index:user.index,
            username:user.username,
        }
        console.log(user.index)
        const data = await fetch('http://localhost:1234/cancel', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataPut)
        })
    }
    if (showHistory) {
        historyElement = <div className={style.historyContainer} onClick={() => setShowHistory(!showHistory)}>
            <div className={style.historyBox}>
                <div>
                    <center><p className={style.historyText}>HISTORY</p></center>
                </div>
                <div className={style.history}>
                    <center>
                        {getHistory.history.map((item,index) => {
                            return (
                                <div className={style.historyBoxText} key={index}>
                                    <label>{item}</label>
                                    <button className={style.historyBoxButton} onClick={()=>cancelReserve(index)}>cancel</button>
                                </div>
                            )
                        })}
                    </center>
                </div>
                {/* <button className={style.buttonLeaveHistory} onClick={() => setShowHistory(!showHistory)}>X</button> */}
            </div>
        </div>
    }
    let passwordElement
    if (newPassword) {
        passwordElement =
            <div className={style.historyContainer} >
                <div className={style.passwordBox}>
                    <div className={style.textHeadPassword}>
                        <center>CHANG PASSWORD</center>
                    </div>
                    <div className={style.passwordForm}>
                        <form onSubmit={(e) => { changepassword(e) }}>
                            <div>
                                <p className={style.passwordText}>Password :</p>
                                <input className={style.inputPassword} type='text' placeholder='Password' value={checkPassword} onChange={(e) => { setCheckPassword(e.target.value) }}></input>
                            </div>
                            <div>
                                <p className={style.passwordText}>New password :</p>
                                <input className={style.inputPassword} type='text' placeholder='New password' value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
                            </div>
                            <div>
                                <p className={style.passwordText}>Confirm password :</p>
                                <input className={style.inputPassword} type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }}></input>
                            </div>
                            <div className={style.boxbuttonPassword}>
                                <button className={style.inputButtonPassword} type='submit'>Done</button>
                                <button className={style.inputButtonPassword} onClick={() => { setNewPassword(!newPassword) }}>Cancle</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    }


    return (
        <div className={style.container}>
            <div className={style.box}>
                <div>
                    <center><p className={style.textProfile}>PROFILE</p></center>
                </div>
                <center><img src={user.profile} className={style.profileNone} /></center>
                <div className={style.boxSplit}>
                    <div className={style.split}>
                        <div>
                            <div className={style.boxProfile}>
                                <img className={style.image} src={user.profile} />
                            </div>
                            <div className={style.fileimagebox}>
                                <div className={style.fileimage}>
                                    {/* <label >chage profile</label>
                                    <input type='file' className={style.textChangeProfile} onChange={(event) => { setImage(event.target.files[0]) }} accept='image/*q' /> */}
                                </div>
                            </div>
                        </div>
                        <div className={style.boxDetail}>
                            <div className={style.boxData}>
                                <p className={style.topic}>Name :</p>
                                <p className={style.text}>{user.username}</p>
                            </div>
                            <div className={style.boxData}>
                                <p className={style.topic}>email :</p>
                                <p className={style.text}>{user.email}</p>
                            </div>
                            <div className={style.boxData}>
                                <p className={style.topic}>Password</p>
                                <button onClick={() => { setNewPassword(!newPassword) }} className={style.buttonP}>chage</button>
                            </div>
                            <div className={style.boxData}>
                                <p className={style.topic}>History</p>
                                <button onClick={getdata} className={style.buttonP}>{a}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {historyElement}
            {passwordElement}
        </div>
    )
}
