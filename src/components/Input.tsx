
import { ChangeEvent } from "react";

import styles from "./Input.module.css";
import { Input, Tooltip, Button } from 'antd';
import { ArrowUpOutlined, LoadingOutlined } from "@ant-design/icons";

interface InputBlock {
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: (() => Promise<void>) | undefined;
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
        style={{
          paddingRight: '40px'
        }}
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
