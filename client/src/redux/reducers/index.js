import { combineReducers } from "redux";
// import alert from "./alert";
import auth from "./auth";
import forum from './forum'
import loading from './loading'
import classroom from './classroom'
// import profile from "./profile";
// import post from "./post";

export default combineReducers({
  // alert,
  auth,
  forum,
  loading,
  classroom,
  // forum
  // profile,
  // post,
});
