import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import api from "../../api.js";
import { useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import AddIcon from '@mui/icons-material/Add';

export default function FormDialog({ getTasks }) {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [formValues, setFormValues] = useState({
        title: '',
        content: ''
    });

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { title, content } = formValues;
        createTask({ title, content });
        handleCloseDialog();
    };

    const createTask = ({ title, content }) => {
        api
            .post("/api/tasks/", { content, title })
            .then((res) => {
                if (res.status === 201) {
                    setSnackbarMessage("Task created!");
                } else {
                    setSnackbarMessage("Failed to create task.");
                }
                setOpenSnackbar(true);
                getTasks();
            })
            .catch((err) => {
                setSnackbarMessage(err.message);
                setOpenSnackbar(true);
            });
    };

    return (
        <React.Fragment>
            <Button variant="contained" size="large" onClick={handleClickOpen} startIcon={<AddIcon />}>
                Create New Task
            </Button>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit,
                }}
            >
                <DialogTitle>Create Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create the task
                    </DialogContentText>
                    <TextField
                        fullWidth
                        margin="dense"
                        required
                        type="text"
                        id="title"
                        label="Title"
                        name="title"
                        value={formValues.title}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        fullWidth
                        margin="dense"
                        id="content"
                        label="Content"
                        multiline
                        rows={4}
                        name="content"
                        value={formValues.content}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </React.Fragment>
    );
}
