import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import Profile from "./components/Profile"
import DashBorad from "./components/DashBorad"
import Home from "./components/Home"
import VerifyEmail from "./components/verifyEmail"
import ProtectedComponent from "./components/ProtectedComponent"
const App = () => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProtectedComponent>
          <Profile />
        </ProtectedComponent>} />
        <Route path="/dashboard" element={<DashBorad />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App