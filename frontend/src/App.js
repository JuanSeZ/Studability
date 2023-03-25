import './App.css';
import {
  Route
} from "react-router-dom";
// import {LoginPage} from "./pages/LoginPage";
import {Routes} from "react-router";
import {RegisterPage} from "./pages/RegisterPage";
import {MainPage} from "./pages/MainPage";
// import {HomePage} from "./pages/HomePage";
// import {RequireAuth} from "./components/RequireAuth";

function App() {
  return (
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        {/*<Route path="/login" element={<LoginPage/>}/>*/}
        <Route path="/register" element={<RegisterPage/>}/>
        {/*<Route*/}
        {/*    path="/home"*/}
        {/*    element={*/}
        {/*      <RequireAuth>*/}
        {/*        <HomePage/>*/}
        {/*      </RequireAuth>*/}
        {/*    }*/}
        {/*/>*/}
      </Routes>
  );
}

export default App;
