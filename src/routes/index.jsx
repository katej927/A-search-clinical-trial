import { Route, Routes } from 'react-router-dom';
import Main from './Main';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='*' element={<div>페이지를 찾을 수 없습니다.</div>} />
    </Routes>
  );
};

export default App;
