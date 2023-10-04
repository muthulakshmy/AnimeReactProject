import logo from './logo.svg';
import './App.css';
import Login from './Pages/Login'
import Register from './Pages/Register';
import Error from './Pages/Error';
import Home from './Pages/Home';
import { BrowserRouter as Router,Routes,Route ,Link} from 'react-router-dom';
import { useAuth } from './auth';
import { AuthProvider } from './auth';
import RequireAuth from './RequireAuth';
function App() {
  // const auth=useAuth()
  return (
    <div className="App">
     <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<Error />} />
          <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
          
        </Routes>
      </Router>
      </AuthProvider>
     
    </div>
  );
}

export default App;
