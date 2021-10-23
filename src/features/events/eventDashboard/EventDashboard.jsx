import React, {useEffect} from 'react';
//import {sampleData} from '../../../app/api/sampleData.js';
import {Grid} from 'semantic-ui-react';
import EventList from './EventList';
//import EventForm from '../eventForm/EventForm';
import { useDispatch, useSelector } from 'react-redux';
//import LoadingComponent from '../../../app/layout/LoadingComponent.jsx';
import EventListItemPlaceholder from './EventListItemPlaceholder';
import EventFilters from './EventFilters.jsx';
//import getEventsFromFirestore, { listenToEventsFromFirestore } from '../../../app/firestore/firestoreService.js';
import { listenToEvents } from '../eventActions.js';
//import { asyncActionError, asyncActionFinish, asyncActionStart } from '../../../app/async/asyncReducer.js';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection.js';
import {listenToEventsFromFirestore } from '../../../app/firestore/firestoreService.js';

// array functions
const EventDashboard  = ({formOpen,setFormOpen, selectEvent, selectedEvent})  => {
    //const [events,setEvents] = useState(sampleData);
    const dispatch = useDispatch();
    const {events} = useSelector(state => state.event);
    const {loading} = useSelector(state => state.async);
    
    useFirestoreCollection({
        query: () => listenToEventsFromFirestore(),
        data: events => dispatch(listenToEvents(events)),
        deps: [dispatch],
    })
    /*useEffect(()=>{
        dispatch(asyncActionStart())
        const unsubscribe = getEventsFromFirestore({
            next: snapshot => {
                dispatch(listenToEvents(snapshot.docs.map(docSnapshot => docSnapshot.data())));
                dispatch(asyncActionFinish())
            },
            error: error => dispatch(asyncActionError(error)),
            complete: () => console.log('you will never see this message')
        })
        return unsubscribe
    },[dispatch])*/
    /*function handleCreateEvent(event) {
        setEvents([...events, event])
    }*/

    /*function handleUpdateEvent(updatedEvent) {
        setEvents(events.map(evt => evt.id === updatedEvent.id ? updatedEvent : evt));
        selectEvent(null);
        setFormOpen(false);
    }*/

    function handleDeleteEvent(eventId) {
        //setEvents(events.filter(evt => evt.id !== eventId));
    }



    return (
        <Grid>
            <Grid.Column width={10}>
                {loading &&
                <>
                <EventListItemPlaceholder />
                <EventListItemPlaceholder />
                </>
                }
                <EventList events={events} selectEvent={selectEvent} deleteEvent={handleDeleteEvent} />
            </Grid.Column>
            <Grid.Column width={6}>
                <EventFilters />
            </Grid.Column>
        </Grid>
    )
}

export default EventDashboard;