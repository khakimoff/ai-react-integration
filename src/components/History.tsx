
import { Button } from "antd";
import styles from "./History.module.css";

export interface History {
  question: string;
  onClick: () => void;
}

export default function History({ question, onClick }: History) {
  return (
    <Button
      onClick={onClick}
      className={styles.history}
      type="dashed"
      block>
      {question}
    </Button>
  );
}


