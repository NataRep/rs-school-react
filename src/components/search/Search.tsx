import { Component } from 'react';
import SearchForm from '../search/search-form/SearchForm';
import style from './Search.module.scss';

export default class Search extends Component {
  render() {
    return (
      <div className={style.container}>
        <h1>Star Wars Universe Search</h1>
        <SearchForm></SearchForm>
      </div>
    );
  }
}
