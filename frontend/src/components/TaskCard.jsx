import * as React from 'react';
import { Card, CardActions, CardContent, Button, Typography, Snackbar } from '@mui/material';
import { useState } from 'react';
import api from "../api.js";
import TaskEditDialog from './dialogs/TaskEditDialog.jsx';
import TaskShowDialog from './dialogs/TaskShowDialog.jsx';
import TaskDeleteDialog from './dialogs/TaskDeleteDialog.jsx';

export default function BasicCard({ task, onDelete, number, setTasks }) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const formattedDate = new Date(task.published_date).toLocaleDateString("en-US");

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = (msg) => {
        setMessage(msg);
        setOpen(true);
    };

    const deleteTask = (id) => {
        api
            .delete(`/api/tasks/${id}/`)
            .then((res) => {
                if (res.status === 204) {
                    handleClick("Task deleted!");  // Show success message
                } else {
                    handleClick("Failed to delete task.");  // Show error message
                }
                getTasks();
            })
            .catch((error) => handleClick(error.message));  // Handle error
    };

    const getTasks = () => {
        api
            .get("/api/tasks/")
            .then((res) => res.data)
            .then((data) => {
                setTasks(data);
            })
            .catch((err) => handleClick(err.message));  // Handle error
    };

    const editTask = (id, updatedTask) => {
        api.put(`/api/tasks/${id}/`, updatedTask)
            .then((res) => {
                if (res.status === 200) {
                    handleClick("Task updated!");  // Show success message
                    getTasks();  // Refresh task list after update
                } else {
                    handleClick("Failed to update task.");  // Show error message
                }
            })
            .catch((error) => handleClick(error.message));  // Handle error
    };

    return (
        <div>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        Task {number + 1}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {task.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                        {formattedDate}
                    </Typography>
                    <Typography variant="body2">
                        {task.content}
                    </Typography>
                </CardContent>
                <CardActions>
                    <TaskShowDialog task={task} number={number} />
                    <TaskEditDialog task={task} onEdit={editTask} number={number} />
                    <TaskDeleteDialog task={task} onDelete={deleteTask} number={number} />
                </CardActions>
            </Card>

            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message}
            />
        </div>
    );
}
