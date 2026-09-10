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
        <Page>
            <div className="contact-page">
                <h1>Contact</h1>
                <p className="contact-intro">Have a project in mind, or just want to say hello? Send a message and I'll get back to you soon.</p>

                {status === "success" && (
                    <p className="form-status form-status-success">Thanks for reaching out! I'll get back to you soon.</p>
                )}
                {status === "error" && (
                    <p className="form-status form-status-error">Something went wrong sending your message. Please try again.</p>
                )}

                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-grid">
                        <div className="field">
                            <label className="field-label" htmlFor="firstName">First name</label>
                            <input type="text" className="contact-inputs" id="firstName" name="firstName" placeholder="John" value={form.firstName} onChange={handleChange} maxLength={20} />
                            {errors.firstName && <span className="field-error">{errors.firstName}</span>}
                        </div>
                        <div className="field">
                            <label className="field-label" htmlFor="lastName">Last name</label>
                            <input type="text" className="contact-inputs" id="lastName" name="lastName" placeholder="Doe" value={form.lastName} onChange={handleChange} maxLength={25} />
                            {errors.lastName && <span className="field-error">{errors.lastName}</span>}
                        </div>
                    </div>

                    <div className="form-grid">
                        <div className="field">
                            <label className="field-label" htmlFor="email">Email</label>
                            <input type="text" className="contact-inputs" id="email" name="email" placeholder="jdoe@gmail.com" value={form.email} onChange={handleChange} maxLength={50} />
                            {errors.email && <span className="field-error">{errors.email}</span>}
                        </div>
                        <div className="field">
                            <label className="field-label" htmlFor="phone">Phone number (optional)</label>
                            <input type="text" className="contact-inputs" id="phone" name="phone" placeholder="515-123-4567" value={form.phone} onChange={handleChange} maxLength={14} />
                            {errors.phone && <span className="field-error">{errors.phone}</span>}
                        </div>
                    </div>

                    <div className="field">
                        <label className="field-label" htmlFor="subject">Subject</label>
                        <input type="text" className="contact-inputs" id="subject" name="subject" placeholder="Reaching out..." value={form.subject} onChange={handleChange} maxLength={50} />
                        {errors.subject && <span className="field-error">{errors.subject}</span>}
                    </div>

                    <div className="honeypot-field" aria-hidden="true">
                        <label htmlFor="honey">Second email</label>
                        <input type="text" id="honey" name="honey" placeholder="janedeer@gmail.com" value={form.honey} onChange={handleChange} maxLength={50} tabIndex={-1} autoComplete="off" />
                    </div>

                    <div className="field">
                        <label className="field-label" htmlFor="message">Message</label>
                        <textarea placeholder="Hello..." id="message" className="contact-inputs" name="message" value={form.message} onChange={handleChange} rows={4} />
                        {errors.message && <span className="field-error">{errors.message}</span>}
                    </div>

                    <button type="submit" className="btn btn-primary submit-btn" disabled={status === "sending"}>
                        {status === "sending" ? "Sending…" : "Send message"}
                    </button>
                </form>
            </div>
        </Page>
    );
}