import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// components
import { Header } from '../components/Header';

// screens
import { Login } from '../screens/Login';
import { Register } from '../screens/Register';
import { Dashboard } from '../screens/Dashboard';

const App: React.FC = () => {
  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export { App };
