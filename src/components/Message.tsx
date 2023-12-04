import bot from "../icons/bot.png";
import user from "../icons/user.png";
import styles from "./Message.module.css";
import { MessagesItem } from "../App";

export default function Message({ role, content }: MessagesItem) {
  const status = (role === "assistant") ? bot : user;

  return (
    <div className={styles.wrapper}>
      <div>
        <img
          src={status}
          className={styles.avatar}
          alt="profile avatar"
        />
      </div>
      <div>
        <p>{content}</p>
      </div>
    </div>
  );
}
