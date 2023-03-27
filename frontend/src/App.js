import './App.css';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import {BrowserRouter, Route} from "react-router-dom";
import {Routes} from "react-router";
import HomePage from "./pages/HomePage";
import {RequireAuth} from "./components/RequireAuth";

export default function App() {
  return (
      <BrowserRouter>
          <div><Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginPage/>} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                  path="/home"
                  element={
                    <RequireAuth>
                      <HomePage/>
                    </RequireAuth>
                  }
              />
          </Routes></div>
      </BrowserRouter>
  );
}
