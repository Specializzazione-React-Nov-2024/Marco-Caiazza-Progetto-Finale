import styles from "./AppProfile.module.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import supabase from "../supabase/client";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Loading from "../components/Loading";
import UseProfile from "../hooks/useProfile";
import { getAvatarUrl } from "../utils/getAvatarUrl";
import { useContext, useEffect, useState } from "react";
import SessionContext from "../context/SessionContext";
import { Link, useParams } from "react-router";

export default function AppProfile() {
  const { loading, username, avatar_url } = UseProfile();
  const session = useContext(SessionContext);
  const [fav, setFav] = useState([]);
  const [prova, setProva] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [messages, setMessages] = useState([]);

  // Legge i favoriti
  async function readFav() {
    let { data: Favourites, error } = await supabase
      .from("Favourites")
      .select(`*`)
      .eq("profile_id", session.user.id);

    if (error) {
      console.log(error);
    }
    console.log("Favourites:", Favourites);
    setFav(Favourites);
    console.log("fav", fav);
  }

  // legge i commenti
  async function readMessages() {
    try {
      const { data: Messages, error } = await supabase
        .from("Messages")
        .select("*")
        .eq("profile_id", session.user.id);

      if (error) {
        console.error(error);
      } else {
        console.log("Messages:", Messages);
        setMessages(Messages);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }


  // Montaggio funzioni fav e commenti
  useEffect(() => {
    readFav();
    readMessages();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={`col-12 ${styles.container}`}>
      <div className="row">
        <div className={`${styles.containerAllProfile}`}>
          <div className={styles.containerProfile}>
            <Card style={{ width: "65rem" }} className={styles.cardAccount}>
              <Card.Body>
                <Card.Title>
                  <h1>
                    <strong>WELCOME BACK {username.toUpperCase()}</strong>
                  </h1>
                </Card.Title>
              </Card.Body>
              <Card.Img
                variant="top"
                src={avatar_url && getAvatarUrl(avatar_url)}
                alt="image profile"
                className={styles.cardImg}
              />
                <div>
                <Card.Body>
                <div className={styles.favMovieAccount}>
                <h4><strong>Username: {username}</strong></h4>
                </div>
                </Card.Body>
              </div>
              <div>
                <Card.Body>
                  <h5><strong>My favourites films:</strong></h5>
                  {fav && fav.length > 0 ? (
                    fav.map((fav) => (
                      <div className={styles.favMovieAccount} key={fav.id}>
                        <Link
                          className={styles.linkFavourites}
                          to={`/movie/${fav.movie_name}/${fav.movie_id}`}
                        >- {fav.movie_name}
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="">
                      <p className="px-3">No favourites found..</p>
                    </div>
                  )}
                </Card.Body>
              </div>
              <div>
                <Card.Body>
                  <h5><strong>My Reviews:</strong></h5>
                  {messages && messages.length > 0 ? (
                    messages.map((message) => (
                      <div className={styles.reviewMessage} key={message.id}>
                        <h6><strong>Date: {message.created_at.split("T")[0]}</strong></h6>
                          <h6><strong>Review: 
                          <Link
                            className={styles.linkReview}
                            to={`/movie/${message.movie_name}/${message.movie_id}`}
                            >
                          {message.content.charAt(0).toUpperCase() +
                            message.content.slice(1)}
                          </Link></strong>
                            </h6>
                      </div>
                    ))
                  ) : (
                    <div>
                      <p className="px-3">No reviews found..</p>
                    </div>
                  )}
                </Card.Body>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
