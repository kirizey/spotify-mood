import React from 'react';
import AppRouter from './AppRouter';
import bg from './assets/img/bg.jpg'

function App() {
  return (
    <div className="App">
      <img className="App__bg" src={bg} />
      <a href="/">
        <h1 className="App__title">Moodify</h1>
      </a>
      <AppRouter />
    </div>
  );
}

export default App;
