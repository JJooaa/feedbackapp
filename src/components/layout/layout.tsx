import React, { useState } from "react";
import "../../styles/layout.scss";
import hamburger from "../../assets/shared/mobile/icon-hamburger.svg";
import Menu from "../Menu/Menu";
import close from "../../assets/shared/mobile/icon-close.svg";
import Button from "../Button/Button";

const Layout: React.FC = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const onHamburgerClick = () => {
        setIsMenuOpen((prevState) => !prevState);
    };

    return (
        <>
            <header className="header">
                <div>
                    <h1>Frontend Mentor</h1>
                    <h2>Feedback Board</h2>
                </div>
                <img
                    src={isMenuOpen === false ? hamburger : close}
                    alt="hamburger menu"
                    onClick={onHamburgerClick}
                />
            </header>
            <div className="secondheader">
                <p>Sort by :</p>
                <Button text="+ Add Feedback" />
            </div>
            <main className="main">{children}</main>
            {isMenuOpen && <Menu />}
        </>
    );
};

export default Layout;
