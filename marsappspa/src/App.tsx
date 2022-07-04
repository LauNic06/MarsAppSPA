import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import dumbbell from './dumbbell_noao.jpg';
import './App.css';
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import {Component1} from "./Component1";
import {Component2Props} from "./Component2";

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
            <img src={props.image} alt="dumbbell"/>
        </p>
    );
}

function Home() {
    return <h2>Home</h2>;
}

function AppHeader() {
    return <h2>AppHeader</h2>;
}

function AppLogo() {
    return <img src={logo} className="App-logo" alt="logo"/>;
}

export const userDetailContext = React.createContext<Component2Props>(null as unknown as Component2Props);

function App() {
    let countTemp = localStorage.getItem('count') || '0';

    const [count, setCount] = useState(parseInt(countTemp));

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
                    <li>
                        <Link to="/details">Details</Link>
                    </li>
                    <li>
                        <Link to="/components">Components</Link>
                    </li>
                </ul>

                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/app-header" element={<AppHeader/>}/>
                    <Route path="/app-logo" element={<AppLogo/>}/>
                    <Route path="/details"
                           element={<Template title="NASA" p1="Astronomy Picture of the Day" p2="2001 March 6"
                                              image={dumbbell}/>}/>
                    <Route
                        path="/components"
                        element={<userDetailContext.Provider value={{count: count, setCount: setCount}}><Component1/>
                        </userDetailContext.Provider>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
