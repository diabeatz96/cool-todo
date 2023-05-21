"use client";

import { logoutUser } from "@/utils/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Logout = () => {
  const [error, setError] = useState(undefined);
  const router = useRouter();
  
  useEffect(() => {
    const innerLogout = async () => {
      const { success, error } = await logoutUser();
      if (!success) {
        setError(error.message);
      }
      setTimeout(() => router.replace("/"), error ? 4000 : 2000);
    };
    innerLogout();
  }, []);

  return (
    <div className="barge my-10">
      <p>Logging out, please wait...</p>
      {error && <p style={{ color: "#C20000" }}>Error: {error}</p>}
    </div>
  );
};

export default Logout;