import React, { useEffect, useState, useContext } from 'react'
import style from './Admin.module.css'
import Box from '../../Component/Box/Box'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../usercontext'
export default function Admin() {
    const { setUser, user } = useContext(UserContext);
    const [showAddGame, setShowAddGame] = useState(false)
    const [imageAddGame, setImageAddGame] = useState('')
    const [nameAddGame, setNameAddGame] = useState('')
    const [prize, setPrize] = useState('')
    const navigate = useNavigate()
    async function postGame() {
        const postData = {
            name: nameAddGame,
            image: imageAddGame,
            prize: Number(prize)
        }
        const data = await fetch('http://localhost:1234/listGame', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
    }


    function onAddGameSubmit() {
        if (imageAddGame != '' && nameAddGame != '' && prize != '' && Number(prize) > 0) {
            postGame()
            alert('Add game success')
            setImageAddGame('')
            setNameAddGame('')
            setPrize('')
            return
        }
        alert("please fill data")
    }
    let elementAddGame = null
    if (showAddGame) {
        elementAddGame = <div className={style.containerAddGame}>
            <div className={style.boxAddGame}>
                <div>
                    <center><h1>ADD GAME</h1></center>
                </div>
                <div className={style.boxInputAddGame}>
                    <form onSubmit={onAddGameSubmit}>
                        <div>
                            <p className={style.textAddGame}>Name :</p>
                            <input className={style.InputAddGame} type='text' placeholder='Name' value={nameAddGame} onChange={(e) => setNameAddGame(e.target.value)}></input>
                        </div>
                        <div>
                            <p className={style.textAddGame}>Prize :</p>
                            <input className={style.InputAddGame} type='text' placeholder='Prize' value={prize} onChange={(e) => setPrize(e.target.value)}></input>
                        </div>
                        <div>
                            <p className={style.textAddGame}>Image url :</p>
                            <input className={style.InputAddGame} type='text' placeholder='Name' value={imageAddGame} onChange={(e) => setImageAddGame(e.target.value)}></input>
                            <div className={style.boxPreview}>
                                <img src={imageAddGame} className={style.preview} alt="preview" />
                            </div>
                        </div>
                    </form>
                </div>
                <center>
                    <button onClick={onAddGameSubmit} className={style.xExit}>Add</button>
                    <button onClick={() => setShowAddGame(!showAddGame)} className={style.xExit}>Cancel</button>
                </center>
            </div>
        </div>
    }
    if (user.status != "Admin") {
        navigate('/')
    }
    if (user.isLogin == "false") {
        navigate('/login')
    }


    const typePlace = ["TABLE A", "TABLE B", "TABLE C", "TABLE D", "TABLE E", "TABLE F", "ROOM A", "ROOM B", "ROOM C", "VIPROOM"]
    const [date, setDate] = useState(null)
    const [showReserve, setShowReserve] = useState(false)
    let elementReserve = null
    async function postReservePlace() {
        const postData = {
            name: typePlace,
            date: date,
            reserve: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }
        const data = await fetch('http://localhost:1234/reservePlace', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })

    }

    async function postReserveGame() {
        const postData = {
            date: date,
        }
        const data = await fetch('http://localhost:1234/reserveGame', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
    }
    function onReserveSubmit() {
        if (date != "mm/dd/yyyy" && date != null) {
            postReservePlace()
            postReserveGame()
            setDate("mm/dd/yyyy")
            alert("post success")
            return
        }
        alert("please fill date")
    }
    async function deleteReserve(){
        const postData = {
            date: date,
        }
        const data = await fetch('http://localhost:1234/deleteDate', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
    }
    function onDeleteSubmit(){
        if (date != "mm/dd/yyyy" && date != null) {
            deleteReserve()
            setDate("mm/dd/yyyy")
            alert("delete success")
            return
        }
        alert("please fill date")
    }
    if (showReserve) {
        elementReserve = <div className={style.containerAddGame}>
            <div className={style.boxReserve}>
                <div className={style.smallBoxReserve}>
                    <center><h1 className={style.textHeadReserve}>ADD DATE</h1></center>
                    <center>
                        <input type='date' value={date} onChange={(e) => { setDate(e.target.value) }}></input>
                        <div>
                            <button onClick={onReserveSubmit}>ADD</button>
                            <button onClick={onDeleteSubmit}>DELETE</button>
                        </div>
                    </center>
                    <center><div><button onClick={() => setShowReserve(!showReserve)} className={style.buttonReserve}>DONE</button></div></center>
                </div>
            </div>
        </div>
    }



    return (
        <>
            <div className={style.container}>
                <Box name="Add game" left="" show={() => setShowAddGame(!showAddGame)} url={'https://img.freepik.com/premium-vector/plus-sign-icons-plus-sign-buttons-vector-illustration_665655-13072.jpg'}></Box>
                <Box name="Reserve date" left="" show={() => setShowReserve(!showReserve)} url={'https://img.freepik.com/premium-vector/flat-calendar-with-mark-date_186930-1049.jpg'}></Box>
            </div>
            {elementAddGame}
            {elementReserve}
        </>
    )
}
