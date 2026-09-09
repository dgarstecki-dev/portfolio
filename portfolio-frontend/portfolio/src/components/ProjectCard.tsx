interface ProjectCardProps {
    title: string;
    description: string;
    techStack: string[];
    gitHubUrl?: string | null;
    liveUrl?: string | null;
}

export default function ProjectCard({ title, description, techStack, gitHubUrl, liveUrl }: ProjectCardProps) {
    return (
        <div style={{
            border: "1px solid #ccc",
            borderRadius: "20px",
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            backgroundColor: "#fff",
        }}>
            <h3 style={{ margin: 0 }}>{title}</h3>
            <p style={{ margin: 0, color: "#444" }}>{description}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {techStack.map((tech) => (
                    <span key={tech} style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#4a90d9",
                        backgroundColor: "rgba(74, 144, 217, 0.1)",
                        borderRadius: 12,
                        padding: "4px 10px",
                    }}>
                        {tech}
                    </span>
                ))}
            </div>
            {(gitHubUrl || liveUrl) && (
                <div style={{ display: "flex", gap: 14, marginTop: 6 }}>
                    {gitHubUrl && (
                        <a href={gitHubUrl} target="_blank" rel="noopener noreferrer" className="nav-link">
                            GitHub
                        </a>
                    )}
                    {liveUrl && (
                        <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="nav-link">
                            Live Site
                        </a>
                    )}
                </div>
            )}
        </div>
    );
}