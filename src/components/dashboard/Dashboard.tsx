import styles from './Dasboard.module.css';

export const Dashboard = () => {
  return (
    <main className={styles.dashboard}>
      <div className={styles.container}>
        <h1>Welcome to the Dashboard</h1>
        <p>This is a protected route. Only signed-in users can see this.</p>
        <p>To create an organization, please fill in the form.</p>
      </div>
    </main>
  );
}