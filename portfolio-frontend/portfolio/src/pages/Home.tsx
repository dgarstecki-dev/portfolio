import { Link } from "react-router-dom";
import Page from "../components/Page";
import meImage from "../assets/me.png";

export default function Home() {
    return (
        <Page>
            <div className="hero">
                <div className="hero-intro">
                    <h1>David Garstecki</h1>
                    <p className="hero-meta">Junior Software Developer — Des Moines, IA</p>
                    <p>
                        Hi, I'm David. My first job was working as the Software Engineer for Benedictine College,
                        where I built new applications, maintained student projects and legacy code, and built reports
                        using data engineering and analysis. I'm currently living in the Des Moines Metro area with my
                        wife after having moved 3 months ago, and I'm excited to start contributing my skills where I can.
                    </p>
                    <div className="hero-actions">
                        <Link className="btn btn-primary" to="/contact">Get in touch</Link>
                        <Link className="btn btn-secondary" to="/projects">View my work</Link>
                    </div>
                    <div className="hero-links">
                        {/* TODO: swap these hrefs for your real GitHub/LinkedIn URLs */}
                        <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
                        <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                </div>
                <img src={meImage} className="hero-photo" alt="David Garstecki" />
            </div>
        </Page>
    );
}