import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AuthGuard from "./components/AuthGuard";
import PublicRoute from "./components/PublicRoute";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
        <Route path="*" element={<PublicRoute><Login /></PublicRoute>} />
      </Routes>
    </Router>

  )
}

export default App
