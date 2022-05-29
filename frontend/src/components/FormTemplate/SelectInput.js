const SelectInput = ({ name, label, handleChange, value, options }) => {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <select
                name={name}
                id={name}
                value={value}
                onChange={handleChange}
            >
                <option value='' disabled>
                    {label}
                </option>
                {options.map(option => (
                    <option key={option}>{option}</option>
                ))}
            </select>
        </>
    )
}

export default SelectInput;
