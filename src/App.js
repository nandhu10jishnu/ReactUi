
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar from "./components/navbar.component"
import  {Listing} from "./components/Listing.jsx";
import  {Sample} from "./components/Sample.jsx";
import  {CreateExcercise} from "./components/CreateExcercise.jsx";
import  {CreateUser} from "./components/CreateUser.jsx";

function App() {
  return (
    <BrowserRouter>
   
      <div className="container">
        <Navbar />
        <br />
        <Routes>

          <Route path="/" element={<Listing />} />
          <Route path="/sample/:id" element={<Sample />} />
          <Route path="/createexcercise" element={<CreateExcercise />} />
          <Route path="/user" element={<CreateUser />} />
        </Routes>
      </div>
      </BrowserRouter>
  );
}

export default App;
