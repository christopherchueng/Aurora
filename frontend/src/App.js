import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage";
import DiscoverPage from "./components/DiscoverPage";
import CreateTrackForm from "./components/Tracks/CreateTrackForm";
import UpdateTrackForm from "./components/Tracks/UpdateTrackForm";
import Tracks from "./components/Tracks";
import ErrorPage from "./components/ErrorPage";import Search from "./components/Search";
;

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [color, setColor] = useState('')
  const sessionUser = useSelector(state => state.session.user)

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
        <Route path='/upload'>
          <CreateTrackForm />
        </Route>
        <Route path='/discover'>
          {sessionUser ? <DiscoverPage /> : <Redirect to='/' />}
        </Route>
        <Route exact path='/tracks/:trackId'>
          <Tracks />
        </Route>
        <Route exact path='/tracks/:trackId/edit'>
          <UpdateTrackForm />
        </Route>
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
