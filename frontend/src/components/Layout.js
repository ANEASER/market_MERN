import { Link } from "react-router-dom";

export default function Layout() {
    return(
    <header>
        <Link to='/' className="logo">Market</Link>
        <nav>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </nav>
    </header>);
}