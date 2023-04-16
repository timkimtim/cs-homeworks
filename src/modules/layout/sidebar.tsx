import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { routes } from 'config';
import { formatRoutesToArray } from 'modules/router/utils';

import styles from './layout.module.scss';

interface Props {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}
export const Sidebar: FC<Props> = ({ isSidebarOpen, onToggleSidebar }) => {
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    onToggleSidebar();
    navigate(path);
  };

  return (
    <div className={clsx(styles.sidebar, !isSidebarOpen && styles.hidden)}>
      <div className={styles.links}>
        {formatRoutesToArray(routes).map(({ id, title, path, isNavItem }) => {
          if (isNavItem) {
            return (
              <div key={id} className={styles.link} onClick={() => handleNavigate(path)} role="presentation">
                {title}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};
