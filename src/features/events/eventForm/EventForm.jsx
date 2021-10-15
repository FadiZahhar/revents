import React, {useState} from 'react';
import { Segment, Button , Header} from 'semantic-ui-react';
import cuid from 'cuid';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent,updateEvent } from '../eventActions';
import { Formik, Form,Field , ErrorMessage} from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryData } from '../../../app/api/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';

export default function EventForm({match,history}) {
    const dispatch = useDispatch();
    const selectedEvent = useSelector(state => state.event.events.find(e => e.id === match.params.id));

    const initialValues = selectedEvent ?? {
        title: '',
        category: '',
        description: '',
        city: '',
        venue: '',
        date: ''
    }

    const validationSchema = Yup.object({
        title: Yup.string().required('You must provide a title'),
        category: Yup.string().required('You must provide a category'),
        description: Yup.string().required('You must provide a Descriptoin'),
        city: Yup.string().required('You must provide a city'),
        venue: Yup.string().required('You must provide a venue'),
        date: Yup.string().required('You must provide a date'),
    })

    const [values, setValues] = useState(initialValues);
    
    function handleFormSubmit() {
        selectedEvent 
        ? dispatch(updateEvent({...selectedEvent,...values}))
        : dispatch(createEvent({...values, id: cuid(), hostedBy:'Bob', attendees:[],hostPhotoURL: '/asset/user.png'}));
        history.push('/events')
    }

    function handleInputChange(e) {
        const {name, value } = e.target;
        setValues({...values,[name]: value});
    }
    return (
        <Segment clearing>
            <header content={selectedEvent ? "Edit the Event" : "create new event" } />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={values => {
                    selectedEvent 
                    ? dispatch(updateEvent({...selectedEvent,...values}))
                    : dispatch(createEvent({...values, id: cuid(), hostedBy:'Bob', attendees:[],hostPhotoURL: '/asset/user.png'}));
                    history.push('/events')
                }}
            >
                {({values,handleChange,handleSubmit}) => (

<Form className='ui form' onSubmit={handleSubmit}>
<Header sub color='teal' content='Event Details' />
<MyTextInput name='title' placeholder='Event Title' />
<MySelectInput name='category' placeholder='Category'  options={categoryData} />
<MyTextArea name='description' placeholder='Event Description' rows={3} />
<Header sub color='teal' content='Event Location' />
<MyTextInput name='city' placeholder='City'  />
<MyTextInput name='venue' placeholder='Venue'  />
<MyDateInput 
name='date' 
placeholderText='Date'
timeFormat="HH:mm"
showTimeSelect
TimeCaption='time'
dateFormat='MMMM d, yyyy h:mm a'
/>

<Button type="submit" floated="right" positive content="Submit" />
<Button type="submit" floated="right"  content="Cancel" />
</Form>
                )}
            

            </Formik>
            </Segment>
    )
}