import React, { FC } from 'react';
import { Cover } from './cover/Cover';
import styles from './Home.module.css';

export const Home: FC = () => {
  return (
    <div data-tid="container" className={styles.Home}>
      <Cover />
    </div>
  );
};
