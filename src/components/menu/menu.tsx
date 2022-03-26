import React from "react";
import "../../styles/menu.scss";
import { Link } from "react-router-dom";

const Menu: React.FC = () => {
    return (
        <div className="wrapper">
            <nav>
                <ul className="features-ul">
                    <li>All</li>
                    <li>UI</li>
                    <li>UX</li>
                    <li>Enhancement</li>
                    <li>Bug</li>
                    <li>Feature</li>
                </ul>
                <div className="roadmap">
                    <div className="link-wrapper">
                        <h1>Roadmap</h1>
                        <Link to="/roadmap">View</Link>
                    </div>
                    <ul className="roadmap-status">
                        <li>
                            Planned<span>1</span>
                        </li>

                        <li>
                            In-progress<span>2</span>
                        </li>
                        <li>
                            Live<span>3</span>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Menu;
