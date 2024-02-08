import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth'
import axios from 'axios'
import { MdDeleteOutline } from "react-icons/md";
import toast from 'react-hot-toast';
import { LuCheckCircle } from "react-icons/lu";
const Task = () => {
    const [tasks, setTasks] = useState([])
    const [auth, setAuth] = useAuth()
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const getAllTasks = async () => {
        try {
            const userid = auth?.user._id;
            const { data } = await axios.get(`/task/all-tasks/${userid}`)
            if (data?.success) {
                setTasks(data?.tasks);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }


    const handleStatusChange = async (taskid, newStatus) => {
        try {
            const { data } = await axios.put(`/task/update-status/${taskid}`, { status: newStatus });
            if (data?.success) {
                setTasks(prevTasks => {
                    return prevTasks.map(task => {
                        if (task._id === taskid) {
                            return { ...task, status: newStatus };
                        }
                        return task;
                    });
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    const filteredTasks = tasks.filter((task) => {
        if (priorityFilter !== 'all' && task.priority !== priorityFilter) {
            return false;
        }
        if (statusFilter !== 'all' && task.status !== statusFilter) {
            return false;
        }
        return true;
    });
    const handleReset = () => {
        setPriorityFilter('all')
        setStatusFilter('all')
    }

    const handleDelete = async (taskid) => {
        try {
            await axios.delete(`/task/delete-task/${taskid}`);
            setTasks((prevTasks) => prevTasks.filter(task => task._id != taskid))
        } catch (error) {
            console.log(error)
        }
    }

    //deadline notification
    const isToday = (date) => {
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        )
    }

    useEffect((e) => {
        getAllTasks()

        tasks.forEach((item) => {
            if (isToday(new Date(item.deadline))) {
                // alert(`Today is the deadline for ${item.taskname} task`)
                toast.success(`Today is the deadline of task`);
            }
        })
    }, [auth])
    return (
        <>
            <div className="task-page">
                <div className="filter-side">
                    <h2>Filter</h2>
                    <div className="filter1">
                        <h4>Priority</h4>
                        <select className="form-select" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                    <div className="filter2">
                        <h4>Status</h4>
                        <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            <option value="backlog">Backlog</option>
                            <option value="todo">Todo</option>
                            <option value="doing">Doing</option>
                            <option value="done">Done</option>
                        </select>
                    </div>
                    <button className='btn btn-danger' onClick={handleReset}>Reset Filter</button>
                </div>
                <div className="task-side">
                    <div className='task-container'>
                        <ul>{filteredTasks.length < 0 ? (<h1>No Task created</h1>) : (
                            filteredTasks.map((item) => (
                                <li key={item._id}>
                                    <h6 className='task-title' >{item.taskname}</h6>
                                    <div className="details">
                                        <div className='status-box' >
                                            <select className="form-select" value={item.status} onChange={(e) => handleStatusChange(item._id, e.target.value)}>
                                                <option value="backlog">Backlog</option>
                                                <option value="todo">Todo</option>
                                                <option value="doing">Doing</option>
                                                <option value="done">Done</option>
                                            </select>
                                            {item.status === 'done' && <p><LuCheckCircle /></p>}
                                        </div>
                                        <div className='priority-box' > <span>Priority: </span> <h5 className={item.priority} ></h5></div>
                                        <button className='delete-btn' onClick={() => handleDelete(item._id)}> <MdDeleteOutline /></button>
                                        <h6> <span>Deadline: </span> {new Date(item.deadline).toLocaleDateString('en-IN')}{isToday(new Date(item.deadline)) && <span style={{ color: '#c50101' }}>Today is Deadline!</span>}
                                        </h6>
                                    </div>
                                </li>
                            ))
                        )}

                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Task