import styles from "./LoginUI.module.css";
import { Link } from "react-router";
import supabase from "../../supabase/client";
import { useNavigate } from "react-router";
import { Toaster, toast } from "sonner";

export default function LoginUI() {
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    const formLogin = event.currentTarget;
    const { email, password } = Object.fromEntries(new FormData(formLogin));
    console.log(email, password);
    // console.log(objFromInputs)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        toast.error("Login Failed!");
      } else {
        toast.success("Login Success");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        formLogin.reset();
        navigate("/");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={styles.containerForm}>
      <form onSubmit={handleSignIn} className={styles.form}>
        <div className={styles.containerInput}>
          <div className={styles.containerTitle}>
            <p>
              <strong>Sign into Your account</strong>
            </p>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label
            htmlFor="exampleInputEmail1"
            className={styles.inputLabel}
          ></label>
          <div className={styles.inputGroup}>
            <input
              type="email"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              className="form-control"
              required
              placeholder="Username"
              name="email"
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label
            htmlFor="exampleInputPassword1"
            className={styles.inputLabel}
          ></label>
          <input
            type="password"
            id="exampleInputPassword1"
            className="form-control"
            placeholder="Password"
            required
            name="password"
          />
        </div>

        <div className={styles.containerBtn}>
          <button type="submit" className={styles.btnSubmit}>
            Login
          </button>
          <Toaster richColors />
        </div>

        <div className={styles.containerGoToSignUp}>
          <p>
            Don't have an account?
            <Link to="/signUp" className={styles.link}>
              {" "}
              Create
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
