import { useState } from "react";

export default function CoachAIChat() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Welcome! I’m COACH AI. How can I help you master your skill today?" },
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
        Authorization: "Bearer sk-proj-VAxgMfL_jeDySGbAZgt9WZF-sxwaRlKEo0JNNdbAs8dI-ISKOQlsrMHDmX5B8TKZ_VKIUBVhJET3BlbkFJsrjKzuKvh7JKSb2lhXOEv81CFNgVRrmkXuyAUYBKgu0Xm996PTqNdYZKNrUA0CbiHFH9_VDB0AY"
      },
      body: JSON.stringify({
        model: "gpt-4-turbo",
        messages: newMessages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();
    const assistantReply = data.choices?.[0]?.message?.content || "Oops! No reply.";
    setMessages([...newMessages, { role: "assistant", content: assistantReply }]);
    setLoading(false);
  };

  return (
    <div>
      {messages.map((m, i) => (
        <div key={i}>
          <strong>{m.role}:</strong> {m.content}
        </div>
      ))}
      {loading && <p>Typing...</p>}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask COACH AI..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
