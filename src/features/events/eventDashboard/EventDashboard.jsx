import React, {useState} from 'react';
import {sampleData} from '../../../app/api/sampleData.js';
import {Grid} from 'semantic-ui-react';
import EventList from './EventList';
import EventForm from '../eventForm/EventForm';


// array functions
const EventDashboard  = ({formOpen,setFormOpen})  => {
    const {events,setEvents} = useState(sampleData);
    
    function handleCreateEvent(event) {
        setEvents([...events, event])
    }

    return (
        <Grid>
            <Grid.Column width={10}>
                <EventList events={sampleData} />
            </Grid.Column>
            <Grid.Column width={6}>
                {formOpen &&
                <EventForm 
                setFormOpen={setFormOpen} 
                setEvents={setEvents} 
                createEvent={handleCreateEvent} 
                />}
            </Grid.Column>
        </Grid>
    )
}

export default EventDashboard;