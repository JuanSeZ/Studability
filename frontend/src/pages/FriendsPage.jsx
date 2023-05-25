import MyFriendsPage from "../components/MyFriendsPage";
import MyNavbar from "../components/MyNavbar";
import '../styles/FriendsPageStyle.css';

export default function FriendsPage() {


    return (
        <div>
            <row>
                <MyNavbar/>
            </row>
            <row>
                <MyFriendsPage/>
            </row>
        </div>
    )
}