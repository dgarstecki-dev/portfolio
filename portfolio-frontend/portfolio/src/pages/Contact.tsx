import { useState } from "react";
import Page from "../components/Page";
import "../App.css"

interface FormData {
    fName: string;
    lName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    honey: string; // honeypot field for spam prevention
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
    const [form, setForm] = useState<FormData>({
        fName: "", lName: "", email: "", phone: "", subject: "", message: "", honey: ""
    });
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const validate = (): boolean => {
        const newErrors: typeof errors = {};
        if (!form.fName.trim()) newErrors.fName = "First name is required";
        if (!form.lName.trim()) newErrors.lName = "Last name is required";
        if (!form.email.trim()) newErrors.email = "Email is required";
        else if (!emailPattern.test(form.email)) newErrors.email = "Enter a valid email";
        if (!form.message.trim()) newErrors.message = "Message can't be empty";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (form.honey.trim()) return; // honeypot check

        if (!validate()) return; // stop here if invalid — nothing sent
        console.log("Valid, ready to send:", form);
        // fetch(`${import.meta.env.VITE_API_URL}/api/contact`, { method: "POST", body: JSON.stringify(form), ... })
    };

    return (
        <>
            <Page>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: 25}}>
                    <h1>Contact Form</h1>

                    <form method="POST" onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: 20}}>
                        <div style={{display: "flex", flexDirection: "row", gap: 50}}>
                            <div>
                                <label className="info" htmlFor="fName">First Name: </label>
                                <input type="text" className="contact-inputs" id="fName" name="fName" placeholder="John" value={form.fName} onChange={handleChange} maxLength={20}/>
                                {errors.fName && <span style={{ color: "red" }}>{errors.fName}</span>}
                            </div>
                            <div>
                                <label className="info" htmlFor="lName">Last Name: </label>
                                <input type="text" className="contact-inputs" id="lName" name="lName" placeholder="Doe" value={form.lName} onChange={handleChange} maxLength={25}/>
                                {errors.lName && <span style={{ color: "red" }}>{errors.lName}</span>}
                            </div>
                        </div>
                        <div style={{display: "flex", flexDirection: "row", gap: 50}}>
                            <div>
                                <label className="info" htmlFor="email">Email: </label>
                                <input type="text" className="contact-inputs" id="email" name="email" placeholder="jdoe@gmail.com" value={form.email} onChange={handleChange} maxLength={50} />
                                {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
                            </div>
                            <div>
                                <label className="info" htmlFor="phone">Phone Number: </label>
                                <input type="text" className="contact-inputs" id="phone" name="phone" placeholder="515-123-4567" value={form.phone} onChange={handleChange} maxLength={14} />
                                {errors.phone && <span style={{ color: "red" }}>{errors.phone}</span>}
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            <div style={{ display: "flex", flexDirection: "column", maxWidth: 700 }}>
                                <label className="info" htmlFor="subject">Subject: </label>
                                <input type="text" className="contact-inputs" id="subject" name="subject" placeholder="Reaching out..." value={form.subject} onChange={handleChange} maxLength={50} />
                                {errors.subject && <span style={{ color: "red" }}>{errors.subject}</span>}
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", maxWidth: 700 }}>
                                <label className="contact-inputs-honey" htmlFor="honey">Second Email: </label>
                                <input type="text" className="contact-inputs-honey" id="honey" name="honey" placeholder="janedeer@gmail.com" value={form.honey} onChange={handleChange} maxLength={50} tabIndex={-1} autoComplete="off" />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <label className="info" htmlFor="message">Message: </label>
                                <textarea placeholder="Hello..." id="message" className="contact-inputs" name="message" value={form.message} onChange={handleChange} rows={4} />
                                {errors.message && <span style={{ color: "red" }}>{errors.message}</span>}
                            </div>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </Page>
        </>
    );
}