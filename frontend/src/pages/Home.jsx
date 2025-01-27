import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Home.css";
import TaskCard from "../components/TaskCard.jsx";
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Header from "../components/Header";
import { ThemeProvider, createTheme } from "@mui/material";
import TaskCreateDialog from "../components/dialogs/TaskCreateDialog.jsx";

function Home() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTasks();
    }, []);

    const theme = createTheme({
        palette: {
            primary: {
                main: '#1976d2',
            },
            secondary: {
                main: '#dc004e',
            },
        },
    });

    const getTasks = () => {
        setTasks([]);
        api
            .get("/api/tasks/")
            .then((res) => res.data)
            .then((data) => {
                setTasks(data);
            })
            .catch((err) => alert(err));
    };

    const deleteTask = (id) => {
        api
            .delete(`/api/tasks/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Task deleted!");
                else alert("Failed to delete task.");
                getTasks();
            })
            .catch((error) => alert(error));
    };

    return (
        <ThemeProvider theme={theme}>
            <Header />
            <div>
                <Box sx={{ my: 2 }}>
                    <TaskCreateDialog getTasks={getTasks} />
                </Box>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {tasks.map((task, index) => (
                        <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                            <TaskCard task={task} onDelete={deleteTask} number={index} setTasks={setTasks} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </ThemeProvider>
    );
}

export default Home;
