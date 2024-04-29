import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(
      "http://localhost:8080/api/auth/login",
      userCredential
    );
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    console.log(res);
  } catch (err) {
    console.error("Error during login:", err); // Log the error for debugging
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
