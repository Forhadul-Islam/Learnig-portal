import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import Assignment from "./pages/admin/Assignment";
import AssignmentMark from "./pages/admin/AssignmentMark";
import Videos from "./pages/admin/Videos";
import Quizzes from "./pages/admin/Quizzes";
import RequireAuth from "./components/require-auth/RequireAuth";
import Navbar from "./components/navbar/Navbar";
import CreateAndEditVideo from "./pages/admin/CreateAndEditVideo";
import CreateOrEditAssignment from "./pages/admin/CreateOrEditAssignment";

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
            <Route path="assignment" element={<Assignment />} />
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
          </Route>
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default AdminRoutes;
