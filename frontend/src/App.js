import './App.css';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import {BrowserRouter, Route} from "react-router-dom";
import {Routes} from "react-router";
import HomePage from "./pages/HomePage";
import {RequireAuth} from "./components/RequireAuth";
import CalendarPage from "./pages/CalendarPage";

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

                <Route path = "/home/calendar"
                       element={
                           <RequireAuth>
                               <CalendarPage/>
                           </RequireAuth>
                       }
                />
            </Routes></div>
        </BrowserRouter>
    );
}
