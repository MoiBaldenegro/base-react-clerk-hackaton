import styles from './moises.module.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  width?: string;
  children: React.ReactNode;
}

const MoisesSidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  width = '420px',
  children,
}) => {
  return (
    <aside
      className={styles.sidebar}
      style={{ width }}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>Sidebar</h2>
        <button
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Close sidebar"
        >
         X
        </button>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </aside>
  );
};

export default MoisesSidebar;