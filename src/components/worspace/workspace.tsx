import MainCodeWindow from '../core/main-code-window/mainCodeWindow';
import styles from './workspace.module.css';
// import { useOrganizationList } from '@clerk/clerk-react'

export const Workspace = () => {

//   const { isLoaded, setActive, userMemberships } = useOrganizationList({
//     userMemberships: {
//       infinite: true,
//     },
//   })

//   if (!isLoaded) {
//     return <>Loading</>
//   }
//   if (!userMemberships) {
//     return <>No memberships</>
//   }

  return (
    <main className={styles.workspace} >
        <MainCodeWindow/>
    </main>
  )
}