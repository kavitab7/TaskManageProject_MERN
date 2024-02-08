const express = require('express');
const { createTask, getAllTasks, updateStatus, deleteTask } = require('../controllers/taskController');

const router = express.Router();

router.post('/create-task', createTask)
router.put('/update-status/:taskid', updateStatus)
router.get('/all-tasks/:userid', getAllTasks)
router.delete('/delete-task/:taskid', deleteTask)


module.exports = router;