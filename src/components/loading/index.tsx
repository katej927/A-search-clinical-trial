import ReactLoading from 'react-loading';
import styles from './loading.module.scss';

export const Loading = () => {
  return (
    <div className={styles.loadingWrapper}>
      <ReactLoading type='spin' color='#007be9' height={30} width={30} />
    </div>
  );
};
