
import { useState } from 'react';
import { typeOrder, typeView } from '../models';
import SearchBar from '../components/SearchBar/SearchBar';
import Header from '../components/Header/Header';
import ListContainer from '../components/ListContainer/ListContainer';
import SearchContainer from '../components/SearchContainer/SearchContainer';
import SearchOption from '../components/SearchOption/SearchOption';
import Footer from '../components/Footer/Footer';
import styles from './App.module.scss';

function Home() {
  const [filterBy, setFilterBy] = useState<string>("");
  const [orderBy, setOrderBy] = useState<typeOrder>("firstName");
  const [view, setView] = useState<typeView>("characters");

  return (
    <div className={styles.App__layout}>
      <Header onChangeView={setView}/>
      <SearchContainer>
        <SearchBar onSearchFilter={setFilterBy} />
        <SearchOption onSearchOrder={setOrderBy} />
      </SearchContainer>
      <ListContainer filterBy={filterBy} orderBy={orderBy} view={view}/>
      <Footer/>
    </div>
  )
}

export default Home;