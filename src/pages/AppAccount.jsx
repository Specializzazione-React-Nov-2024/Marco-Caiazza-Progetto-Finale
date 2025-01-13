import styles from "../pages/AppAccount.module.css";
import { useState, useEffect, useContext } from "react";
import supabase from "../supabase/client";
import SessionContext from "../context/SessionContext";
import { Toaster, toast } from "sonner";
import "bootstrap/dist/css/bootstrap.min.css";
import AvatarUI from "../components/AvatarUI";

export default function AppAccount() {
  const session = useContext(SessionContext);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function getProfile() {
      setLoading(true);
      const { user } = session;

      const { data, error } = await supabase
        .from("profiles")
        .select(`username, avatar_url`)
        .eq("id", user.id)
        .single();

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username);
          setAvatarUrl(data.avatar_url);
        }
      }

      setLoading(false);
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  async function updateProfile(event, avatarUrl) {
    event.preventDefault();

    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      username,
      avatar_url: avatarUrl,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      toast.error(error.message);
      alert(error.message);
    } else {
      toast.success("User Updated!");
      setAvatarUrl(avatarUrl);
    }
    setLoading(false);
  }

  useEffect(() => {
    console.log(avatarUrl);
  }, []);

  return (
<div className="d-flex justify-content-center align-items-center vh-100">
  <div className={`container ${styles.containerAllForm}`}>
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="">
          <div className={`card-body ${styles.containerForm}`}>
            <form onSubmit={updateProfile}>
              
              <div className="d-flex justify-content-center mb-4">
                <AvatarUI
                  url={avatarUrl}
                  size={150}
                  onUpload={(event, url) => {
                    updateProfile(event, url);
                  }}
                />
              </div>
        
              <div className={`mb-3 ${styles.inputGroup}`}>
                <label htmlFor="email" className="form-label">
                <strong>Email</strong>
                </label>
                <input
                  id="email"
                  type="text"
                  value={session.user.email}
                  className="form-control"
                  disabled
                />
              </div>

              <div className={`mb-3 ${styles.inputGroup}`}>
                <label htmlFor="username" className="form-label">
                  <strong>Username</strong>
                </label>
                <input
                  id="username"
                  type="text"
                  className="form-control"
                  required
                  value={username || ""}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className={`d-flex justify-content-between align-items-center${styles.containerBtn}`}>
                <button
                  className={styles.btnUpdate}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Loading ..." : "Update"}
                </button>

                <button
                  className={styles.btnUpdate}
                  type="button"
                  onClick={() => supabase.auth.signOut()}
                >
                  Sign Out
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}
