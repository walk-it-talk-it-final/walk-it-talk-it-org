import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { MyProfile } from "../components/MyProfile";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const { loginUser } = useAuth();

  useEffect(() => {
    const updateUserProfile = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/${loginUser.id}`,
          {
            headers: {
              Authorization: loginUser.token,
            },
          },
        );
        console.log(res.data);
        setUserProfile(res.data.payload);
      } catch (err) {
        console.error(err);
      }
    };

    updateUserProfile();
  }, [loginUser.id]);

  return <>{userProfile && <MyProfile user={userProfile} />}</>;
};

export default Profile;
