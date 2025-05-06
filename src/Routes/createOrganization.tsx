import { CreateOrganization, SignedIn, SignedOut, SignIn, UserButton} from "@clerk/clerk-react";

export const CreateOrganization = () => {
  return (
    <main>
        <div className="home">
            <h1>Welcome to the Home Page</h1>
            <p>This is a protected route. Only signed-in users can see this.</p>
            <CreateOrganization />
            <p>To create an organization, please fill in the form.</p>
        </div>
    </main>
  )
}
