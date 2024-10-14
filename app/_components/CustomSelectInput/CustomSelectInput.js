import React from 'react';

const CustomSelectInput = ({ label, options, value, onChange, required }) => {
    return (
        <div className="input-container">
            <label>{label}</label>
            <select value={value} onChange={onChange} required={required} className="input-field">
                <option value="">Select</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CustomSelectInput;
