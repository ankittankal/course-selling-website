import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from "./components/Landing";
import CreateCourse from './components/CreateCourse';
import Register from './components/Register';
import ShowCourses from './components/ShowCourses';
import ButtonAppBar from "./components/AppBar";
import Course  from "./components/Course";
import CourseEdit from "./components/CourseEdit";

// This file shows how we can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)

function App() {
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