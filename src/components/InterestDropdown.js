import { useState } from "react";

export default function InterestDropdown(props) {

    const [isOpen, setIsOpen] = useState(0);

    if (isOpen) {
        return (
            <div className="has-text-black has-text-weight-medium mb-3" style={{ cursor: "pointer" }} onClick={setIsOpen}>
                <span className="mr-1">{props.name}</span>
                <span className="icon">
                    <i className="fas fa-chevron-up"></i>
                </span>
            </div>
        )
    } else {
        return (
            <div className="has-text-black has-text-weight-medium mb-3" style={{ cursor: "pointer" }} onClick={setIsOpen}>
                <span className="mr-1">{props.name}</span>
                <span className="icon">
                    <i className="fas fa-chevron-down"></i>
                </span>
            </div>
        )
    }
}