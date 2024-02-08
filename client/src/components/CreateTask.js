import axios from 'axios';
import React, { useState } from 'react'
import { useAuth } from '../context/auth';
import toast from "react-hot-toast";
const CreateTask = () => {
    const [auth, setAuth] = useAuth()
    const [taskname, setTaskname] = useState('');
    const [priority, setPriority] = useState('medium')
    const [deadline, setDeadline] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const id = auth?.user._id
            const { data } = await axios.post('/task/create-task', {
                taskname, priority, deadline, id
            })
            if (data.success) {
                toast.success('Task created')
                window.location.reload();

            } else {
                toast.error(data?.message)
            }
        } catch (error) {
            toast.error('Task cannot created')
            console.log(error)
        }
    }
    return (
        <>
            <div className="login">
                <h3 className="mb-3" >CREATE TASK</h3>
                <form onSubmit={handleSubmit} >
                    <div className="login-info">
                        <div className="mb-3">
                            <input type="text" placeholder='Enter Task' className="form-control" value={taskname} onChange={(e) => setTaskname(e.target.value)} />
                        </div>
                        <div className=" priority-input mb-3">
                            <label className="form-label">Priority</label>
                            <select className="form-select" value={priority} onChange={(e) => setPriority(e.target.value)}>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>

                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Deadline</label>
                            <input type="date" placeholder='Enter deadline' className="form-control" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateTask