import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation, Locate, Search } from "lucide-react";

interface LiveLocationMapProps {
  apiKey?: string;
}

const LiveLocationMap: React.FC<LiveLocationMapProps> = ({ apiKey }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [inputApiKey, setInputApiKey] = useState(apiKey || '');
  const [showApiKeyInput, setShowApiKeyInput] = useState(!apiKey);

  useEffect(() => {
    if (!mapContainer.current || !inputApiKey) return;

    // Initialize map
    mapboxgl.accessToken = inputApiKey;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [28.0473, -25.7479], // Johannesburg coordinates
      zoom: 10,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add geolocate control
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
    });
    
    map.current.addControl(geolocate, 'top-right');

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: [number, number] = [position.coords.longitude, position.coords.latitude];
          setUserLocation(coords);
          
          if (map.current) {
            map.current.setCenter(coords);
            map.current.setZoom(14);
            
            // Add user location marker
            new mapboxgl.Marker({
              color: '#32D74B',
              scale: 1.2
            })
              .setLngLat(coords)
              .setPopup(new mapboxgl.Popup().setHTML('<h3>Your Location</h3>'))
              .addTo(map.current);
          }
        },
        (error) => {
          console.log('Location access denied:', error);
        }
      );
    }

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [inputApiKey]);

  const handleApiKeySubmit = () => {
    if (inputApiKey.trim()) {
      setShowApiKeyInput(false);
    }
  };

  if (showApiKeyInput) {
    return (
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg text-center">Setup Maps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            To view live maps, please enter your Mapbox public token.
          </p>
          <p className="text-sm text-muted-foreground text-center">
            Get your token at{' '}
            <a 
              href="https://mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              mapbox.com
            </a>
          </p>
          <div className="flex gap-2">
            <Input
              type="password"
              placeholder="Enter your Mapbox public token"
              value={inputApiKey}
              onChange={(e) => setInputApiKey(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleApiKeySubmit()}
            />
            <Button onClick={handleApiKeySubmit}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Location Search */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <div className="relative">
                <Locate className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Current location" 
                  className="pl-10 bg-background/50"
                  value={userLocation ? "Your current location" : "Getting location..."}
                  readOnly
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Where to? (e.g., Soweto)" 
                  className="pl-10 bg-background/50"
                />
              </div>
            </div>
            <Button className="bg-gradient-warm hover:shadow-medium transition-all duration-200">
              <Navigation className="h-4 w-4 mr-2" />
              Find Route
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Map Container */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
        <div className="relative w-full h-[500px]">
          <div ref={mapContainer} className="absolute inset-0" />
        </div>
      </Card>

      {/* Location Info */}
      {userLocation && (
        <Card className="border-border/50 bg-gradient-secondary/10 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-foreground">
                Live location tracking active
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Your location is being tracked for better route suggestions
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LiveLocationMap;