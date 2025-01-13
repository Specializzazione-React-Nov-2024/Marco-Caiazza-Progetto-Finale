import styles from "./RealtimeChatUI.module.css";
import supabase from "../../supabase/client";
import { useEffect, useState, useRef } from "react";
import Loading from "../Loading";
import { Link } from "react-router";

export default function RealtimeChatUI({
  movieId,
  session,
  handleMessageSubmit,
}) {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [loadingInitial, setLoadingInitial] = useState(false);

  console.log(session);

  const getInitialMessages = async () => {
    setLoadingInitial(true);
    try {
      const { data, error } = await supabase
        .from("Messages")
        .select()
        .range(0, 49)
        .eq("movie_id", movieId.id)
        .eq("profile_id", session.user.id);

      if (error) {
        setError(error.message);
      } else {
        setMessages(data);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoadingInitial(false);
    }
  };

  useEffect(() => {
    if (!movieId?.id || !session?.user?.id) {
      return;
    }
    getInitialMessages();

    const channel = supabase
      .channel("Messages")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Messages" },
        () => getInitialMessages()
      )
      .subscribe();
    //   };

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [movieId, session]);

  if (loadingInitial) {
    return <Loading />;
  }

  return (
    <div className={styles.containerAllChat}>
      <h4>
        <strong>Reviews:</strong>
      </h4>
      <div className={styles.containerChat}>
        {error && <article>{error}</article>}
        {messages &&
          messages.map((message) => (
            <article key={message.id} className={styles.articleChat}>
              <div className={styles.usernameDataChat}>
                <h5 className={styles.usernameChat}>
                  {message.profile_username}
                </h5>
                <p>{message.created_at.split("T")[0]}</p>
              </div>
              <div className={styles.containerMessageChat}>
                <small>
                  {message.content.charAt(0).toUpperCase() +
                    message.content.slice(1)}
                </small>
              </div>
            </article>
          ))}
      </div>
      {session ? (
        <div className={styles.containerMessageSubmit}>
          <form onSubmit={handleMessageSubmit}>
            <fieldset>
              <input type="text" name="message" placeholder="Chat..." />
              <input type="submit" value="Send" />
            </fieldset>
          </form>
        </div>
      ) : (
        <div className={styles.containerMessageSubmit}>
          <form onSubmit={handleMessageSubmit}>
            <fieldset>
              <p>
                To leave a comment{" "}
                <Link className={styles.messageLogin} to="/login">
                  Login
                </Link>{" "}
                or{" "}
                <Link className={styles.messageLogin} to="/signUp">
                  Sign Up.
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      )}
    </div>
  );
}
