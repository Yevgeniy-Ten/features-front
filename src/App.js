import React, {useState} from "react";
import TableWrap from "./components/Table/TableWrap";
import Slider from "./components/Slider/Slider";
import Loop from "./components/Loop/Loop";
import CropImage from "./components/CropImage/CropImage";

function App() {
    const [activeComponent, setActiveComponent] = useState([{
        id: 1,
        component: TableWrap,
        active: false,
        name: "Таблица"
    },
        {
            id: 2,
            component: Slider,
            active: false,
            name: "Слайдер"
        },
        {
            id: 3,
            component: Loop,
            active: false,
            name: "Лупа"
        },
        {
            id: 4,
            component: CropImage,
            active: true,
            name: "Обрезать"
        }])
    const toggleActiveComponent = (id) => {
        setActiveComponent(prev => prev.map(a => ({...a, active: a.id === id})))
    }

    return (
        <>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <h1 className="navbar-brand">Фичи</h1>
                    <ul className="navbar-nav flex-row">
                        {activeComponent.map(a => {
                            return <li className="nav-item me-3" key={a.id}>
                                <button onClick={toggleActiveComponent.bind(null, a.id)}
                                        className={`btn nav-link ${a.active ? "active" : ""}`}
                                        aria-current="page" href="#">{a.name}</button>
                            </li>
                        })}
                    </ul>
                </div>
            </nav>
            <div className="container mt-3">
                {React.createElement(activeComponent.find(a=>a.active).component)}
            </div>
        </>
    );
}

export default App;
