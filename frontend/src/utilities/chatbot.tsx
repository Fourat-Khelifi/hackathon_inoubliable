import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "agent", text: "Hello! I'm here to help you start your journey. How can I assist you today?" }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMessage = { role: "user", text: inputValue };
        setMessages([...messages, userMessage]);
        setInputValue("");
        setLoading(true);

        try {
            const response = await fetch("https://ccd95b7f1247.ngrok-free.app/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: inputValue })
            });

            const data = await response.json();
            const agentText = data?.reply || "No response from the server.";

            setMessages(prev => [...prev, { role: "agent", text: agentText }]);
        } catch (err) {
            setMessages(prev => [...prev, { role: "agent", text: "Error: Could not reach the server." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <motion.button
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-bluue to-primary-glow shadow-lg flex items-center justify-center hover:shadow-glow transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
            >
                <MessageCircle className="w-6 h-6 text-primary-foreground" />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-card rounded-lg shadow-elegant flex flex-col overflow-hidden"
                    >
                        <div className="bg-bluue p-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <MessageCircle className="w-5 h-5 text-primary-foreground" />
                                <h3 className="font-semibold text-primary-foreground">AI Agent</h3>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-primary-foreground hover:opacity-80 transition-opacity"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
                            {messages.map((msg, idx) => {
                                if (msg.role === "agent") {
                                    // Split intro from numbered points
                                    const parts = msg.text.split(/\d+\.\s/).filter(Boolean);
                                    return (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex justify-start"
                                        >
                                            <div className="max-w-[80%] rounded-lg p-3 bg-card border border-border">
                                                <p className="text-sm mb-2">{parts[0]}</p>
                                                {parts.length > 1 && (
                                                    <ol className="list-decimal list-inside text-sm space-y-1">
                                                        {parts.slice(1).map((item, i) => (
                                                            <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                                                        ))}
                                                    </ol>
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                } else {
                                    return (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex justify-end"
                                        >
                                            <div className="max-w-[80%] rounded-lg p-3 bg-bluue text-primary-foreground">
                                                <p className="text-sm">{msg.text}</p>
                                            </div>
                                        </motion.div>
                                    );
                                }
                            })}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="max-w-[80%] rounded-lg p-3 bg-card border border-border text-sm text-muted-foreground">
                                        Typing...
                                    </div>
                                </div>
                            )}
                        </div>


                        <div className="p-4 border-t border-border bg-card">
                            <div className="flex gap-2">
                                <Input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-1 border-bluue focus-visible:ring-bluue/50"
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                />
                                <Button
                                    onClick={handleSend}
                                    size="icon"
                                    className="bg-bluue hover:shadow-glow"
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
