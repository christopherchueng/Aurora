const TextInput = ({ name, label, handleChange, error, value, hasSubmitted, placeholder }) => {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input
                className={(hasSubmitted && error) ? 'input-error' : undefined}
                name={name}
                id={name}
                type='text'
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
            />
        </>
    )
}

export default TextInput;
