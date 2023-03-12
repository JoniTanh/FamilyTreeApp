import "../../assets/notification.css";

const Notification = ({ message, hasErrors, type }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="container">
      <div
        className={`${
          hasErrors || type === "delete"
            ? "error"
            : type === "changed"
            ? "edit"
            : "success"
        }Message`}
      >
        {message}
      </div>
    </div>
  );
};

export default Notification;
