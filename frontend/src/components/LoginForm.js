import { TreeIcon } from "../assets/Icons";
import styles from "../assets/home.module.css";

const LoginForm = ({
  handleLogin,
  username,
  password,
  setUsername,
  setPassword,
  message,
}) => (
  <section className="vh-100 gradient-custom bg-light">
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card p-5 shadow-lg p-3 mb-5 bg-white rounded border border-secondary">
            <h2 className="fw-bold mb-2 text-uppercase text-center">
              Tervetuloa! <TreeIcon />
            </h2>
            <p className="text-black-50 mb-5 text-center">
              {message ? (
                <label className={styles.loginErrorMessage}>
                  {message.text}!
                </label>
              ) : (
                "Syötä käyttäjätunnus ja salasana."
              )}
            </p>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Käyttäjätunnus</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Salasana</label>
                <input
                  type="password"
                  required
                  className="form-control"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Kirjaudu sisään
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default LoginForm;
