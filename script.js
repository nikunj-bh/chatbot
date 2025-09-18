function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = React.useState("");

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function sendMessage() {
    if (inputText.trim() === "") return;
    const newChatMessages = [
      ...chatMessages,
      { message: inputText, sender: "user", id: crypto.randomUUID() },
    ];
    setChatMessages(newChatMessages);

    const response = Chatbot.getResponse(inputText);
    setChatMessages([
      ...newChatMessages,
      { message: response, sender: "robot", id: crypto.randomUUID() },
    ]);
    setInputText("");
  }

  return (
    <div className="chat-input-container">
      <input
        value={inputText}
        placeholder="Send message to chatbot"
        onChange={saveInputText}
        className="text-box"
      />
      <button onClick={sendMessage} className="send-button">
        Send
      </button>
    </div>
  );
}

function ChatMessage({ message, sender }) {
  return (
    <div
      className={sender === "user" ? "chat-message-user" : "chat-message-robot"}
    >
      {sender === "robot" && (
        <img src="images/robot.png" className="robot-image" />
      )}
      <div className="message">{message}</div>
      {sender === "user" && (
        <img src="images/user.png" className="user-image" />
      )}
    </div>
  );
}

function ChatMessages({ chatMessages }) {
  const chatMessagesRef = React.useRef(null);
  React.useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages]);
  return (
    <div className="chat-messages" ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => (
        <ChatMessage
          message={chatMessage.message}
          sender={chatMessage.sender}
          key={chatMessage.id}
        />
      ))}
    </div>
  );
}

function App() {
  const [chatMessages, setChatMessages] = React.useState([
    {
      message: "👋 Hi there! I’m your chatbot. Type a message to start chatting!",
      sender: "robot",
      id: crypto.randomUUID(),
    },
  ]);

  return (
    <div className="app-container">
      <div className="chat-top-image">
        <img src="images/robot.png" alt="Chatbot" />
      </div>
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        
      />
    </div>
  );
}

const container = document.querySelector(".js-container");
ReactDOM.createRoot(container).render(<App />);
