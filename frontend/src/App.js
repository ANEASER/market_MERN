import './App.css';
import {Route,Routes} from 'react-router-dom';
import React from 'react';

import Layout from './components/Layout';
import IndexPage from './Pages/Indexpage';
import Loginpage from './Pages/Loginpage';
import Registerpage from './Pages/Registerpage';


function App() {
  return (
    <React.Fragment>
        <main>
          <Layout/>
          <Routes>
              <Route index element={<IndexPage/>} />
              <Route path="/login" element={<Loginpage/>}/>
              <Route path="/register" element={<Registerpage/>}/>
          </Routes>
        </main>
      </React.Fragment>
  );
}

export default App;