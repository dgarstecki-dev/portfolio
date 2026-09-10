import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import "../App.css";

export default function NavHeader() {
    return (
        <header className="site-header">
            <div className="site-header-inner">
                <Link to="/" className="brand">David Garstecki</Link>
                <nav className="nav-links">
                    <Navigation buttonTitle="Home" to="/" />
                    <Navigation buttonTitle="Experience" to="/experience" />
                    <Navigation buttonTitle="Projects" to="/projects" />
                    <Navigation buttonTitle="Contact" to="/contact" />
                </nav>
            </div>
        </header>
    );
}