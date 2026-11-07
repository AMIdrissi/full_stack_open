const NotificationBox = ({ message, isError }) => {
  const notificationStyle = {
    color: isError ? "red" : "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  if (message === null) {
    return null;
  } else {
    return (
      <p className="notfication-box" style={notificationStyle}>
        {message}
      </p>
    );
  }
};

export default NotificationBox;
