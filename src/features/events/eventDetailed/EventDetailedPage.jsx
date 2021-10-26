import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { listenToEventsFromFirestore } from '../../../app/firestore/firestoreService';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedSidebar from './EventDetailedSidebar';
import { listenToEvents } from '../eventActions';
import Loading from '../../../app/layout/LoadingComponent';
import { Redirect } from 'react-router-dom';

export default function EventDetailedPage({match}) {
    const dispatch = useDispatch();
    const event = useSelector(state => 
        state.event.events.find(e => e.id === match.params.id)
        );
    const {loading, error} = useSelector((state) => state.async);
    useFirestoreDoc({
        query:() => listenToEventsFromFirestore(match.params.id),
        data: event => dispatch(listenToEvents([event])),
        deps: [match.params.id,dispatch]
    })

    if(loading || (!event && !error)) return <Loading content='Loading event...' />
    if(error) return <Redirect to='/error' />
    return (
        <Grid>
            <Grid.Column width={10}>
                <EventDetailedHeader event={event} />
                <EventDetailedInfo event={event} />
                <EventDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <EventDetailedSidebar attendees={event?.attendees} />
            </Grid.Column>
        </Grid>
    )
}