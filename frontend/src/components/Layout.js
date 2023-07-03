import { useContext, useEffect,setUserInfo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Layout() {

    const {setUserInfo,userInfo} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:4000/market/user/profile',{
            credentials : 'include', // JWT include
        }).then (response => {
                response.json().then(userInfo=> {
                setUserInfo(userInfo);
            });
        })
    },[]);

    function logout() {
        fetch('http://localhost:4000/market/user/logout',{
            credentials:'include',
            method:'GET'
        });
        setUserInfo(null);
        navigate('/'); // Redirect to the homepage after logout without this renderd components stay as same
    }

    const username = userInfo?.username;

    return(
    <header>
        <Link to='/' className="logo">Market</Link>
        <nav>
            { username && (
                <>
                    <p>{username}</p>
                    <Link to='/creategig'>create Gig</Link>
                    <a onClick={logout}>Logout</a>
                </>
            )}
            { !username && (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link> 
                </>
            )}
        </nav>
    </header>);
}