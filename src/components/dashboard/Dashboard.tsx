import styles from './Dasboard.module.css';
import { OrganizationList, OrganizationSwitcher, useOrganizationList,  Waitlist } from '@clerk/clerk-react'
import {  PricingTable } from '@clerk/clerk-react'

export const Dashboard = () => {

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
      
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>
      <PricingTable />
      </div>
    </main>
  )
}