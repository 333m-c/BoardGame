
import './App.css'
import { Route, Routes, BrowserRouter, json } from 'react-router-dom'
import Home from './Pages/Home/Home.jsx'
import Layout from './Layout/Layout'
import ReservePlace from './Pages/Reserve/ReservePlace.jsx';
import Reserve from './Pages/Reserve/Reserve.jsx';
import ReserveGame from './Pages/Reserve/ReserveGame.jsx';
import BoxReserve from './Component/BoxReserve/BoxReserve.jsx';
import Table from './Pages/Reserve/ReservePlace/Table/Table.jsx'
import Viproom from './Pages/Reserve/ReservePlace/Viproom/Viproom.jsx'
import Room from './Pages/Reserve/ReservePlace/Room/Room.jsx'
import Community from './Pages/Community/Community.jsx';
import Profile from './Pages/Profile/Profile.jsx';
import Login from './Pages/Login/Login.jsx';
import Signin from './Pages/Singin/Signin.jsx';
import { UserProvider} from './usercontext.jsx';
import Admin from './Pages/Admin/Admin.jsx';

function App() {

  return (
    <BrowserRouter>
      <UserProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/home" element={<Home/>} />
            <Route path='/admin' element={<Admin/>}/>
            <Route path='/comunity' element={<Community/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/singin' element={<Signin/>} />
            <Route path="/reserve" element={<Reserve/>} />
            <Route path="/reserve/place" element={<ReservePlace/>} />
            <Route path="/reserve/game" element={<ReserveGame/>} />
            <Route path='/reserve/place/table' element={<Table/>} />
            <Route path='/reserve/place/viproom' element={<Viproom/>} />
            <Route path='/reserve/place/room' element={<Room/>} />
          </Routes>
        </Layout>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
