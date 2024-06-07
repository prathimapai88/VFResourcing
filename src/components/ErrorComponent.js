import { useRouteError } from "react-router-dom";

const ErrorComponent=()=>{
    const err=useRouteError();
    console.log('err',err);
    return(<div>
        Error Oops !!! Something went wrong {err.status} {err.statusText}
    </div>)
}

export default ErrorComponent;