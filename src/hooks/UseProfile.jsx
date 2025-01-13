import { useState, useEffect, useContext } from "react";
import supabase from "../supabase/client";
import SessionContext from "../context/SessionContext";

export default function UseProfile() {
  const session = useContext(SessionContext);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function getProfile() {
      setLoading(true);
      if(!session) return;
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
          //   setWebsite(data.website)
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
      //   website,
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

  return {
    loading,
    setLoading,
    username,
    setUsername,
    avatar_url,
    setAvatarUrl
  }
}

