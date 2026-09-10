interface Items {
    title: string,
    organization: string,
    dates: string,
};

export default function ExperienceHeader({ title, organization, dates }: Items) {
    return (
        <div className="experience-header">
            <div>
                <h3>{title}</h3>
                <h4>{organization}</h4>
            </div>
            <span className="experience-dates">{dates}</span>
        </div>
    );
}