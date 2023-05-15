import { getCurrentUser } from "@/utils/auth";
import { supabase } from "@supabase/auth-ui-shared";
import { useEffect, useState } from"react";

const useUser = () => {
    const [user, setUser] = useState(0);
    const [error, setError] = useState(0);
    const [fullyLoaded, setFullyLoaded] = useState(false);

    const getUser = async () => {
        setError(0);
        setUser(0);
        setFullyLoaded(false);

        const currentUser = await getCurrentUser();

        setFullyLoaded(true);
        if(!currentUser) {
            setUser(null);
            return;
        }
        setUser(currentUser.data);
    }

    supabase.auth.onAuthStateChange((event, session) => {
        if(["SIGNED_IN", "SIGNED_OUT"].includes(event)) {
            getUser();
        }
    })

    useEffect(() => {
        getUser();
    }, []);

    return {
        user,
        error,
        fullyLoaded,
        refreshUser: getUser,
    };
};

export default useUser;