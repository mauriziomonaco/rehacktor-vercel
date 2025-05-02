import { Link } from "react-router";
export default function Header() {
    return (
        <nav>
            <ul>
                <li><strong>Rehacktor</strong></li>
            </ul>
            <ul>
                <li>
                <a href="#" className="secondary">Services</a>
                </li>
                <li>
                    <Link to="#" className="secondary">Login</Link>
                </li>
                <li>
                    <Link to="/register" className="secondary">Register</Link>
                </li>
                <li>
                    <details className="dropdown">
                        <summary>Account</summary>
                        <ul>
                            <li><a href="#">Profile</a></li>
                            <li><a href="#"></a>Settings</li>
                            <li><a href="#"></a>Logout</li>
                        </ul>
                    </details>
                </li>
            </ul>
        </nav>
    );
}