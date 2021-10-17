import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function TestMap({location}) {



    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAHWFdemDp61mySikz9X1WdwdY8Ywa2aEY' }}
          center={location.center}
          zoom={location.zoom}
        >
          <AnyReactComponent
            lat={location.center.lat}
            lng={location.center.lng}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
}