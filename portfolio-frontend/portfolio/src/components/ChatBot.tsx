import { useEffect, useState } from "react";

interface Message {
    role: "user" | "assistant";
    content: string;
}

type SendStatus = "idle" | "sending" | "error";

const NUDGE_DELAY_MS = 12_000; // how long to wait before the first nudge
const NUDGE_INTERVAL_MS = 45_000; // how often to re-show it if still ignored
const NUDGE_TEXT = "Got questions about David? Ask me anything!";

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [showNudge, setShowNudge] = useState(false);
    const [question, setQuestion] = useState("");
    const [honey, setHoney] = useState(""); // honeypot field — same pattern as Contact
    const [messages, setMessages] = useState<Message[]>([]);
    const [status, setStatus] = useState<SendStatus>("idle");

    // Periodic nudge bubble — only while closed and the visitor hasn't engaged yet.
    useEffect(() => {
        if (isOpen || messages.length > 0) {
            setShowNudge(false);
            return;
        }

        const showTimer = setTimeout(() => setShowNudge(true), NUDGE_DELAY_MS);
        return () => clearTimeout(showTimer);
    }, [isOpen, messages.length]);

    useEffect(() => {
        if (!showNudge) return;

        // Auto-hide after a few seconds, then re-show later if still untouched.
        const hideTimer = setTimeout(() => setShowNudge(false), 6_000);
        const nextTimer = setTimeout(() => setShowNudge(true), NUDGE_INTERVAL_MS);
        return () => {
            clearTimeout(hideTimer);
            clearTimeout(nextTimer);
        };
    }, [showNudge]);

    const openChat = () => {
        setIsOpen(true);
        setShowNudge(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (honey.trim()) return; // honeypot check — silently drop

        const trimmed = question.trim();
        if (!trimmed || status === "sending") return;

        setMessages(prev => [...prev, { role: "user", content: trimmed }]);
        setQuestion("");
        setStatus("sending");

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: trimmed, honey }),
            });

            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }

            const data = await response.json();
            setMessages(prev => [...prev, { role: "assistant", content: data.answer }]);
            setStatus("idle");
        } catch (err) {
            console.error("Chat request failed:", err);
            setMessages(prev => [
                ...prev,
                { role: "assistant", content: "Something went wrong. Please try again." },
            ]);
            setStatus("error");
        }
    };

    if (!isOpen) {
        return (
            <div className="chatbot-launcher">
                {showNudge && (
                    <button type="button" className="chatbot-nudge" onClick={openChat}>
                        {NUDGE_TEXT}
                    </button>
                )}
                <button
                    type="button"
                    className="chatbot-fab"
                    onClick={openChat}
                    aria-label="Open chat assistant"
                >
                    💬
                </button>
            </div>
        );
    }

    return (
        <div className="chatbot-overlay">
            <div className="chatbot">
                <div className="chatbot-header">
                    <span>Ask about David</span>
                    <button
                        type="button"
                        className="chatbot-close"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close chat"
                    >
                        ✕
                    </button>
                </div>

                <div className="chatbot-messages">
                    {messages.length === 0 && (
                        <p className="chatbot-placeholder">Ask me anything about David's background, experience, or projects.</p>
                    )}
                    {messages.map((msg, i) => (
                        <div key={i} className={`chatbot-message chatbot-message-${msg.role}`}>
                            {msg.content}
                        </div>
                    ))}
                    {status === "sending" && (
                        <div className="chatbot-message chatbot-message-assistant chatbot-message-pending">
                            Thinking…
                        </div>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="chatbot-form">
                    <div className="honeypot-field" aria-hidden="true">
                        <label htmlFor="chatHoney">Second email</label>
                        <input
                            type="text"
                            id="chatHoney"
                            name="honey"
                            value={honey}
                            onChange={(e) => setHoney(e.target.value)}
                            tabIndex={-1}
                            autoComplete="off"
                        />
                    </div>

                    <input
                        type="text"
                        className="chatbot-input"
                        placeholder="Ask a question..."
                        value={question}
                        onChange={handleChange}
                        maxLength={500}
                        disabled={status === "sending"}
                        autoFocus
                    />
                    <button type="submit" className="btn btn-primary" disabled={status === "sending" || !question.trim()}>
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}