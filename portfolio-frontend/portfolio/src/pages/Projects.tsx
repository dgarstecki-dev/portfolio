import { useEffect, useState } from "react";
import Page from "../components/Page";
import ProjectCard from "../components/ProjectCard";

interface Project {
    id: number;
    title: string;
    description: string;
    techStack: string[];
    gitHubUrl?: string | null;
    liveUrl?: string | null;
    category: string;
}

type LoadState = "loading" | "success" | "error";

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [state, setState] = useState<LoadState>("loading");

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`);
                if (!response.ok) {
                    throw new Error(`Server responded with ${response.status}`);
                }
                const data: Project[] = await response.json();
                setProjects(data);
                setState("success");
            } catch (err) {
                console.error("Failed to load projects:", err);
                setState("error");
            }
        };

        fetchProjects();
    }, []);

    const workProjects = projects.filter(p => p.category === "Work");
    const personalProjects = projects.filter(p => p.category === "Personal");

    const gridStyle: React.CSSProperties = {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 24,
    };

    return (
        <Page>
            <h1>Projects</h1>

            {state === "loading" && <p>Loading projects...</p>}
            {state === "error" && <p style={{ color: "red" }}>Couldn't load projects right now. Please try again later.</p>}

            {state === "success" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
                    <section>
                        <h2>Work</h2>
                        <div style={gridStyle}>
                            {workProjects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    title={project.title}
                                    description={project.description}
                                    techStack={project.techStack}
                                    gitHubUrl={project.gitHubUrl}
                                    liveUrl={project.liveUrl}
                                />
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2>Personal</h2>
                        <div style={gridStyle}>
                            {personalProjects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    title={project.title}
                                    description={project.description}
                                    techStack={project.techStack}
                                    gitHubUrl={project.gitHubUrl}
                                    liveUrl={project.liveUrl}
                                />
                            ))}
                        </div>
                    </section>
                </div>
            )}
        </Page>
    );
}