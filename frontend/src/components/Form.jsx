import {useState, useEffect} from 'react'
import api from "../api.js";
import {Navigate, useNavigate} from 'react-router-dom';
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../constants.js";
import {Button} from "@mui/material";
import "../styles/Form.css"

function Form({route, method}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register"

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, {username, password});
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch (e) {
            alert(e)
        } finally {
            setLoading(false);
        }
    }

    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
        />
        <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
        />
        <Button variant="contained" className="form-button" type="submit">{name}</Button>
    </form>
}

export default Form;