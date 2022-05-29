import ErrorMessage from './ErrorMessage';

/*
Takes in child Input component and ErrorMessage component.
Wrap both components into a div called 'form-row.'

*/
const FormRowInput = ({ classTag, skipErrors = false, children}) => {
    const inputs = (children instanceof Array) ? (
        <div className={classTag}>
            {children.map((Component, i) => {
                const { error, hasSubmitted, name } = Component.props;
                return (
                    <div className='form-row' key={name}>
                        {/* child input component */}
                        {Component}
                        {/* ErrorMessage component.
                        */}
                        {(!skipErrors || !skipErrors(i)) ? (
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
