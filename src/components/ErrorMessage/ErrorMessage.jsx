const ErrorMessage = ({ value }) => {
  return value[1] === 'No results found' ? (
    <p style={{ textAlign: 'center' }}>
      Whoops, no results found! Please try changing the search text!
    </p>
  ) : (
    <p style={{ textAlign: 'center' }}>
      Whoops, something went wrong! Please try reloading this page!
    </p>
  );
};

export default ErrorMessage;
