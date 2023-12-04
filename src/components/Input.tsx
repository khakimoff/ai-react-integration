
import { ChangeEvent } from "react";

import styles from "./Input.module.css";
import { Input, Tooltip, Button } from "antd";
import { ArrowUpOutlined, LoadingOutlined } from "@ant-design/icons";

interface InputBlock {
  value: string | number;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onClick: (() => void) | undefined;
  statusAnswer: boolean;
}

export default function InputBlock({ value, onChange, onClick, statusAnswer }: InputBlock) {
  const { TextArea } = Input;
  return (
    <div className={styles.wrapper}>
      <TextArea
        value={value}
        onChange={onChange}
        placeholder="Message OpenAI..."
        autoSize
        className={styles.textArea}
      />
      <Tooltip title="Send message">
        <Button
          type="primary"
          icon={statusAnswer ? <LoadingOutlined /> : <ArrowUpOutlined />}
          size={"small"}
          disabled={statusAnswer}
          onClick={onClick}
          className={styles.button}
        />
      </Tooltip>
    </div>
  );
}
