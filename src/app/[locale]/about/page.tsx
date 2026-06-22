import Icon from '@/components/icon/Icon';
import style from './About.module.scss';

export default function About() {
  return (
    <div className={style.wrapper}>
      <h1>About</h1>
      <p>
        Hi! My name is{' '}
        <a
          href="https://github.com/NataRep"
          rel="noopener noreferrer"
          title="GitHub"
          target="_blank"
          className={style.link}
        >
          Nata Repkina
        </a>
        , and this project was created as part of the React course at RS School.
      </p>
      <p>
        This app is a small Star Wars search project powered by the{' '}
        <a
          href="https://swapi.py4e.com/"
          rel="noopener noreferrer"
          title="SWAPI API"
          target="_blank"
          className={style.link}
        >
          SWAPI API
        </a>
        . You can search for characters, planets, starships, and other
        information from the Star Wars universe.
      </p>
      <h2>A little about me:</h2>
      <p>
        I’m a bit of a designer, a bit of an SEO specialist, a bit of a juggler
        — but mostly a frontend developer. I enjoy building interfaces, learning
        how applications work under the hood, and turning ideas into interactive
        web projects.
      </p>
      <p>
        While working on this app, I practiced React, component-based
        architecture, routing, API requests, and state management.
      </p>
      <h2>A little about the course:</h2>
      <p>
        This project is part of the RS School React training program, where I’m
        improving my frontend skills through hands-on practice and
        real-world-style tasks.
      </p>

      <div className={style.logo}>
        <Icon name="logo" className={style.logo}></Icon>
      </div>
      <p>
        My project mentor:{' '}
        <a
          href="https://github.com/max0n4ik"
          title="GitHub"
          target="_blank"
          className={style.link}
        >
          Maksim Gorohov
        </a>
        .
      </p>
      <p>
        Course:{' '}
        <a
          href="https://rs.school/courses/reactjs"
          title="RS School react course"
          target="_blank"
          className={style.link}
        >
          RS&nbsp;School React&nbsp;Course
        </a>
      </p>
    </div>
  );
}
