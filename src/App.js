import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Editor from './Editor';

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <>
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route
          path="/editor"
          element={token ? <Editor token={token} /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
    </>
  );
};

export default App;
