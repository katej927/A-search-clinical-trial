import SearchBar from 'components/searchBar/SearchBar';
import SearchRecommendation from 'components/searchRecommendation/SearchRecommendation';
import styles from '../routes.module.scss';

const Main = () => {
  return (
    <div className={styles.mainWrapper}>
      <h1>
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기
      </h1>
      <SearchBar />
      <SearchRecommendation />
    </div>
  );
};

export default Main;
