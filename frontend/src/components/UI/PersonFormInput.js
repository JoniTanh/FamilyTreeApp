import styles from "../../assets/personForm.module.css";

const PersonFormInput = ({
  name,
  label,
  value,
  onChange,
  infoText,
  ...props
}) => {
  return (
    <>
      <div>
        <div>{label}:</div>
        <div>
          <input
            name={name}
            value={value}
            onChange={onChange}
            className={styles.input}
            {...props}
          />
        </div>
        {infoText && <div className={styles.infoText}>{infoText}</div>}
      </div>
    </>
  );
};

export default PersonFormInput;
