import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import RequireAuth from "../components/require-auth/RequireAuth";
import Dashboard from "../pages/admin/Dashboard";
import AssignmentMark from "../components/course-player/AssignmentMark";
import Assignment from "../pages/admin/Assignment";
import CreateOrEditAssignment from "../pages/admin/CreateOrEditAssignment";
import Videos from "../pages/admin/Videos";
import CreateAndEditVideo from "../pages/admin/CreateAndEditVideo";
import Quizzes from "../pages/admin/Quizzes";
import CreateOrEditQuizzes from "../pages/admin/CreateOrEditQuizzes";

function AdminRoutes() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/admin/*"
            element={
              <>
                <Navbar />
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
    </>
  );
}

export default AdminRoutes;
