import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Task from './pages/Task';
import CreateTask from './components/CreateTask';
import toast, { Toaster } from 'react-hot-toast';


function App() {
  return (
    <>  <Toaster />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/task' element={<Task />} />
        <Route path='/task/create-task' element={<CreateTask />} />

      </Routes>
    </>
  );
}

export default App;
