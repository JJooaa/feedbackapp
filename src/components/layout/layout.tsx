import React, { useEffect, useState } from "react";
import "../../styles/layout.scss";
import hamburger from "../../assets/shared/mobile/icon-hamburger.svg";
import Menu from "../Menu/Menu";
import close from "../../assets/shared/mobile/icon-close.svg";
import Button from "../Button/Button";

interface Props {
    filteredData: {}[];
    staticData: {}[];
    setFilteredData: React.Dispatch<React.SetStateAction<{}[]>>;
}

const Layout: React.FC<Props> = ({
    children,
    setFilteredData,
    staticData,
    filteredData,
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const onHamburgerClick = (): void => {
        setIsMenuOpen((prevState) => !prevState);
    };

    const changeSortBy = (value: string): void => {
        if (value === "Most Upvotes") {
            setFilteredData(
                staticData.sort((a: any, b: any) => b.upvotes - a.upvotes)
            );
        }
        if (value === "Least Upvotes") {
            setFilteredData(
                staticData.sort((a: any, b: any) => a.upvotes - b.upvotes)
            );
        }
        if (value === "Most Comments") {
            let undefinedComments = staticData.filter(
                (item: any) => item.comments === undefined
            );
            let definedComments = staticData.filter(
                (item: any) => item.comments !== undefined
            );
            setFilteredData([
                ...definedComments.sort(
                    (a: any, b: any) => b.comments.length - a.comments.length
                ),
                ...undefinedComments,
            ]);
        }
    };

    return (
        <>
            <header className="header">
                <button onClick={() => changeSortBy("Most Upvotes")}>
                    Test
                </button>
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
                <Button text="+ Add Feedback" color="#AD1FEA" />
            </div>
            <main className="main">{children}</main>
            {isMenuOpen && <Menu />}
        </>
    );
};

export default Layout;
