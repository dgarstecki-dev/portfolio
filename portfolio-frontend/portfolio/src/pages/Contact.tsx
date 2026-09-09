import { useState } from "react";
import Page from "../components/Page";
import "../App.css"

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    honey: string; // honeypot field for spam prevention
}

type SubmitStatus = "idle" | "sending" | "success" | "error";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
    const [form, setForm] = useState<FormData>({
        firstName: "", lastName: "", email: "", phone: "", subject: "", message: "", honey: ""
    });
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
    const [status, setStatus] = useState<SubmitStatus>("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const validate = (): boolean => {
        const newErrors: typeof errors = {};
        if (!form.firstName.trim()) newErrors.firstName = "First name is required";
        if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
        if (!form.email.trim()) newErrors.email = "Email is required";
        else if (!emailPattern.test(form.email)) newErrors.email = "Enter a valid email";
        if (!form.subject.trim()) newErrors.subject = "Subject is required";
        if (!form.message.trim()) newErrors.message = "Message can't be empty";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (form.honey.trim()) return; // honeypot check — silently drop

        if (!validate()) return; // stop here if invalid — nothing sent

        setStatus("sending");

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }

            setStatus("success");
            setForm({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "", honey: "" });
        } catch (err) {
            console.error("Contact form submission failed:", err);
            setStatus("error");
        }
    };

    return (
        <>
            <Page>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: 25}}>
                    <h1>Contact Form</h1>

                    {status === "success" && (
                        <p style={{ color: "green" }}>Thanks for reaching out! I'll get back to you soon.</p>
                    )}
                    {status === "error" && (
                        <p style={{ color: "red" }}>Something went wrong sending your message. Please try again.</p>
                    )}

                    <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: 20}}>
                        <div style={{display: "flex", flexDirection: "row", gap: 50}}>
                            <div>
                                <label className="info" htmlFor="firstName">First Name: </label>
                                <input type="text" className="contact-inputs" id="firstName" name="firstName" placeholder="John" value={form.firstName} onChange={handleChange} maxLength={20}/>
                                {errors.firstName && <span style={{ color: "red" }}>{errors.firstName}</span>}
                            </div>
                            <div>
                                <label className="info" htmlFor="lastName">Last Name: </label>
                                <input type="text" className="contact-inputs" id="lastName" name="lastName" placeholder="Doe" value={form.lastName} onChange={handleChange} maxLength={25}/>
                                {errors.lastName && <span style={{ color: "red" }}>{errors.lastName}</span>}
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
                        <button type="submit" id="submit" disabled={status === "sending"}>
                            {status === "sending" ? "Sending..." : "Submit"}
                        </button>
                    </form>
                </div>
            </Page>
        </>
    );
}