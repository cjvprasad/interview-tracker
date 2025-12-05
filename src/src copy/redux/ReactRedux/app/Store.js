import { legacy_createStore as createStore } from "redux";
import reducer from "../reducer/reducer";

export const store = createStore(reducer);
