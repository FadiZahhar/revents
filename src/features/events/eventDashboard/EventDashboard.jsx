import React, {useState} from 'react';
import {sampleData} from '../../../app/api/sampleData.js';
import {Grid} from 'semantic-ui-react';
import EventList from './EventList';
import EventForm from '../eventForm/EventForm';
import { useSelector } from 'react-redux';
import LoadingComponent from '../../../app/layout/LoadingComponent.jsx';
import EventListItemPlaceholder from './EventListItemPlaceholder';

// array functions
const EventDashboard  = ({formOpen,setFormOpen, selectEvent, selectedEvent})  => {
    //const [events,setEvents] = useState(sampleData);
    const {events} = useSelector(state => state.event);
    const {loading} = useSelector(state => state.async);
    
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
                {formOpen && (
                <EventForm 
                setFormOpen={setFormOpen} 
                selectedEvent={selectedEvent}
                key={selectedEvent ? selectedEvent.id : null }
                />
                )}
            </Grid.Column>
        </Grid>
    )
}

export default EventDashboard;