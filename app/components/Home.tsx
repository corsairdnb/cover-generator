import React, { FC } from 'react';
import { Cover } from '../features/cover/Cover';
import styles from './Home.module.scss';

export const Home: FC = () => {
  return (
    <div data-tid="container" className={styles.home}>
      <Cover />
    </div>
  );
};
