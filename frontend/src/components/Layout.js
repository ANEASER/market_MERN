import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Layout() {

    const {setUserInfo,userInfo} = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:4000/market/user/profile',{
            credentials : 'include',
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
    }

    const username = userInfo?.username;

    return(
    <header>
        <Link to='/' className="logo">Market</Link>
        <nav>
            { username && (
                <>
                    <p>OK</p>
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