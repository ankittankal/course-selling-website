import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from "./components/Landing";
import SignUp from './components/SignUp';
import ShowCourses from './components/ShowCourses';
import ButtonAppBar from "./components/AppBar";
import PurchasedCourses from "./components/PurchesedCourses";
import BuyCourse from "./components/BuyCourse";
import axios from "axios";
import {useEffect} from "react";
import {useSetRecoilState} from 'recoil';
import { userState } from "./store/atoms/user.js";

function App() {
    const setUser = useSetRecoilState(userState);
    const init = async() => {
        try {
            const response = await axios.get("http://localhost:3000/user/me", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })

            if (response.data.username) {
                setUser({
                    isLoading: false,
                    userEmail: response.data.username,
                })
            } else {
                console.log("no username" );
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
        <div style={{width: '100vw' , height: "100%" , background : "#eeeeee"}}>
            <Router>
            <ButtonAppBar position="static" style={{ backgroundColor: '#071e26' }}></ButtonAppBar>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/SignUp" element={<SignUp/>} />
                        <Route path="/courses" element={<ShowCourses />} />
                        <Route path="/courses/:courseId" element={<BuyCourse />} />
                        <Route path="/purchasedCourses" element={<PurchasedCourses/>} />
                    </Routes>
            </Router>
        </div>
    );
}

export default App;