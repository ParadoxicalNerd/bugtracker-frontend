import { get } from "js-cookie";

export default () => {
    const sessionDetails = JSON.parse(get("session-details") || "{}");
    return sessionDetails.username;
};
