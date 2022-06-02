import { useState, useEffect } from "react";
import { Route, Switch, useParams } from "react-router-dom";
import CreateTrackForm from "./CreateTrackForm";
import UpdateTrackForm from "./UpdateTrackForm";
import TrackIdPage from "./TrackIdPage";
import { useDispatch, useSelector } from "react-redux";
import { useEditTrackContext } from "../../context/EditTrackContext";

const Tracks = () => {
    const tracks = useSelector(state => state.track.entries)
    // const [openEdit, setOpenEdit] = useState(false)
    // const [saveChanges, setSaveChanges] = useState(true)
    const { openEdit, setOpenEdit, saveChanges, setSaveChanges } = useEditTrackContext();

    // // On mount, edit button is off.
    // useEffect(() => {
    //     setOpenEdit(false);
    // }, [])

    // // // On mount, changes are saved.
    // useEffect(() => {
    //     setSaveChanges(true);
    // }, [])

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
                        ? saveChanges
                            ? <UpdateTrackForm tracks={tracks} />
                            : setOpenEdit(false) && setSaveChanges(true)
                        : <TrackIdPage tracks={tracks} />

                    }
                </Route>

            </Switch>
        </>
    )
}

export default Tracks;
