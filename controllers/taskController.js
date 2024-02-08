const taskModel = require('../models/task')
const userModel = require('../models/user')
const createTask = async (req, res) => {
    try {
        const { taskname, priority, deadline, id } = req.body;
        if (!taskname || !deadline) {
            return res.status(400).send({
                success: false,
                message: "Please provide all fields"
            })
        }
        const tasklist = new taskModel({
            taskname, priority, deadline, createdBy: id
        })
        await tasklist.save();
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }
        user.task.push(tasklist);
        await user.save();
        return res.status(200).send({
            success: true, tasklist
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({ success: false, message: 'task addition failed' });
    }
}

const getAllTasks = async (req, res) => {
    try {
        const { userid } = req.params;
        const tasks = await taskModel.find({ createdBy: userid })
        return res.status(200).send({
            success: true, tasks
        });
    } catch (error) {
        console.log(error)
        return res.status(400).send({ success: false, message: error })
    }
}

const updateStatus = async (req, res) => {
    try {
        const { taskid } = req.params;
        const { status } = req.body; // Extract status from request body
        const updatedTask = await taskModel.findByIdAndUpdate(taskid, { status }, { new: true });

        if (!updatedTask) {
            return res.status(404).send({ success: false, message: "Task not found" });
        }

        return res.status(200).send({ success: true, task: updatedTask });
    } catch (error) {
        console.log(error)
        return res.status(400).send({ success: false, message: error })
    }
}

const deleteTask = async (req, res) => {
    try {
        const { taskid } = req.params;
        const deletedTask = await taskModel.findByIdAndDelete(taskid);

        if (deletedTask) {
            const updatedUser = await userModel.findOneAndUpdate(
                { task: taskid },
                { $pull: { task: taskid } },
                { new: true }
            );

            if (updatedUser) {
                return res.status(200).send({
                    success: true,
                    message: "Task deleted successfully",
                    task: deletedTask
                });
            } else {
                return res.status(404).send({
                    success: false,
                    message: "Task ID not found in user tasks array",
                    task: deletedTask
                });
            }
        } else {
            return res.status(404).send({
                success: false,
                message: "Task not found"
            });
        }

    } catch (error) {
        return res.status(400).send({ success: false, message: "Delete failed" })
    }
}

module.exports = { createTask, getAllTasks, updateStatus, deleteTask }