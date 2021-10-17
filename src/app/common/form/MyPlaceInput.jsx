import React from 'react';

import { useField } from 'formik';

import { FormField, Label, List, Segment } from 'semantic-ui-react';

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';


export default function MyPlaceInput({label,options,...props}) {
    const [field,meta,helpers] = useField(props);

    function handleSelect(address){
        geocodeByAddress(address)
          .then((results) => getLatLng(results[0]))
          .then((latLng) => helpers.setValue({address,latLng}))
          .catch((error) => helpers.setError(error));
      };

    function handleBlur(e){
        field.onBlur(e);
        if(!field.value.latLng) {
            helpers.setValue({address:'',latLng:null})
        }
        
    }
    return (
        <PlacesAutocomplete
        value={field.value['address']}
        onChange={value => helpers.setValue({address:value})}
        onSelect={ value => handleSelect(value)}
        searchOptions={options}
        >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <FormField error={meta.touched && !!meta.error}>
            <input {...getInputProps({name: field.name, onBlur: (e) => handleBlur(e), ...props})} />
            {meta.touched && meta.error ? (
                <Label basic color='red'>
                    {meta.error['address']}
                </Label>
            ) : null}
            {suggestions?.length > 0 && (
                <Segment loading={loading} style={{marginTop:0, postion: 'absolute', zIndex: 1000, width:'100%'}}>
                    <List selection>
                        {suggestions.map(suggestions => (
                            <List.Item {...getSuggestionItemProps(suggestions)}>
                                <List.Header>
                                    {suggestions.formattedSuggestion.mainText}
                                </List.Header>
                                <List.Description>
                                    {suggestions.formattedSuggestion.secondaryText}
                                </List.Description>
                            </List.Item>
                        ))}
                    </List>
                </Segment>
            )}
        </FormField>
        )}
        </PlacesAutocomplete>

    );
}