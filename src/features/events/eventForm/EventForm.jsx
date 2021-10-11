import React, {useState} from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';
import cuid from 'cuid';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent,updateEvent } from '../eventActions';
import { Formik } from 'formik';

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
                onSubmit={values => console.log(values)}
            >
                {({values,handleChange,handleSubmit}) => (

<Form onSubmit={handleSubmit}>
<Form.Field>
    <input type="text" 
    placeholder="Event title" 
    name='title'
    value={values.title}
    onChange={handleChange}
    />
</Form.Field>
<Form.Field>
    <input type="text" placeholder="Category" name='category'
    value={values.category}
    onChange={handleChange} />
</Form.Field>

<Form.Field>
    <input type="text" placeholder="Description" name='description'
    value={values.description}
    onChange={handleChange}/>
</Form.Field>
<Form.Field>
    <input type="text" placeholder="City" name='city'
    value={values.city}
    onChange={handleChange}/>
</Form.Field>
<Form.Field>
    <input type="text" placeholder="Venue" name='venue'
    value={values.venue}
    onChange={handleChange} />
</Form.Field>
<Form.Field>
    <input type="date" placeholder="Date" name='date'
    value={values.date}
    onChange={handleChange} />
</Form.Field>
<Button type="submit" floated="right" positive content="Submit" />
<Button type="submit" floated="right"  content="Cancel" />
</Form>
                )}
            

            </Formik>
            </Segment>
    )
}