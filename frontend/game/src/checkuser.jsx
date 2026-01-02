import React from 'react'

export default async function checkuser() {
    const { setUser,user } = useContext(UserContext);
    const token ={
        token:document.cookie
      }
      const data = await fetch('http://backend:1234',{
        method:"POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(token)
      })
      const jsondata = await data.json();
      if(jsondata.isLogin=='true'){
        setUser({
          username: jsondata.username,
          profile: jsondata.profile,
          status: jsondata.status,
          isLogin:jsondata.isLogin,
          email:jsondata.email,
          history:jsondata.history
        })
      }
}
