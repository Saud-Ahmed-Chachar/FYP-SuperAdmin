import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import LoginPage from './components/Login';
import UniversitiesList from './components/UniversitiesList';
import StudentsList from './components/StudentsList';
import Dashboard from './components/Dashboard';
import ScholarshipList from './components/ScholarshipList';

// Sidebar component
const Sidebar = () => {
  return (
    <aside className="w-64 bg-blue-800 text-white p-6 fixed h-full"
      style={{
        background: 'linear-gradient(to right, rgb(36, 18, 101) 0%, rgb(0, 130, 203) 100%)',
        boxSizing: 'border-box'
      }}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-center my-4"> {/* Adjusted margin here */}
            <div className="w-16 h-16 bg-gray-900 flex items-center justify-center rounded-full overflow-hidden">
              <img 
                src="https://th.bing.com/th/id/OIG3.N5G3Vo7taEPbYjB5I50s?pid=ImgGn" 
                alt="Logo" 
                className="h-full w-full object-cover" 
                style={{ backgroundColor: 'transparent' }}
              />
  
            </div>
           
          </div>

          <div className="text-center mb-4">
              <h1 className="text-lg font-semibold">Super Admin Portal</h1>
            </div>
            <hr className="border border-gray-100" />
          
          <nav className="mt-2"> {/* Reduced margin-top here */}
         
            <Link to="/dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-500 hover:text-white">Dashboard</Link>
            <Link to="/universities" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-500 hover:text-white">University List</Link>
            <Link to="/students" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-500 hover:text-white">User List</Link>
            <Link to="/scholarships" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-500 hover:text-white">Scholarship List</Link>
            <Link to="/logout" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-500 hover:text-white">Logout</Link>
          </nav>
        </div>
    
      </div>
    </aside>
  );
};

// Layout component that includes the Sidebar and an Outlet for nested routes
const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-10 ml-64"> {/* Add ml-64 to shift content right */}
        {children}
      </div>
    </div>
  );
};

// Main application component with routing setup
const App = () => {
  // State to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout logic here
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}>
          {/* Redirect to login or dashboard based on login status */}
        </Route>
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/universities" element={<Layout><UniversitiesList /></Layout>} />
        <Route path="/students" element={<Layout><StudentsList /></Layout>} />
        <Route path="/scholarships" element={<Layout><ScholarshipList /></Layout>} />
        <Route path="/logout" element={<Navigate to="/login" replace />} />
        {/* Add more main routes if needed */}
      </Routes>
    </Router>
  );
};

export default App;
