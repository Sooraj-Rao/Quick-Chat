import Home, { Navbar } from "./Components/Home"
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom'
import Login from "./Components/Auth/Login"
import Signup from "./Components/Auth/Signup"
import { Toaster } from "react-hot-toast"
import Main from "./Components/Chat/Main"
import { useAuthContext } from "./Components/Context/Context"

export const useServer = () => {
  return import.meta.env.VITE_SERVER|| 'http://localhost:3000/api';
}

const App = () => {

  const { user } = useAuthContext();


  return (
    <div>
      <div>
        <Toaster
          reverseOrder={true}
          toastOptions={{
            duration: 4000,
            style: {
              background: 'black',
              color: 'white',
              fontWeight: '100'
            },
          }}
        />
      </div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={!user ? <Home /> : <Navigate to={'/c'} />} />
          <Route path="/auth/login" element={!user ? <Login /> : <Navigate to={'/c/'} />} />
          <Route path="/auth/signup" element={!user ? <Signup /> : <Navigate to={'/c/'} />} />
          <Route path="/c" element={user ? <Main /> : <Navigate to={'/auth/login'} />} />
          <Route path="/*" element={!user ? <Navigate to={'/'} /> : <Navigate to={'/c/'} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App 