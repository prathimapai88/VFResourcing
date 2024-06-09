import { useState, useEffect } from "react";

const useOnlineStatus = (): boolean => {
    const [onlineStatus, setOnlineStatus] = useState<boolean>(true);

    useEffect(() => {
        const handleOffline = () => {
            setOnlineStatus(false);
        };

        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return onlineStatus;
};

export default useOnlineStatus;
