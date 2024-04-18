import React from "react";

interface InputProps {
    label: string,
    name: string,
    value: string,
    error: string, 
    type: string,
    handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void // Changed the type of handleOnChange function
}

const Input: React.FC<InputProps> = (props) => {
    return (
        <div>
            <label className="block" htmlFor={props.label}>{props.label}</label>
            <input
                type={props.type}
                placeholder={props.label}
                id={props.label}
                name={props.name}
                value={props.value}
                onChange={props.handleOnChange} // Changed to props.handleOnChange
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            {props.error && <p className="text-red-500 text-xs mt-1">{props.error}</p>}
        </div>
    );
}

export default Input;
