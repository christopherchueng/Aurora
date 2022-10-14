import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage";
import DiscoverPage from "./components/DiscoverPage";
import CreateTrackForm from "./components/Tracks/CreateTrackForm";
import UpdateTrackForm from "./components/Tracks/UpdateTrackForm";
import Tracks from "./components/Tracks";
import ErrorPage from "./components/ErrorPage";
import Search from "./components/Search";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [color, setColor] = useState('')

  const path = useLocation().pathname

  useEffect(() => {
    path === '/' ? setColor('black') : setColor('#272727')
  }, [path])

  document.body.style.backgroundColor = color

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className='app'>
      <title>Aurora</title>
      <Navigation isLoaded={isLoaded} />
      <Switch>
        <Route exact path='/'>
          <SplashPage />
        </Route>
        <ProtectedRoute exact path='/discover'>
          <DiscoverPage />
        </ProtectedRoute>
        <ProtectedRoute path='/upload'>
          <CreateTrackForm />
        </ProtectedRoute>
        <Route exact path='/tracks/:trackId'>
          <Tracks />
        </Route>
        <ProtectedRoute exact path='/tracks/:trackId/edit'>
          <UpdateTrackForm />
        </ProtectedRoute>
        <Route path='/search'>
          <Search />
        </Route>
        <Route>
          <ErrorPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
