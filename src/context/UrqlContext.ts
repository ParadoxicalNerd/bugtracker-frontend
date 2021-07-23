import { createContext } from "react";

const UrqlContext = createContext({
    context: undefined,
} as {
    context: BodyInit | null | undefined;
});

export default UrqlContext;
