import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import dumbbell from './dumbbell_noao.jpg';
import './App.css';
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import {Component1} from "./Component1";
import {Component2Props} from "./Component2";
import FormControl from '@mui/material/FormControl';
import {InputLabel, MenuItem, Select} from "@mui/material";
import {RoverDetailsParams, RoverPhotosForUsersParams} from "./RoverDetails";

interface TemplateProps {
    title: string;
    p1: string;
    p2: string;
    image: string;
}

function Template(props: TemplateProps) {
    return (
        <div>
            <h1>{props.title}</h1>
            <p>{props.p1}</p>
            <p>{props.p2}</p>
            <img src={props.image} alt="dumbbell"/>
        </div>
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

function SelectRoverName() {
    const [data, setData] = React.useState([] as RoverDetailsParams[]);
    const [roverName, setRoverName] = React.useState('');
    const [cameraType, setCameraType] = React.useState('');
    const [imgSrcs, setImgSrcs] = React.useState([] as string[]);

    useEffect(() => {
        async function getData() {
            return (await fetch('http://localhost:8000/rovers').then(response => response.json())).rovers;
        }

        getData().then(actualData => setData(actualData));
    }, []);

    useEffect(() => {
        async function getData() {
            return (await fetch('http://localhost:8000/rovers/' + roverName + '/photos/' + cameraType).then(response => response.json()));
        }

        if (roverName && cameraType) {
            getData().then(actualData => setImgSrcs(actualData.map((item: RoverPhotosForUsersParams) => item.img_src)));
        }
    }, [cameraType]);

    const roverNameHandleChange = (e: any) => setRoverName(e.target.value);

    const cameraTypeHandleChange = (e: any) => {
        setCameraType(e.target.value);
    }

    const roverNames: string[] = data.map(detail => detail.name);

    const cameraTypes: Map<string, string[]> = new Map([]);
    roverNames.forEach(roverName => cameraTypes.set(roverName, []));
    data.forEach(item => item.cameras.forEach(camera => cameraTypes.get(item.name)?.push(camera.name)));

    return (
        <div>
            <FormControl sx={{m: 1, minWidth: 140}}>
                <InputLabel id="demo-simple-select-label">Rover Name</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={roverName}
                    label="Rover"
                    onChange={roverNameHandleChange}>
                    {
                        roverNames.map((item, index) => (
                            <MenuItem key={index} value={item}>{item + " Label"}</MenuItem>))
                    }
                </Select>
            </FormControl>

            <FormControl sx={{m: 1, minWidth: 150}}>
                <InputLabel id="demo-simple-select-label">Camera Type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={cameraType}
                    label="Camera"
                    onChange={cameraTypeHandleChange}
                >
                    {
                        cameraTypes.get(roverName)?.map((item, index) => (
                            <MenuItem key={index} value={item}>{item + " Label"}</MenuItem>))
                    }
                </Select>
            </FormControl>

            {
                imgSrcs.map((img, index) => <img key={index} src={img}></img>)
            }

        </div>
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
                    <li>
                        <Link to="/rovers">Rovers</Link>
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

                    <Route
                        path="/rovers"
                        element={<SelectRoverName/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
