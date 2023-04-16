import { FC, ReactNode, useState } from 'react';

import { Header } from './header';
import { Sidebar } from './sidebar';

import styles from './layout.module.scss';

export interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <div className={styles.container}>
        <Header isSidebarOpen={isSidebarOpen} onToggleSidebar={handleToggleSidebar} />
        <div className={styles.page}>{children}</div>
      </div>
      <Sidebar isSidebarOpen={isSidebarOpen} onToggleSidebar={handleToggleSidebar} />
    </div>
  );
};
