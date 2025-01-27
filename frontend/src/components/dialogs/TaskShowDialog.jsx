import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
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

    return (
        <React.Fragment>
            <Button size="small" onClick={handleClickOpen}>
                Show
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                }}
            >
                <DialogTitle>Task #{number +1}</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="dense"
                        required
                        type="text"
                        id="title"
                        label="Title"
                        name="title"
                        value={formValues.title}
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
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
