import { useState,useEffect } from "react";

const useOnlineStatus=()=>{
    const [onlineStatus,setOnlineStatus]=useState(true);
    useEffect(()=>{
        addEventListener("offline", (event) => {
            setOnlineStatus(false);
        });
    },[]);
    return onlineStatus;

}

export default useOnlineStatus;