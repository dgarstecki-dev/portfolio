import Page from "../components/Page";
import ExperienceHeader from "../components/ExperienceHeader";

export default function Experience() {
    return (
        <>
            <Page>
                <h1>Experience</h1>
                <ExperienceHeader title="Website and Mobile Application Developer" organization="Self-Employed" dates="August 2026 - Present" />
                <div style={{display: "flex", flexDirection: "column", margin: 0}}>
                    <ul>
                        <li>Building website for client</li>
                        <li>Developing mobile app for client</li>
                    </ul>
                </div>
                <hr />
                <ExperienceHeader title="Software Engineer & Data Engineer" organization="Benedictine College" dates="June 2024 - August 2026" />
                <div style={{display: "flex", flexDirection: "column", margin: 0}}>
                    <ul>
                        <li>MERN</li>
                        <li>Troubleshoot</li>
                        <li>HR Project</li>
                        <li>Employee Appraisal</li>
                        <li>WIFI</li>
                        <li>SFTP</li>
                    </ul>
                </div>
                <hr />
                <ExperienceHeader title="IT Intern & Student Worker" organization="Benedictine College" dates="June 2023 - May 2024" />
                <div style={{display: "flex", flexDirection: "column", margin: 0}}>
                   <ul>
                        <li>Chromedriver</li>
                        <li>Troubleshoot</li>
                    </ul>
                </div>
                <hr />
                <ExperienceHeader title="Audio/Visual Student Technician" organization="Benedictine College" dates="October 2021 - May 2024" />
                <div style={{display: "flex", flexDirection: "column", margin: 0}}>
                   <ul>
                        <li>Set up events</li>
                        <li>Ran events, troubleshot issues during events</li>
                    </ul>
                </div>
            </Page>
        </>
    );
}