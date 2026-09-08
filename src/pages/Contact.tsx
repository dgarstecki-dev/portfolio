import Page from "../components/Page";
import "../App.css"

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle form data here
};

export default function Contact() {
    return (
        <>
            <Page>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: 25}}>
                    <h1>Contact Form</h1>
                    <form method="POST" onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: 20}}>
                        <div style={{display: "flex", flexDirection: "row", gap: 50}}>
                            <div>
                                <label className="info" htmlFor="fName">First Name: </label>
                                <input type="text" className="contact-inputs" id="fName" name="fName" placeholder="John" maxLength={20}/>
                            </div>
                            <div>
                                <label className="info" htmlFor="lName">Last Name: </label>
                                <input type="text" className="contact-inputs" id="lName" name="lName" placeholder="Doe"  maxLength={25}/>
                            </div>
                        </div>
                        <div style={{display: "flex", flexDirection: "row", gap: 50}}>
                            <div>
                                <label className="info" htmlFor="email">Email: </label>
                                <input type="text" className="contact-inputs" id="email" name="email" placeholder="jdoe@gmail.com" maxLength={50} />
                            </div>
                            <div>
                                <label className="info" htmlFor="phone">Phone Number: </label>
                                <input type="text" className="contact-inputs" id="phone" name="phone" placeholder="515-123-4567" maxLength={14} />
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            <div style={{ display: "flex", flexDirection: "column", maxWidth: 700 }}>
                                <label className="info" htmlFor="subject">Subject: </label>
                                <input type="text" className="contact-inputs" id="subject" name="subject" placeholder="Reaching out..." maxLength={50} />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <label className="info" htmlFor="message">Message: </label>
                                <textarea placeholder="Hello..." id="message" className="contact-inputs" name="message" rows={4} />
                            </div>
                        </div>
                        <button type="submit" onClick={() => {alert("Form submitted!")}} id="submit">Submit</button>
                    </form>
                </div>
            </Page>
        </>
    );
}