const TextareaInput = ({ name, label, handleChange, error, value, hasSubmitted, placeholder }) => {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <textarea
                className={(hasSubmitted && error) ? 'input-error' : undefined}
                name={name}
                id={name}
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
            />
        </>
    )
}

export default TextareaInput;
