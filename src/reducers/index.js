import { combinedReducers } from "redux";
import todos from "./todos";

export default combinedReducers({
    todos,
});