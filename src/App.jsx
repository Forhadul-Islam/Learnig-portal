import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Login from "./pages/Login";
import useAuthCheck from "./hooks/useAuthCheck";
import Register from "./pages/Register";
import Loader from "./components/ui/Loader";
import NotFound from "./pages/NotFound";
import CreateAndEditVideo from "./pages/admin/CreateAndEditVideo";
import CreateOrEditAssignment from "./pages/admin/CreateOrEditAssignment";
import CreateOrEditQuizzes from "./pages/admin/CreateOrEditQuizzes";
import BG from "../src/assets/image/bgg.png";

function App() {
  const authChecked = useAuthCheck();

  if (!authChecked)
    return (
      <div className="h-[100vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  return (
    <div className="bg-form-gradient">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          //student's route
          <Route
            path="/*"
            element={
              <>
                <Navbar student />
                <RequireAuth allowedRole="student" />
              </>
            }
          >
            <Route path="leader-board" element={<LeaderBoard />} />
            <Route path="course-player" element={<CoursePlayer />} />
            <Route path="course-player/:videoId" element={<CoursePlayer />} />
            <Route path="quizzes/:videoId" element={<Quiz />} />
          </Route>
          // admin can also access the course content
          <Route
            path="/"
            element={
              <>
                <Navbar admin />
                <RequireAuth allowedRole="admin" />
              </>
            }
          >
            <Route path="leader-board" element={<LeaderBoard />} />
            <Route path="course-player" element={<CoursePlayer />} />
            <Route path="course-player/:videoId" element={<CoursePlayer />} />
            <Route path="quizzes/:videoId" element={<Quiz />} />
          </Route>
          //Admin's route
          <Route
            path="/admin/*"
            element={
              <>
                <Navbar admin />
                <RequireAuth allowedRole="admin" />
              </>
            }
          >
            <Route path="" element={<Dashboard />} />
            <Route path="assignment-mark" element={<AssignmentMark />} />
            <Route path="assignment/" element={<Assignment />} />
            <Route
              path="assignment/create"
              element={<CreateOrEditAssignment mode="create" />}
            />
            <Route
              path="assignment/edit/:assignmentId"
              element={<CreateOrEditAssignment mode="edit" />}
            />
            <Route path="videos/" element={<Videos />} />
            <Route
              path="videos/create"
              element={<CreateAndEditVideo mode="create" />}
            />
            <Route
              path="videos/edit/:videoId"
              element={<CreateAndEditVideo mode="edit" />}
            />
            <Route path="quizzes" element={<Quizzes />} />
            <Route
              path="quizzes/create"
              element={<CreateOrEditQuizzes mode="create" />}
            />
            <Route
              path="quizzes/edit/:quizId"
              element={<CreateOrEditQuizzes mode="edit" />}
            />
          </Route>
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
