const TextareaInput = ({ name, label, error, value, onChange, hasSubmitted, placeholder }) => {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <textarea
                className={(hasSubmitted && error) ? 'input-error' : undefined}
                name={name}
                id={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
        </>
    )
}

export default TextareaInput;
