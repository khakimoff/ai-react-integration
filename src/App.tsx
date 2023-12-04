
import { useState, ChangeEvent } from "react";
import { Avatar, List, Typography } from 'antd';
import shortid from 'shortid';

import InputBlock from "./components/Input.js";
import History from "./components/History.js";
import Clear from "./components/Clear.js";
import OpenAIRequestComponent from "./components/OpenAIRequestComponent.js";
import Info from "./components/Info.js";
import bot from './icons/bot.png';
import user from './icons/user.png';
import "./App.css";
export interface HistoryItem {
  question: string;
  answer: string;
}
export interface MessagesItem {
  role: string;
  content: string | number;
}

export default function App() {
  const [isLoadAnswer, serIsLoadAnswer] = useState<boolean>(false);
  const [input, setInput] = useState<string | number>("");
  const [messages, setMessages] = useState<MessagesItem[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const { Title } = Typography;

  const isEmptyChat = !messages.length;

  const handleSubmit = async () => {
    await OpenAIRequestComponent(input, messages, setMessages, setHistory, setInput, serIsLoadAnswer);
  };

  const selectStory = (userContent: string | number, assistantContent: string | number): void => {
    setMessages([
      { role: "user", content: userContent },
      { role: "assistant", content: assistantContent },
    ]);
  };

  const clear = () => {
    setMessages([]);
    setHistory([]);
    serIsLoadAnswer(false);
  };

  return (
    <div className="App">
      <div className="left_block">
        <Title className="title" level={5}>History</Title>
        <div className="content">
          {history.map((item, i) =>
            <History
              key={shortid.generate()}
              question={item.question}
              onClick={() => selectStory(history[i].question, history[i].answer)}
            />
          )}
        </div>
        <Clear onClick={clear} />
      </div>
      <div className="right_block">
        <Title className="title" level={5}>Chat</Title>
        <div className="content">
          {isEmptyChat ?
            <Info /> :
            <List
              itemLayout="horizontal"
              dataSource={messages}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.role === 'user' ? user : bot} />}
                    title={item.role === "user" ? "You" : "OpenAI"}
                    description={item.content}
                  />
                </List.Item>
              )}
            />
          }
        </div>
        <InputBlock
          value={input}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          onClick={input ? handleSubmit : undefined}
          statusAnswer={isLoadAnswer}
        />
      </div>
    </div>
  );
}
