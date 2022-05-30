function ErrorMessage ({ error }) {
    return (
      <p className="error-message">
          {error ? error : undefined}
      </p>
    )
  }

  export default ErrorMessage;
