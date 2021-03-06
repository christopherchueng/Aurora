import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import CreateTrackForm from "./CreateTrackForm";
import UpdateTrackForm from "./UpdateTrackForm";
import TrackIdPage from "./TrackIdPage";
import { useSelector } from "react-redux";
import { useUpdateContext } from "../../context/UpdateContext";

const Tracks = () => {
    const tracks = useSelector(state => state.track.entries)
    const { openEditTrack } = useUpdateContext();

    return (
        <>
            <Switch>
                <Route path='/upload'>
                    <CreateTrackForm tracks={tracks}/>
                </Route>
                <Route path='/tracks/:trackId'>
                    {/* If edit button is clicked: 2 options:
                    If save changes is clicked, Update the track. Otherwise, */}
                    {openEditTrack
                        ? <UpdateTrackForm tracks={tracks} />
                        : <TrackIdPage tracks={tracks} />
                    }
                </Route>
            </Switch>
        </>
    )
}

export default Tracks;
