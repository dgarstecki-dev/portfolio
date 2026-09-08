import Page from "../components/Page";

export default function Home() {
    return (
        <>
            <Page>
                <h1>David Garstecki</h1>
                <div style={{display: "flex", flexDirection: "row", gap: 100, alignContent: "center", alignItems: "center"}}>
                    <p style={{flex: 1, minWidth: 0, borderWidth: "2px", borderColor: "black", borderStyle: "solid", padding: "25px", borderRadius: "50px"}}>
                        Hi, I'm David Garstecki. I am a Junior Software Developer. My first job was working as the Software Engineer for Benedictine College,
                        where I made new applications, maintained student projects and legacy code, and built reports using data engineering and analysis.
                        I am currently living in the Des Moines Metro area with my wife after having moved 3 months ago, and I am excited to start contributing
                        my skills where I can.
                    </p>
                    <img src="src/assets/me.png" style={{flex: 1, minWidth: 0, width: "100%", height: "auto", objectFit: "cover", borderRadius: "80px"}} />
                </div>
            </Page>
        </>
    );
}