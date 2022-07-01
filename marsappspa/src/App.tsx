import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import dumbbell from './dumbbell_noao.jpg';
import './App.css';
import {Link, Route, BrowserRouter as Router, Routes, useLocation} from "react-router-dom";
// import {}

interface TemplateProps {
    title: string;
    p1: string;
    p2: string;
    image: string;
}

interface Component2Props {
    count: number;
    setCount: (value: (((prevState: number) => number) | number)) => void;
}

interface Component3Props {
    message: string;
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

function Component1() {
    return (
        <div>
            <Component3 message={"Component3's message"}/>
            <Component2 />
        </div>
    );
}

function Component2() {
    let contextData = React.useContext(userDetailContext);
    return (
        <button onClick={() => contextData.setCount(contextData.count + 1)}>
            Click here
        </button>
    );
}

function Component3(props: Component3Props) {
    return(
        <div>
            <Component4 />
            <p>{props.message}</p>
        </div>
    );
}

function Component4() {
    let contextData = React.useContext(userDetailContext);
    return (
        <p>You clicked {contextData.count} times</p>
    );
}

function Home() {
    return <h2>Home</h2>;
}

function AppHeader() {
    return <h2>AppHeader</h2>;
}

function AppLogo() {
    return <img src={logo} className="App-logo" alt="logo" />;
}

let userDetailContext = React.createContext<Component2Props>(null as unknown as Component2Props);

function App() {
    let countTemp = localStorage.getItem('count') || '0';

    const [count, setCount] = useState(parseInt(countTemp));

    // const component4Props: Component4Props = {count: 0};

    useEffect(() => {
        document.title = `You clicked ${count} times`;
        window.localStorage.setItem('count', count.toString());
    }, [count])

    return (
        <Router>
            <div className="App">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/app-header">AppHeader</Link>
                    </li>
                    <li>
                        <Link to="/app-logo">App-Logo</Link>
                    </li>
                    {/*<li>*/}
                    {/*    <Link to="/details">Details</Link>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <Link to="/components">Components</Link>*/}
                    {/*</li>*/}
                </ul>


                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/app-header" element={<AppHeader/>} />
                    <Route path="/app-logo" element={<AppLogo/>} />
                </Routes>
            </div>
            {/*<div className="App">*/}
            {/*    <header className="App-header">*/}
            {/*        <img src={logo} className="App-logo" alt="logo" />*/}
            {/*        <Template title="NASA" p1="Astronomy Picture of the Day" p2="2001 March 6" image={dumbbell}/>*/}
            {/*        <userDetailContext.Provider value={{count: count, setCount: setCount}}>*/}
            {/*            <Component1 />*/}
            {/*        </userDetailContext.Provider>*/}
            {/*        /!*<Component3 component4={{count: count}} message={"Component3's message"}/>*!/*/}
            {/*        /!*<Component2 count={count} setCount={setCount} />*!/*/}
            {/*        <a*/}
            {/*            className="App-link"*/}
            {/*            href="https://reactjs.org"*/}
            {/*            target="_blank"*/}
            {/*            rel="noopener noreferrer"*/}
            {/*        >*/}
            {/*            Learn React*/}
            {/*        </a>*/}
            {/*    </header>*/}
            {/*</div>*/}
        </Router>
    );
}

export default App;
