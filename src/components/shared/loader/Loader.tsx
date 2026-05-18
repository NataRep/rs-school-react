import { Component } from "react";
import style from './Loader.module.scss';

export default class Loader extends Component {
  render() {
    return <div className={style.loader}></div>
  }
}