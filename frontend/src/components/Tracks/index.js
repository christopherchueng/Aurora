import { useState, useEffect } from "react";
import { Route, Switch, useParams } from "react-router-dom";
import CreateTrackForm from "./CreateTrackForm";
import UpdateTrackForm from "./UpdateTrackForm";
import TrackIdPage from "./TrackIdPage";
import { useDispatch, useSelector } from "react-redux";
import { useEditTrackContext } from "../../context/EditTrackContext";

const Tracks = () => {
    const tracks = useSelector(state => state.track.entries)
    const { openEdit, setOpenEdit, saveChanges, setSaveChanges } = useEditTrackContext();

    useEffect(() => {
        setOpenEdit(false);
    }, [])

    useEffect(() => {
        setSaveChanges(true);

    }, [])

    return (
        <>
            <Switch>
                <Route path='/upload'>
                    <CreateTrackForm />
                </Route>
                <Route path='/tracks/:trackId'>
                    {openEdit
                        ? saveChanges
                            ? <UpdateTrackForm tracks={tracks} />
                            : setOpenEdit(false) && setSaveChanges(false)
                        : <TrackIdPage tracks={tracks}/>

                    }
                </Route>

            </Switch>
        </>
    )
}

export default Tracks;
