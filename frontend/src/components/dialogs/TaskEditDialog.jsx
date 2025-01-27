import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({ task, onEdit, number }) {
    const [open, setOpen] = React.useState(false);
    const [formValues, setFormValues] = React.useState({
        title: task?.title || '',
        content: task?.content || ''
    });


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
        onEdit(task.id, { title, content });  // Send the updated task to the backend
        handleClose();
    };

    return (
        <React.Fragment>
            <Button size="small" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit,
                }}
            >
                <DialogTitle>Edit Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit the task details
                    </DialogContentText>
                    <TextField
                        fullWidth
                        margin="dense"
                        required
                        type="text"
                        id="title"
                        label="Title"
                        name="title"
                        value={formValues.title}  // Controlled value
                        onChange={handleChange}    // Update value on change
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
                        value={formValues.content} // Controlled value
                        onChange={handleChange}     // Update value on change
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" >Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
