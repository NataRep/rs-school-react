import { Component } from 'react';
import s from './Main.module.scss'; // Импортируем объект со стилями

export default class Main extends Component {
  render() {
    return (
      <main className={s.mainContainer}>
        <p>Мейн работает</p>
      </main>
    );
  }
}