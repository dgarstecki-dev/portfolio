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

const CACHE_KEY = "projects-cache";
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes — data is basically static, so this is generous

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 3000; // Azure cold starts commonly take 10-30s, so give each attempt room to land

function readCache(): Project[] | null {
    try {
        const raw = sessionStorage.getItem(CACHE_KEY);
        if (!raw) return null;

        const { data, cachedAt } = JSON.parse(raw) as { data: Project[]; cachedAt: number };
        if (Date.now() - cachedAt > CACHE_TTL_MS) return null;

        return data;
    } catch {
        // Corrupt or inaccessible cache — just treat it as a miss
        return null;
    }
}

function writeCache(data: Project[]) {
    try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, cachedAt: Date.now() }));
    } catch {
        // Storage full or unavailable (e.g. private browsing) — safe to ignore, caching is a nice-to-have
    }
}

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url: string, attempt = 1): Promise<Project[]> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
        }
        return (await response.json()) as Project[];
    } catch (err) {
        if (attempt >= MAX_RETRIES) throw err;

        // A failed/blocked-looking request on the first attempt is often just
        // the API waking up from a cold start, not a real error — so wait and retry.
        await sleep(RETRY_DELAY_MS * attempt);
        return fetchWithRetry(url, attempt + 1);
    }
}

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>(() => readCache() ?? []);
    const [state, setState] = useState<LoadState>(() => (readCache() ? "success" : "loading"));
    const [isRevalidating, setIsRevalidating] = useState(false);

    useEffect(() => {
        const cached = readCache();
        // If we have cached data, show it immediately and quietly refresh in the background.
        // Otherwise show the loading state while we fetch (with retries) from scratch.
        if (cached) {
            setIsRevalidating(true);
        }

        const url = `${import.meta.env.VITE_API_URL}/api/projects`;

        fetchWithRetry(url)
            .then((data) => {
                setProjects(data);
                setState("success");
                writeCache(data);
            })
            .catch((err) => {
                console.error("Failed to load projects:", err);
                // Only show the error state if we had nothing cached to fall back on
                if (!cached) setState("error");
            })
            .finally(() => setIsRevalidating(false));
    }, []);

    const workProjects = projects.filter(p => p.category === "Work");
    const personalProjects = projects.filter(p => p.category === "Personal");

    return (
        <Page>
            <h1>Projects</h1>

            {state === "loading" && <p className="page-status">Loading projects...</p>}
            {state === "error" && <p className="page-error">Couldn't load projects right now. Please try again later.</p>}

            {state === "success" && (
                <div className="projects-sections">
                    {isRevalidating && <p className="projects-refreshing">Refreshing...</p>}

                    <section>
                        <h2>Work</h2>
                        <div className="projects-grid">
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
                        <div className="projects-grid">
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