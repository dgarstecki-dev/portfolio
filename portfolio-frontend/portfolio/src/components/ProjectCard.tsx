interface ProjectCardProps {
    title: string;
    description: string;
    techStack: string[];
    gitHubUrl?: string | null;
    liveUrl?: string | null;
}

export default function ProjectCard({ title, description, techStack, gitHubUrl, liveUrl }: ProjectCardProps) {
    return (
        <div className="project-card">
            <h3>{title}</h3>
            <p>{description}</p>
            <div className="tech-tags">
                {techStack.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                ))}
            </div>
            {(gitHubUrl || liveUrl) && (
                <div className="project-links">
                    {gitHubUrl && (
                        <a href={gitHubUrl} target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                    )}
                    {liveUrl && (
                        <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                            Live site
                        </a>
                    )}
                </div>
            )}
        </div>
    );
}