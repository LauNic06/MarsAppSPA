import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import dumbbell from './dumbbell_noao.jpg';
import './App.css';

interface TemplateProps {
    title: string;
    p1: string;
    p2: string;
    image: string;
}

function Template(props: TemplateProps) {
  return (
      <p>
        <h1>{props.title}</h1>
        <p>{props.p1}</p>
        <p>{props.p2}</p>
        <img src={props.image} alt="dumbbell" />
      </p>
  );
}

function App() {
    let countTemp = localStorage.getItem('count') || '0';

    const [count, setCount] = useState(parseInt(countTemp));

    useEffect(() => {
        document.title = `You clicked ${count} times`;
        window.localStorage.setItem('count', count.toString());
    }, [count])

    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Template title="NASA" p1="Astronomy Picture of the Day" p2="2001 March 6" image={dumbbell}/>
          <p>You clicked {count} times</p>
          <button onClick={() => setCount(count + 1)}>
              Click here
          </button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
