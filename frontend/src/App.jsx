import './App.css'
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';

function App() {
  return (
      <div className="App">
        <Header />
        <ToastContainer />
        <Outlet />
      </div>

  )
}

export default App;
