// a machanism how to protect pages / route
// protection mechanism
// protected content, this is
// conditionally render

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authenticationNeeded = true }) {
  const navigate = useNavigate();
  const [loader, SetLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  // useEffect will decide wether to update , or send in which route
  useEffect(() => {
    // if (authStatus ===true){
    // navigate("/")
    // } else if (authStatus false) {
    // navigate("/login")
    // }

    // TODO: make it more easy to understand
    // Case 1: Page requires authentication (authentication = true)

    if (authenticationNeeded && authStatus !== authenticationNeeded) {
      navigate("/login"); // Redirect to login page if not authenticated
    }
    // Case 2: Page should not be accessible to authenticated users (authentication = false)
    else if (!authenticationNeeded && authStatus !== authenticationNeeded) {
      navigate("/"); // Redirect to homepage if already authenticated
    }
    SetLoader(false); // Once the decision is made, stop showing the loading state
  }, [authStatus, navigate, authenticationNeeded]);
  /*
  Summary
**Authentication Required: If the page needs the user to be logged in but they aren’t, redirect them to the login page.
**No Authentication Needed: If the page should only be seen by logged-out users but they’re logged in, redirect them to the homepage. */

  return loader ? <h1>Loading...</h1> : <> {children} </>;
}
