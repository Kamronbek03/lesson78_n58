import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/UseAuth";
import Header from "./components/Header";
import Home from "./pages/Home";
import StudentsTable from "./pages/StudentsTable";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/StudentsTable"
            element={
              <PrivateRoute>
                <StudentsTable />
              </PrivateRoute>
            }
          />
          <Route
            path="/Profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
