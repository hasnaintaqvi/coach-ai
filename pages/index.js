import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "👋 Hey! I’m COACH AI. What do you want to master today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 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" // Replace this
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: newMessages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Oops, something went wrong!";
    setMessages([...newMessages, { role: "assistant", content: reply }]);
    setLoading(false);
  };

  return (
    <div style={{ padding: "30px", fontFamily: "sans-serif" }}>
      {messages.map((msg, i) => (
        <p key={i}><b>{msg.role}:</b> {msg.content}</p>
      ))}
      {loading && <p>Typing...</p>}
      <input
        style={{ padding: "10px", width: "70%" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask COACH AI anything..."
      />
      <button style={{ padding: "10px" }} onClick={sendMessage}>Send</button>
    </div>
  );
}
