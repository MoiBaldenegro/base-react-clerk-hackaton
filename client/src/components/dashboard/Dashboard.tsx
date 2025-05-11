import styles from './Dasboard.module.css';
import { OrganizationList, OrganizationSwitcher, useAuth, useClerk, useOrganization, useOrganizationList,  UserButton,  useSession,  useSessionList,  useUser,  Waitlist } from '@clerk/clerk-react'
import {  PricingTable } from '@clerk/clerk-react'
import {  useState } from 'react';

export const Dashboard = () => {
  const { user } = useUser();
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  // console.log(user)

  // const clerk = useClerk();
  // console.log(clerk) 

  // De aca me parece interesante que tenemos la informacion de la oprganizacion tambien.
  // const auth = useAuth();
  // console.log(auth);

  // Aqui esta interesante que tambien tenemos todo la informacion del usuario.
  // const session = useSession();
  // console.log(session)

  // const sessionList = useSessionList();
  // console.log(sessionList);


    /* Esto nos interesa */ 
  // const organization = useOrganization();
  // console.log(organization)

  const organizationList = useOrganizationList();
  console.log(organizationList)

  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  })

  if (!isLoaded) {
    return <>Loading</>
  }
  if (!userMemberships) {
    return <>No memberships</>
  }

  return (

    <>
     {
    selectedOrganization ? ( 
      <main className={styles.dashborad}>
        <h1>organización DASHBOARD</h1>
      </main>
    ) : (
       <main className={styles.dashboard}>
      {/* <ul>
        {userMemberships.data?.map((mem) => (
          <li key={mem.id}>
            <span>{mem.organization.name}</span>
            <button onClick={() => setActive({ organization: mem.organization.id })}>Select</button>
          </li>
        ))}
      </ul>
      <button disabled={!userMemberships.hasNextPage} onClick={() => userMemberships.fetchNext()}>
        Load more
      </button> */}
      {/* <OrganizationList />
      <OrganizationSwitcher />
      <Waitlist />
      <PricingTable /> */}
      
      <div>
        <UserButton showName />
        <ul>
          <li>
            <span>
              Miembro desde: 
            </span>
            <span>
              {user?.createdAt?.toLocaleDateString()}
            </span>
          </li>
          <li>
            <span>
              Cuenta de correo:
            </span>
            <span>
              {user?.emailAddresses[0].emailAddress}
            </span>
          </li>
          <li>
            <span>
              verificacion:
            </span>
            <span>
              {user?.emailAddresses[0].verification.status}
            </span>
          </li>
        </ul>
      </div>
      <div>3</div>
      <div>4</div>
      <div>
      <OrganizationList hidePersonal />
      </div>
      <div>
      <PricingTable />
        <article>
          Aca pondremos todos los beneficios segun el plan que se tenga activo.
        </article>
      </div>
    </main>
    )
   }</>
  
  )
}