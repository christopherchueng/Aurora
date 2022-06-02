import { useState, useEffect } from "react";
import { Route, Switch, useParams } from "react-router-dom";
import CreateTrackForm from "./CreateTrackForm";
import UpdateTrackForm from "./UpdateTrackForm";
import TrackIdPage from "./TrackIdPage";
import { useDispatch, useSelector } from "react-redux";

const Tracks = () => {
    const tracks = useSelector(state => state.track.entries)
    const [openEdit, setOpenEdit] = useState(true);
    const [saveChanges, setSaveChanges] = useState(true)

    return (
        <>
            <Switch>
                <Route path='/upload'>
                    <CreateTrackForm />
                </Route>
                <Route path='/tracks/:trackId'>
                    {openEdit
                        ? <UpdateTrackForm tracks={tracks} />
                        : <TrackIdPage tracks={tracks}/>

                    }
                </Route>

            </Switch>
        </>
    )
}

export default Tracks;
