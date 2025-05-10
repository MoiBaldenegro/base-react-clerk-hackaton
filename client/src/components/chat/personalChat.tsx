import { MoisesChat } from "../examples/moisesChat";
import styles from "./personalChat.module.css";

export const MoisesChatPersonal = () => {
    return (
        <main className={styles.personalChat}>
            <MoisesChat />
        </main>
    )
}