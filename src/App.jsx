import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentLogin from "./pages/student/StudentLogin";
import StudentRegistration from "./pages/student/StudentRegistration";
import LeaderBoard from "./pages/student/LeaderBoard";
import CoursePlayer from "./pages/student/CoursePlayer";
import Quiz from "./pages/student/Quiz";
import Home from "./pages/Home";
import Dashboard from "./pages/admin/Dashboard";
import Assignment from "./pages/admin/Assignment";
import AssignmentMark from "./pages/admin/AssignmentMark";
import Videos from "./pages/admin/Videos";
import Quizzes from "./pages/admin/Quizzes";
import RequireAuth from "./components/require-auth/RequireAuth";
import PublicRoute from "./components/public-route/publicRoute";
import Navbar from "./components/navbar/Navbar";

function App() {
  const auth = undefined;
  // const auth = { name: "foo", role: "student" };
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PublicRoute auth={auth} />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<StudentLogin />} />
            <Route path="/register" element={<StudentRegistration />} />
          </Route>
          //student's route
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <RequireAuth allowedRole="student" auth={auth} />
              </>
            }
          >
            <Route path="leader-board" element={<LeaderBoard />} />
            <Route path="course-player" element={<CoursePlayer />} />
            <Route path="quiz" element={<Quiz />} />
          </Route>
          //Admin's route
          <Route
            path="/admin/*"
            element={<RequireAuth allowedRole="admin" auth={auth} />}
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="assignment" element={<Assignment />} />
            <Route path="assignment-mark" element={<AssignmentMark />} />
            <Route path="videos" element={<Videos />} />
            <Route path="quizzes" element={<Quizzes />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
