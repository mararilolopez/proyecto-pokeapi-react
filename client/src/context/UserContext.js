import { createContext } from "react";

const authContext = createContext({
  username: null,
  school: null,
  year: null,
});
export default authContext;
