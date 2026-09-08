import Navigation from "../components/Navigation";
import '../App.css'

export default function NavHeader() {
    return (
        <div className="nav-header">
            <Navigation buttonTitle="Home" to="/" />
            <Navigation buttonTitle="Experience" to="/experience" />
            <Navigation buttonTitle="Projects" to="/projects" />
            <Navigation buttonTitle="Contact" to="/contact" />
        </div>
    );
}