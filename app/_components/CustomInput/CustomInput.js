const CustomInput = ({ label, type, placeholder, name, value, onChange, required }) => {
    return (
        <div className="my-4"> {/* Adjusted margin for spacing */}
            <label className="block font-semibold text-gray-700 mb-1" htmlFor={name}>
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full p-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-150 ease-in-out shadow-sm "
            />
        </div>
    );
};

export default CustomInput;
