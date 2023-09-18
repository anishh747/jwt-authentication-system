import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import store from './store.js'
import { Provider } from 'react-redux'
import HomeScreen from './screens/HomeScreen.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Room from './components/Room.jsx'
import Chat from './components/Chat.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/room/:id' element={<Chat />}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>,
  </Provider>
)
