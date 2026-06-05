import './App.css';
import Dashboard from './components/features/dashboard/Dashboard';

function App() {

  return (
    <>
      <header>React Forms Sandbox</header>
      <main>
        <Dashboard />
      </main>
      <footer>
        <p>by <a href="https://github.com/NataRep" target='_blank'>NataRep</a></p>
        <p>for <a href="https://rs.school/courses/reactjs" target='_blank'>RS School React Course Task</a></p>
        <p>2026(c)</p></footer>
      <div className='modals-container' id="modal-root"></div>
    </>
  );
}

export default App;
