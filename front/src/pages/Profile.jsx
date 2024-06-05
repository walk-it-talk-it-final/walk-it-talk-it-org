import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { MyProfile } from "../components/MyProfile";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
    const token = localStorage.getItem("token");
    const userProfile = jwtDecode(token);

    return (
        <>
            {userProfile &&
                <MyProfile user={userProfile} />
            }
        </>
    );
}

export default Profile;