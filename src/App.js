import logo from './logo.svg';
import './App.css';
import Login from './Pages/Login'
import Register from './Pages/Register';
import Error from './Pages/Error';
import Home from './Pages/Home';
import { BrowserRouter as Router,Routes,Route ,Link} from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import { useAuth } from './auth';
import { AuthProvider } from './auth';
import RequireAuth from './RequireAuth';
import AnimeItem from './Pages/AnimeItem';
import Content from './Content';
function App() {
  // const auth=useAuth()
  return (
    <div className="App">
     <AuthProvider>
     {/* <MemoryRouter > */}
      <Router initialEntries={['/inbox']} initialIndex={0}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<Error />} />
          
          <Route path="home/anime/:id" element={<AnimeItem />} />
          <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
  {/* <Route path="/home" element={<Content />} /> */}
            
        </Routes>


      </Router>
      {/* </MemoryRouter> */}
      </AuthProvider>
     
    </div>
  );
}

export default App;
