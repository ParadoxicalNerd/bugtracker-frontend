import { get } from "js-cookie";

export default () => {
    const sessionDetails = JSON.parse(get("session-details") || "{}");
    // console.log(get("session-details"));
    // if (sessionDetails.loggedIn == true) {
    //     const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/loggedIn`);
    //     const parsed_response = await response.json();
    //     return parsed_response.loggedIn;
    // }
    return sessionDetails.loggedIn;
};
