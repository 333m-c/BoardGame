import React, { useEffect, useState, useContext } from 'react'
import style from './Community.module.css'
import userimg from '../../Image/userWhite.png'
import UserContext from '../../usercontext'
import { useNavigate } from 'react-router-dom';

export default function Comunity() {
  const { setUser, user } = useContext(UserContext);
  const navigate = useNavigate()
  if (user.isLogin == "false") {
    navigate('/login')
  }
  const [context, setContext] = useState()
  const [profile, setProfile] = useState(user.profile)
  const [name, setName] = useState(user.username)
  const [listPost, setListPost] = useState([])
  const [comment, setComment] = useState([])
  const [post, setPost] = useState({
    name: 'test1234',
    profile: 'https://media.istockphoto.com/id/1358773518/vector/black-thug-life-meme-glasses-in-pixel-art-style.jpg?s=612x612&w=0&k=20&c=93g1fyCWjMZQ1-f4WKgTC47k7xZhQXW_M_MJ2xo6IzY=',
    context: 'Hello world!!',
    date: '23:59 15/07/2567'
  })
  const [jsonData, setJasonData] = useState([])

  function postData() {
    let d = new Date
    let date = d.getDate()
    let month = (d.getMonth()) + 1
    let year = d.getFullYear()
    let hours = d.getHours()
    let minite = d.getMinutes()
    if(minite.length<=2){
      minite='0'+String(minite)
    }
    const post = {
      username: user.username,
      profile: user.profile,
      text: context,
      comment: [],
      date: String(hours) + ':' + String(minite) + ' ' + String(date) + '/' + String(month) + '/' + String(year)
    }
    const data = fetch('http://localhost:1234/post', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    })
    dataPost()
  }

  function onPostSubmit(event) {
    event.preventDefault()
    console.log(context)
    if (context.length > 0) {
      postData()
    }
    window.location.href='/comunity'
    setContext('')
  }
  const elementPost = jsonData.map((item, index) => {
    return (
      <div key={index} className={style.box}>
        <div className={style.boxProfile}>
          <img src={item.profile} className={style.profile} />
          <div>
            <div className={style.textName}>{item.username}</div>
            <div className={style.textDate}>{item.date}</div>
          </div>
        </div>
        <div className={style.boxContext}>
          <div ><p className={style.context}>{item.text}</p></div>
        </div>
      </div>
    )
  })

  async function dataPost() {
    const data = await fetch('http://localhost:1234/post')
    const json = await data.json()
    setJasonData(json)
    console.log(json)
    console.log(json.reverse())
  }

  useEffect(() => {
    dataPost()
  }, [])


  return (
    <div className={style.container}>
      <div>
        <form onSubmit={(event) => onPostSubmit(event)}>
          <div className={style.boxfrom}>
            <div className={style.boxForPost}>
              <center><input placeholder='POST' type='serch' onChange={(event) => setContext(event.target.value)} value={context} className={style.inputarea} maxLength={70} minLength={3} autoComplete='true'></input></center>
            </div>
            <button type='submit' className={style.submit}>POST</button>
          </div>
        </form>
        <div className={style.post}>
        </div>
        <div className={style.elementPost}>{elementPost}</div>
      </div>
    </div>
  )
}
// elementPost = jsonData.map((item, index) => {
// return (
//   <div key={index} className={style.box}>
//     <div className={style.boxProfile}>
//       <img src={item.profile} className={style.profile} />
//       <div>
//         <div className={style.textName}>{item.username}</div>
//         <div className={style.textDate}>{item.date}</div>
//       </div>
//     </div>
//     <div className={style.boxContext}>
//       <div ><p className={style.context}>{item.text}</p></div>
//     </div>
//   </div>
// )
// })
