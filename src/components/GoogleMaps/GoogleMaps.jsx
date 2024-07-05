import React, { useEffect, useRef } from 'react';

const GoogleMaps = ({ lat, lng }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom: 15,
      });

      markerRef.current = new google.maps.Marker({
        position: { lat, lng },
        map,
        title: "Event Location",
      });
    };

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;
      window.initMap = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }

    return () => {
      // Clean up Google Maps script and marker on unmount
      if (window.google && markerRef.current) {
        markerRef.current.setMap(null);
      }
    };
  }, [lat, lng]);

  return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
};

export default GoogleMaps;
