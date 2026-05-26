import { MessageCircle, Send, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
export function LiveChat() {
    const [open, setOpen] = useState(false);
    const [msgs, setMsgs] = useState  ([
        { from: "agent", text: "Welcome to RHOMB. How may we assist with your jewellery selection today?" },
    ]);
    const [text, setText] = useState("");
    const send = () => {
        if (!text.trim()) return;
        setMsgs((m) => [...m, { from: "me", text }]);
        setText("");
        setTimeout(() => setMsgs((m) => [...m, { from: "agent", text: "Thank you. A jewellery concierge will reply shortly." }]), 900);
    };
    return (
        <>
            <button
                onClick={() => setOpen((o) => !o)}
                className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full gold-bg-gradient text-black gold-glow"
                aria-label="Live chat"
            >
                {open ? <X /> : <MessageCircle />}
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-5 z-40 flex h-[420px] w-[330px] flex-col overflow-hidden rounded-2xl glass-strong"
                    >
                        <div className="border-b border-gold/20 bg-foreground/5 p-4">
                            <div className="font-display gold-gradient text-lg">RHOMB Concierge</div>
                            <div className="text-[11px] text-muted-foreground">Online · replies in seconds</div>
                        </div>
                        <div className="flex-1 space-y-2 overflow-y-auto p-3">
                            {msgs.map((m, i) => (
                                <div key={i} className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${m.from === "me" ? "ml-auto gold-bg-gradient text-black" : "bg-muted"}`}>
                                    {m.text}
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 border-t border-gold/20 p-2">
                            <input
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && send()}
                                placeholder="Type a message…"
                                className="flex-1 rounded-full border border-gold/30 bg-background/60 px-4 py-2 text-sm outline-none focus:border-gold"
                            />
                            <button onClick={send} className="grid h-9 w-9 place-items-center rounded-full gold-bg-gradient text-black">
                                <Send className="h-4 w-4" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
