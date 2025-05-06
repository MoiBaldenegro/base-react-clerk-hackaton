import { CreateOrganization, SignedIn, SignedOut, SignIn, UserButton} from "@clerk/clerk-react";
import styles from "./createOrganization.module.css"

export const CreateOrganizationComponent = () => {
  return (
    <main className={styles.container}>
        <section>
            <h1>Welcome to the Home Page</h1>
            <p>This is a protected route. Only signed-in users can see this.</p>
            <CreateOrganization />
            <p>To create an organization, please fill in the form.</p>
        </section>
    </main>
  )
}
