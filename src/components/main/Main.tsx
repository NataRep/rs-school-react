import { Component } from 'react';
import Search from '../search/Search';
import style from './Main.module.scss';

export default class Main extends Component {
  render() {
    return (
      <main className={style.mainContainer}>
        <Search></Search>
      </main>
    );
  }
}
