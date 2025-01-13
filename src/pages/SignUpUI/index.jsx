import styles from "./SignUp.module.css";
import { Link, useNavigate } from "react-router";
import supabase from "../../supabase/client";
import { Toaster, toast } from 'sonner';


export default function SignUp() {
  const navigate = useNavigate();
  const handleSubmitted = async (event) => {
    event.preventDefault();
    const formRegister = event.currentTarget;
    const { email, password, username } = Object.fromEntries(new FormData(formRegister));
    // console.log(objFromInputs)
    try {
      const {  error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });
      if (error) {
        toast.error('Signed Up Failed!')
      } else {
        toast.success('Signed Up Success')
        await new Promise((resolve) => setTimeout(resolve, 2000))
        formRegister.reset();
        navigate("/");
      }
    } catch (error) {
      alert(error);
    }
  };



  return (
    <div className={styles.containerForm}>
      <form onSubmit={handleSubmitted} className={styles.form}>
        <div className={styles.containerInput}>
          <div className={styles.containerTitle}>
            <p>
              <strong>Create Account</strong>
            </p>
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
              placeholder="Email"
              name="email"
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label
            htmlFor="username"
            className={styles.inputLabel}
          ></label>
          <div className={styles.inputGroup}>
            <input
              type="text"
              id="username"
              className="form-control"
              required
              placeholder="Username"
              name="username"
            />
          </div>
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
            Sign Up
          </button>
        <Toaster richColors />
        </div>


        <div className={styles.containerGoToLogin}>
          <p>
            Already have an account?
            <Link to="/login" className={styles.link}>
              {" "}
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
