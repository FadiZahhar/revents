/* global google */
import React, {useState} from 'react';
import { Segment, Button , Header} from 'semantic-ui-react';
import cuid from 'cuid';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent,listenToEvents,updateEvent } from '../eventActions';
import { Formik, Form,Field , ErrorMessage} from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryData } from '../../../app/api/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import MyPlaceInput from '../../../app/common/form/MyPlaceInput';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { addEventToFirestore, cancelEventToggle, listenToEventsFromFirestore, updateEventInFirestore } from '../../../app/firestore/firestoreService';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Redirect } from 'react-router';
import { toast } from 'react-toastify';

export default function EventForm({match,history}) {
    const dispatch = useDispatch();
    const selectedEvent = useSelector((state) => state.event.events.find((e) => e.id === match.params.id));

    const {loading, error} = useSelector((state) => state.async);

    const initialValues = selectedEvent ?? {
        title: '',
        category: '',
        description: '',
        city: {
            address: '',
            latLng: ''
        },
        venue: {
            address: '',
            latLng: ''
        },
        date: ''
    }

    const validationSchema = Yup.object({
        title: Yup.string().required('You must provide a title'),
        category: Yup.string().required('You must provide a category'),
        description: Yup.string().required('You must provide a Descriptoin'),
        city: Yup.object().shape({
            address: Yup.string().required('City is required')
        }),
        venue: Yup.object().shape({
            address: Yup.string().required('Venue is required')
        }),
        date: Yup.string().required('You must provide a date'),
    })

    useFirestoreDoc({
        shouldExecute: !!match.params.id,
        query:() => listenToEventsFromFirestore(match.params.id),
        data: (event) => dispatch(listenToEvents([event])),
        deps: [match.params.id,dispatch],
    })

    

    const [values, setValues] = useState(initialValues);
    

    //if(loading || !error) return <LoadingComponent content='Loading event...' />;

    if(error) return <Redirect to='/error' />
    return (
        <Segment clearing>
            <header content={selectedEvent ? "Edit the Event" : "create new event" } />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async(values,{setSubmitting}) => {
                    try {
                    selectedEvent 
                    ? await updateEventInFirestore(values)
                    : await addEventToFirestore(values);
                    setSubmitting(false);
                    history.push('/events');
                    }
                    catch(error) {
                        toast.error(error.message);
                        setSubmitting(false);
                    }
                    
                }}
            >
               
{({isSubmitting,dirty,isValid,values}) => (
    <Form className='ui form'>
    <Header sub color='teal' content='Event Details' />
    <MyTextInput name='title' placeholder='Event Title'/>
    <MySelectInput name='category' placeholder='Category'  options={categoryData} />
    <MyTextArea name='description' placeholder='Event Description' rows={3} />
    <Header sub color='teal' content='Event Location' />
    <MyPlaceInput 
        name='city' 
        placeholder='City'
        />
    <MyPlaceInput 
        name='venue' 
        disabled={!values.city.latLng}
        placeholder='Venue' 
        options = {{
            location: new google.maps.LatLng(values.city.latLng),
            radius: 1000,
            types:['establishment']
        }} />
    <MyDateInput 
    name='date' 
    placeholderText='Date'
    timeFormat="HH:mm"
    showTimeSelect
    TimeCaption='time'
    dateFormat='MMMM d, yyyy h:mm a'
    />
    {selectedEvent &&
    <Button 
    type='Button'
    floated='left' 
    color={selectedEvent.isCancelled ? ' green' : 'red' }
    content={selectedEvent.isCancelled ? 'Reactivate Event' : 'Cancel Event'} 
    onClick={()=> cancelEventToggle(selectedEvent)}
    />}
    <Button 
    loading={isSubmitting}
    disabled={!isValid || !dirty || isSubmitting}
    type="submit" floated="right" positive content="Submit" />
    <Button 
    disabled={isSubmitting}
    type="submit" floated="right"  content="Cancel" />
    </Form>
)}

            
            

            </Formik>
            </Segment>
    )
}