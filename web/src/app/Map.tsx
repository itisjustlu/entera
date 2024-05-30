"use client"

import React, {useState} from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import {Button, Input} from "antd";

const containerStyle = {
    width: '900px',
    height: '900px'
};

const center = {
    lat: 41.1701765, lng: -96.1278525
};

const Map = ({ results, search }: any) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
    })

    const [q, setQ] = useState(search)
    const [map, setMap] = React.useState(null)

    const onChange = (e: any) => {
        setQ(e.target.value)
    }

    const onSubmit = () => {
        window.location.href = `/?search=${q}`
    }

    const onLoad = React.useCallback(function callback(map) {
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const center = results.length > 0 ? { lat: results[0]?.location?.lat, lng: results[0]?.location.lon } : { lat: 41.1701765, lng: -96.1278525 }

    return (
        <>
            <Input placeholder="Search..." className="mb-[20px]" onChange={onChange} value={q} />
            <Button type="primary" className="mb-[20px]" onClick={onSubmit}>Search</Button>

            {isLoaded && (
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                onLoad={onLoad}
                zoom={8}
                onUnmount={onUnmount}
            >
                {results.map((result: any) => (
                    <MarkerF label={result.school.name} position={{ lat: result.location.lat, lng: result.location.lon }} />
                ))}
            </GoogleMap>
            )}
        </>
    )
}

export default Map