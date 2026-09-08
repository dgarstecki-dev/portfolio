interface Items {
    title: string,
    organization: string,
    dates: string,
};

export default function ExperienceHeader({title, organization, dates}: Items) {
    return (
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <div>
                <h3>{title}</h3>
                <h4>{organization}</h4>
            </div>
            <h3>{dates}</h3>
        </div>
    );
}