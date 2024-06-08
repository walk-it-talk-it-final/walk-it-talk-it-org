import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { MyProfile } from "../components/MyProfile";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginUser) {
      navigate("/signin");
      return;
    }

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

        if (!res.data.payload) {
          navigate("/signin");
        } else {
          setUserProfile(res.data.payload);
        }
        console.log(res.data);
      } catch (err) {
        console.error(err);
        navigate("/signin");
      }
    };

    updateUserProfile();
  }, [loginUser, navigate]);

  return <>{userProfile && <MyProfile user={userProfile} />}</>;
};

export default Profile;
