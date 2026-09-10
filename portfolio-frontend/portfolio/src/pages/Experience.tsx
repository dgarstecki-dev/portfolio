import Page from "../components/Page";
import ExperienceHeader from "../components/ExperienceHeader";

export default function Experience() {
    return (
        <Page>
            <h1>Experience</h1>

            <div className="timeline-entry">
                <ExperienceHeader title="Website and Mobile Application Developer" organization="Self-Employed" dates="August 2026 - Present" />
                <ul>
                    <li>Building websites and mobile applications for clients to meet their needs as they start their business.</li>
                </ul>
            </div>

            <div className="timeline-entry">
                <ExperienceHeader title="Software Engineer & Data Engineer" organization="Benedictine College" dates="June 2024 - August 2026" />
                <ul>
                    <li>Built a MERN app managing 15+ capstone projects with metadata display and secure file upload/download.</li>
                    <li>Engineered a ReactJS/Django/SQL asset inventory app tracking 500+ campus devices for compliance reporting.</li>
                    <li>Maintained and redesigned an employee performance appraisal system used by hundreds of employees.</li>
                    <li>Built a PHP/JavaScript compliance training system with video delivery and automated notifications.</li>
                    <li>Automated SQL Server and SAP BusinessObjects reports across 6+ departments, saving thousands annually.</li>
                    <li>Wrote SFTP automation scripts, saving 12+ hours monthly, integrating with three third-party systems.</li>
                    <li>Provided Tier-2 support to hundreds of users and mentored two interns plus two student dev teams.</li>
                </ul>
            </div>

            <div className="timeline-entry">
                <ExperienceHeader title="IT Intern & Student Worker" organization="Benedictine College" dates="June 2023 - May 2024" />
                <ul>
                    <li>Built a Java/Selenium automation tool pulling printer counters from 33 campus printers for billing accuracy.</li>
                    <li>Delivered day-to-day helpdesk, networking, and classroom technology support.</li>
                </ul>
            </div>

            <div className="timeline-entry">
                <ExperienceHeader title="Audio/Visual Student Technician" organization="Benedictine College" dates="October 2021 - May 2024" />
                <ul>
                    <li>Set up Audio-Visual equipment for campus events.</li>
                    <li>Ran and troubleshot AV issues live during events.</li>
                </ul>
            </div>
        </Page>
    );
}