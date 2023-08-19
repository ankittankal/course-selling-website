import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from "./components/Landing";
import CreateCourse from './components/CreateCourse';
import Register from './components/Register';
import ShowCourses from './components/ShowCourses';
import ButtonAppBar from "./components/AppBar";
import CourseEdit from "./components/CourseEdit";
import axios from "axios";
import {useEffect} from "react";
import {useSetRecoilState} from 'recoil';
import { userState } from "./store/atoms/user.js";

// This file shows how we can do routing in React and state management.
// Try going to /login, /register, /about, /courses on the website and see how the html changes based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)

function App() {
    console.log("App.jsx is rerendered");
    const setUser = useSetRecoilState(userState);
    const init = async() => {
        try {
            const response = await axios.get("http://localhost:3000/admin/me", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })

            if (response.data.username) {
                console.log("------->" );
                setUser({
                    isLoading: false,
                    userEmail: response.data.username
                })
            } else {
                setUser({
                    isLoading: false,
                    userEmail: null
                })
            }
        } 
        catch(e){

            setUser({
                isLoading: false,
                userEmail: null
            })
        }
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <div style={{width: '100vw' , height:'100vh' , background : "#eeeeee"}}>
            <Router>
                    <ButtonAppBar></ButtonAppBar>

                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/createCourse" element={<CreateCourse />} />
                        <Route path="/courses" element={<ShowCourses />} />
                        <Route path="/courses/:courseId" element={<CourseEdit />} />
                    </Routes>
            </Router>
        </div>
    );
}

export default App;