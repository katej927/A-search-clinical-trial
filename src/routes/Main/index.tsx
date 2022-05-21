import styles from './main.module.scss';
import SearchBar from 'components/searchBar';

const Main = () => {
  return (
    <div className={styles.mainWrapper}>
      <section className={styles.content}>
        <header>
          국내 모든 임상시험 검색하고
          <br />
          온라인으로 참여하기
        </header>
        <SearchBar />
      </section>
    </div>
  );
};

export default Main;
