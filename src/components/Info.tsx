import { Typography } from "antd";
import bot from "../icons/bot.png";
import styles from "./Info.module.css";

export default function Info() {
    const { Title } = Typography;

    return (
        <div className={styles.info}>
            <img src={bot} alt="bot" width={64} className={styles.image} />
            <Title level={5}>How can I help you today?</Title>
        </div>
    )
}