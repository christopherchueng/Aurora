import ErrorMessage from './ErrorMessage';

const FormRowInput = ({ classTag, skipErrors = false, children}) => {
    const inputs = (children instanceof Array) ? (
        <div className={classTag}>
            {children.map((Component, i) => {
                const { error, hasSubmitted, name } = Component.props;
                return (
                    <div className='form-row' key={name}>
                        {Component}
                        {(!skipErrors || !skipErrors(index)) ? (
                            <ErrorMessage error={error} hasSubmitted={hasSubmitted} />
                        ) : ""}
                    </div>
                )
            })}
        </div>
    ) :
    (
        <div className='form-row'>
            {children}
            {!skipErrors ? (
                <ErrorMessage error={children.props.error}
                    hasSubmitted={children.props.hasSubmitted} />
            ) : ""}
        </div>
    )
    return inputs
}

export default FormRowInput;
