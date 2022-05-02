import { useState } from "react";
import TagsList from "./TagsList";

export default function InterestDropdown(props) {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {isOpen
                ? <div>
                    <div className="has-text-black has-text-weight-semibold mb-3" style={{ cursor: "pointer" }} onClick={() => setIsOpen(!isOpen)}>
                        <span className="mr-1">{props.name}</span>
                        <span className="icon">
                            <i className="fas fa-chevron-up"></i>
                        </span>
                        <TagsList category={props.name} />
                    </div>
                </div>
                :
                <div className="has-text-black has-text-weight-semibold mb-3" style={{ cursor: "pointer" }} onClick={() => setIsOpen(!isOpen)}>
                    <span className="mr-1">{props.name}</span>
                    <span className="icon">
                        <i className="fas fa-chevron-down"></i>
                    </span>
                </div>
            }
        </>
    )
}