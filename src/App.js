import css from './App.module.css';
import LeftBannerImage from './assets/images/left-banner.png';
import MainPage from './components/sections/MainPage';

function App() {
  return (
    <div className={css.container}>
      <img src={LeftBannerImage} alt=''/>
      <MainPage/>
    </div>
  );
}

export default App;
