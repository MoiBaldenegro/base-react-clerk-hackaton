import { OrganizationList, SignIn, useAuth, useOrganization, useOrganizationList, useSession, useUser } from "@clerk/clerk-react";
import styles from "./discord.module.css";
import { useEffect } from "react";


export const DiscordContainer = () => {
    const {user} = useUser();
    
    useEffect(()=>{
        console.log(user)
    })
    return (
        <main className={styles.container}>
            <h1>Discord Container</h1>
        </main>
    )
}