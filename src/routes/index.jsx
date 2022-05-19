import { Route, Routes } from 'react-router-dom';
import styles from './routes.module.scss';
import Main from './Main';

const App = () => {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='*' element={<div>404</div>} />
      </Routes>
    </div>
  );
};

export default App;
