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

interface Component1Props {
    component2: Component2Props;
    component3: Component3Props;
}

interface Component2Props {
    count: number;
    setCount: (value: (((prevState: number) => number) | number)) => void;
}

interface Component3Props {
    component4: Component4Props;
    message: string;
}

interface Component4Props {
    count: number;
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

function Component1(props: Component1Props) {
    return (
        <div>
            <Component3 component4={{count: props.component3.component4.count}} message={"Component3's message"}/>
            <Component2 count={props.component2.count} setCount={props.component2.setCount} />
        </div>
    );
}

function Component2(props: Component2Props) {
    return (
        <button onClick={() => props.setCount(props.count + 1)}>
            Click here
        </button>
    );
}

function Component3(props: Component3Props) {
    return(
        <div>
            <Component4 count={props.component4.count} />
            <p>{props.message}</p>
        </div>
    );
}

function Component4(props: Component4Props) {
    return (
        <p>You clicked {props.count} times</p>
    );
}

function App() {
    let countTemp = localStorage.getItem('count') || '0';

    const [count, setCount] = useState(parseInt(countTemp));

    // const component4Props: Component4Props = {count: 0};
    
    useEffect(() => {
        document.title = `You clicked ${count} times`;
        window.localStorage.setItem('count', count.toString());
    }, [count])

    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Template title="NASA" p1="Astronomy Picture of the Day" p2="2001 March 6" image={dumbbell}/>

          <Component1 component2={{count: count, setCount: setCount}} component3={{component4: {count: count}, message: "Component3's message"}} />
          {/*<Component3 component4={{count: count}} message={"Component3's message"}/>*/}
          {/*<Component2 count={count} setCount={setCount} />*/}
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
