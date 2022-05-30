const TextInput = ({ name, label, onChange, error, value, placeholder }) => {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input
                className={(error) ? 'input-error' : undefined}
                name={name}
                id={name}
                type='text'
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </>
    )
}

export default TextInput;
