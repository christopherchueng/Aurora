import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div>
      <title>Aurora</title>
      {/* <link rel="aurora-icon" type="image/x-icon" href="/images/favicon.ico" /> */}
      <Navigation isLoaded={isLoaded} />
    </div>
  );
}

export default App;
