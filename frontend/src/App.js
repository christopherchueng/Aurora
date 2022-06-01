import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
// import SplashPage from "./components/SplashPage";
import DiscoverPage from "./components/DiscoverPage";
import CreateTrackForm from "./components/Tracks/CreateTrackForm";
// import TrackIdPage from './components/Tracks/TrackIdPage'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className='app'>
      <title>Aurora</title>
      <Navigation isLoaded={isLoaded} />
      <Switch>
        <Route exact path='/'>
          {/* <SplashPage /> */}
        </Route>
        <Route path='/discover'>
          <DiscoverPage />
        </Route>
        <Route path='/upload'>
          <CreateTrackForm />
        </Route>
        <Route path={'/tracks/:trackId'}>
          {/* <TrackIdPage /> */}
        </Route>

      </Switch>
    </div>
  );
}

export default App;
