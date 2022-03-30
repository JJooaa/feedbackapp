import React, { useEffect, useState } from "react";
import "./layout.scss";
import hamburger from "../../assets/shared/mobile/icon-hamburger.svg";
import Menu from "../Menu/Menu";
import close from "../../assets/shared/mobile/icon-close.svg";
import Button from "../Button/Button";
import { ReactComponent as DownArrow } from "../../assets/shared/icon-arrow-down.svg";
import { ReactComponent as UpArrow } from "../../assets/shared/icon-arrow-up.svg";
import checkIcon from "../../assets/shared/icon-check.svg";

interface Props {
    staticData: {}[];
    setFilteredData: React.Dispatch<React.SetStateAction<{}[]>>;
    filteredData: any;
}

const Layout: React.FC<Props> = ({
    children,
    setFilteredData,
    staticData,
    filteredData,
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isSortByOpen, setIsSortByOpen] = useState<boolean>(false);
    const [currentOption, setCurrentOption] = useState<string>("Most Upvotes");

    const onHamburgerClick = (): void => {
        setIsMenuOpen((prevState) => !prevState);
    };

    const changeSortBy = (value: string): void => {
        if (value === "Most Upvotes") {
            setCurrentOption("Most Upvotes");
            let mostUpvotes = staticData.sort(
                (a: any, b: any) => b.upvotes - a.upvotes
            );
            setFilteredData((prevState) => [...(prevState = mostUpvotes)]);
        }
        if (value === "Least Upvotes") {
            setCurrentOption("Least Upvotes");
            let leastUpvotes = staticData.sort(
                (a: any, b: any) => a.upvotes - b.upvotes
            );
            setFilteredData((prevState) => [...(prevState = leastUpvotes)]);
        }
        if (value === "Most Comments") {
            setCurrentOption("Most Comments");
            let undefinedComments = staticData.filter(
                (item: any) => item.comments === undefined
            );
            let definedComments = staticData.filter(
                (item: any) => item.comments !== undefined
            );
            let sortDefined = definedComments
                .sort((a: any, b: any) => b.comments.length - a.comments.length)
                .concat(undefinedComments);
            setFilteredData((prevState) => [...(prevState = sortDefined)]);
        }
    };

    const handleSortBy = (): void => {
        setIsSortByOpen((prevState) => !prevState);
    };

    const options: Array<string> = [
        "Most Upvotes",
        "Least Upvotes",
        "Most Comments",
        "Least Comments",
    ];

    useEffect(() => {
        changeSortBy("Most Upvotes");
    }, []);

    const renderCheckIcon = (item: {}): JSX.Element | null => {
        return currentOption === item ? (
            <img src={checkIcon} className="check-icon" alt="checkicon" />
        ) : null;
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
                <p>
                    Sort by :
                    <span onClick={handleSortBy}>
                        {currentOption}
                        {isSortByOpen === false ? (
                            <DownArrow className="arrow" />
                        ) : (
                            <UpArrow className="arrow" />
                        )}
                    </span>
                </p>
                {isSortByOpen && (
                    <ul>
                        {options.map((item, index: number) => (
                            <li
                                key={index}
                                onClick={() => {
                                    changeSortBy(item);
                                    handleSortBy();
                                }}
                            >
                                {item}
                                {renderCheckIcon(item)}
                            </li>
                        ))}
                    </ul>
                )}

                <Button
                    text="+ Add Feedback"
                    color="#AD1FEA"
                    link="/feedbacks/create"
                />
            </div>
            <main className="main">{children}</main>
            {isMenuOpen && <Menu filteredData={filteredData} />}
        </>
    );
};

export default Layout;
