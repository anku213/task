import { Route, Routes } from "react-router-dom";
import SignIn from "./components/authentication/Signin";
import SignUp from "./components/authentication/Signup";
import Home from "./components/Home";
import Navbar from "./components/Navbar";


function App() {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
