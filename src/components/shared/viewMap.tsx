import React from 'react'
import { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';  

// Define types for Google Map props and objects
interface LatLngLiteral {
    lat: number;
    lng: number;
}

const libraries: ("places")[] = ['places']; // Libraries to load for Google Maps

const mapContainerStyle = {
    width: '100%',
    height: '400px'
};

const defaultCenter: LatLngLiteral = {
    lat: 37.7749, // Default latitude (San Francisco)
    lng: -122.4194 // Default longitude (San Francisco)
};

const API_KEY = import.meta.env.VITE_APP_MAP_KEY

console.log(API_KEY);

 

export default function ViewMap(props: LatLngLiteral) {

    const {
        lat,
        lng
    } = props 

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: API_KEY,
        libraries,
    });


    useEffect(() => {
        setLocation({ lat, lng });
    }, [lat, lng]);

    const options = {
        disableDefaultUI: true,
        zoomControl: true,
    }; 

    const mapRef: any = React.useRef(null);
    const onMapLoad = React.useCallback((map: any) => {
        mapRef.current = map;
    }, []); 


    //   const { loadingMap, center, setMarkerPosition, markerPosition } = useMapLocation() 
    const [location, setLocation] = useState<LatLngLiteral>(defaultCenter); // Default map center
    // const [markerPosition, setMarkerPosition] = useState<LatLngLiteral | null>(null); // Marker position state

 
    // useEffect(() => {
    //     // Function to geocode the address and get the lat/lng
    //     const geocodeAddress = async () => {
    //         const geocoder = new window.google.maps.Geocoder();
    //         geocoder.geocode({ address: address }, (results: any, status) => {
    //             if (status === 'OK') {
    //                 const latLng = results[0].geometry.location;
    //                 setMarkerPosition({ lat: latLng.lat(), lng: latLng.lat()});
    //                 setLocation({ lat: latLng.lat(), lng: latLng.lng() });
    //             } else {
    //                 console.error('Geocode was not successful for the following reason: ' + status);
    //             }
    //         });
    //     };

    //     if (isLoaded) {
    //         geocodeAddress();
    //     }
    // }, [address, isLoaded]);

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading maps...</div>;

    return (
        <div> 
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={16}
                onLoad={onMapLoad}
                options={options}
                center={location} 
            >
                {location.lat && (
                    <Marker position={location} /> // Render the marker at the clicked position
                )}
            </GoogleMap>
        </div>
    );
}; 
