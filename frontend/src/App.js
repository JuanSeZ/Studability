import './App.css';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import {BrowserRouter, Route} from "react-router-dom";
import {Routes} from "react-router";
import HomePage from "./pages/HomePage";
import {RequireAuth} from "./components/RequireAuth";
import CalendarPage from "./pages/CalendarPage";
import PomodoroTimerPage from "./pages/PomodoroTimerPage";
import FriendsPage from "./pages/FriendsPage";
import FilesPage from "./pages/FilesPage";
import EditProfilePage from "./pages/EditProfilePage";
import ChatPage from "./chat/components/ChatPage";


export default function App() {

    return (
        <BrowserRouter>
            <div><Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route
                    path="/home"
                    element={
                        <RequireAuth>
                            <HomePage/>
                        </RequireAuth>
                    }
                />

                <Route path="/home/calendar"
                       element={
                           <RequireAuth>
                               <CalendarPage/>
                           </RequireAuth>
                       }
                />

                <Route path="/home/study-time"
                       element={
                           <RequireAuth>
                               <PomodoroTimerPage/>
                           </RequireAuth>
                       }
                />

                <Route path="/home/friends"
                       element={
                           <RequireAuth>
                               <FriendsPage/>
                           </RequireAuth>
                       }
                />

                <Route path="/home/files"
                       element={
                           <RequireAuth>
                               <FilesPage/>
                           </RequireAuth>
                       }
                />

                <Route path="/home/editProfile"
                       element={
                           <RequireAuth>
                               <EditProfilePage/>
                           </RequireAuth>
                       }/>

                <Route path="/home/chat"
                       element={
                           <RequireAuth>
                               <ChatPage/>
                           </RequireAuth>
                       }/>

            </Routes></div>
        </BrowserRouter>
    );
}
