import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import CreateTrackForm from "./CreateTrackForm";
import UpdateTrackForm from "./UpdateTrackForm";
import TrackIdPage from "./TrackIdPage";
import { useSelector } from "react-redux";
import { useEditTrackContext } from "../../context/EditTrackContext";

const Tracks = () => {
    const tracks = useSelector(state => state.track.entries)
    const { openEdit } = useEditTrackContext();

    return (
        <>
            <Switch>
                <Route path='/upload'>
                    <CreateTrackForm />
                </Route>
                <Route path='/tracks/:trackId'>
                    {/* If edit button is clicked: 2 options:
                    If save changes is clicked, Update the track. Otherwise, */}
                    {openEdit
                        ? <UpdateTrackForm tracks={tracks} />
                        : <TrackIdPage tracks={tracks} />
                    }
                </Route>
            </Switch>
        </>
    )
}

export default Tracks;
