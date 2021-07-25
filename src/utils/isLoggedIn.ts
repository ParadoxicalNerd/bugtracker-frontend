import { get } from "js-cookie";

export default () => {
    console.log(get("session-details"));
    const sessionDetails = JSON.parse(get("session-details") || "{}");
    return sessionDetails.loggedIn;
};
