import { useState, useEffect } from "react";
import { Route, useParams } from "react-router-dom";
import CreateTrackForm from "./CreateTrackForm";
import TrackIdPage from "./TrackIdPage";
import { useDispatch, useSelector } from "react-redux";

const Tracks = () => {
    const tracks = useSelector(state => state.track.entries)
    console.log('in tracks right now to see state', tracks)

    return (
        <>
            <Route path='/upload'>
                <CreateTrackForm />
            </Route>
            <Route path='/tracks/:trackId'>
              <TrackIdPage tracks={tracks}/>
            </Route>
        </>
    )
}

export default Tracks;
