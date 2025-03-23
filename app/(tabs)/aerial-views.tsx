import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Cloud, Clock, ZoomIn, ZoomOut, Navigation } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const districts = [
  {
    id: 'altstadt',
    name: 'Altstadt',
    description: 'Historic City Center',
    image: 'https://images.unsplash.com/photo-1561113500-8f4ad4f80a93?w=1200&q=80',
    landmarks: ['Rathaus', 'Mönckebergstraße', 'St. Petri Church'],
    coordinates: { lat: 53.5511, lng: 9.9937 }
  },
  {
    id: 'hafencity',
    name: 'HafenCity',
    description: 'Modern Harbor District',
    image: 'https://images.unsplash.com/photo-1602941800793-78c82f922c86?w=1200&q=80',
    landmarks: ['Elbphilharmonie', 'Speicherstadt', 'Maritime Museum'],
    coordinates: { lat: 53.5413, lng: 9.9944 }
  },
  {
    id: 'speicherstadt',
    name: 'Speicherstadt',
    description: 'Historic Warehouse District',
    image: 'https://images.unsplash.com/photo-1590592669466-0cd0f52c8205?w=1200&q=80',
    landmarks: ['Warehouse Complex', 'Miniatur Wunderland', 'Coffee Exchange'],
    coordinates: { lat: 53.5433, lng: 9.9882 }
  },
  {
    id: 'stpauli',
    name: 'St. Pauli',
    description: 'Entertainment District',
    image: 'https://images.unsplash.com/photo-1577334928618-2ff2bf09e827?w=1200&q=80',
    landmarks: ['Reeperbahn', 'Millerntor-Stadion', 'Harbor Steps'],
    coordinates: { lat: 53.5495, lng: 9.9606 }
  },
  {
    id: 'blankenese',
    name: 'Blankenese',
    description: 'Scenic Riverside Quarter',
    image: 'https://images.unsplash.com/photo-1605540436546-5bef47a7ff03?w=1200&q=80',
    landmarks: ['Treppenviertel', 'Elbe Beach', 'Roman Garden'],
    coordinates: { lat: 53.5657, lng: 9.8141 }
  },
  {
    id: 'moenckebergstrasse',
    name: 'Mönckebergstraße',
    description: 'Shopping District',
    image: 'https://images.unsplash.com/photo-1596466107543-e97c4af354fd?w=1200&q=80',
    landmarks: ['Europa Passage', 'Saturn', 'Karstadt'],
    coordinates: { lat: 53.5516, lng: 9.9978 }
  }
];

export default function AerialViewsScreen() {
  const [selectedDistrict, setSelectedDistrict] = useState(districts[0]);
  const [weather, setWeather] = useState({ temp: '18°C', condition: 'Partly Cloudy' });
  const [currentTime, setCurrentTime] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('de-DE', { 
        hour: '2-digit', 
        minute: '2-digit',
        timeZone: 'Europe/Berlin'
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleZoom = (direction: 'in' | 'out') => {
    setZoomLevel(prev => {
      if (direction === 'in' && prev < 2) return prev + 0.25;
      if (direction === 'out' && prev > 0.75) return prev - 0.25;
      return prev;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Main Aerial View */}
        <View style={styles.viewContainer}>
          <Animated.Image
            entering={FadeIn}
            source={{ uri: selectedDistrict.image }}
            style={[styles.mainImage, { transform: [{ scale: zoomLevel }] }]}
          />
          
          {/* Overlay Controls */}
          <View style={styles.controls}>
            <View style={styles.infoBar}>
              <View style={styles.timeWeather}>
                <Clock size={20} color="#fff" />
                <Text style={styles.infoText}>{currentTime}</Text>
                <Cloud size={20} color="#fff" />
                <Text style={styles.infoText}>{weather.temp}</Text>
              </View>
              <View style={styles.zoomControls}>
                <Pressable onPress={() => handleZoom('in')} style={styles.zoomButton}>
                  <ZoomIn size={20} color="#fff" />
                </Pressable>
                <Pressable onPress={() => handleZoom('out')} style={styles.zoomButton}>
                  <ZoomOut size={20} color="#fff" />
                </Pressable>
              </View>
            </View>
          </View>

          {/* Location Indicator */}
          <View style={styles.locationIndicator}>
            <MapPin size={20} color="#22c55e" />
            <Text style={styles.locationText}>
              {selectedDistrict.name}
            </Text>
          </View>
        </View>

        {/* District Information */}
        <View style={styles.infoSection}>
          <Text style={styles.districtTitle}>{selectedDistrict.name}</Text>
          <Text style={styles.districtDescription}>{selectedDistrict.description}</Text>
          
          {/* Landmarks */}
          <View style={styles.landmarksContainer}>
            <Text style={styles.landmarksTitle}>Notable Landmarks</Text>
            {selectedDistrict.landmarks.map((landmark, index) => (
              <View key={index} style={styles.landmarkItem}>
                <Navigation size={16} color="#22c55e" />
                <Text style={styles.landmarkText}>{landmark}</Text>
              </View>
            ))}
          </View>

          {/* Mini Map */}
          <View style={styles.miniMap}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80' }}
              style={styles.miniMapImage}
            />
            <View style={[
              styles.locationDot,
              {
                left: `${((selectedDistrict.coordinates.lng - 9.8) / 0.4) * 100}%`,
                top: `${((53.6 - selectedDistrict.coordinates.lat) / 0.1) * 100}%`,
              }
            ]} />
          </View>
        </View>

        {/* District Selection */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.districtSelector}
        >
          {districts.map((district) => (
            <Pressable
              key={district.id}
              style={[
                styles.districtCard,
                selectedDistrict.id === district.id && styles.selectedDistrict
              ]}
              onPress={() => setSelectedDistrict(district)}
            >
              <Image
                source={{ uri: district.image }}
                style={styles.districtThumbnail}
              />
              <Text style={styles.districtName}>{district.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  viewContainer: {
    height: 400,
    position: 'relative',
    overflow: 'hidden',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  controls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  infoBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    padding: 8,
  },
  timeWeather: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  zoomControls: {
    flexDirection: 'row',
    gap: 8,
  },
  zoomButton: {
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
  },
  locationIndicator: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
    gap: 4,
  },
  locationText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#000',
  },
  infoSection: {
    padding: 20,
  },
  districtTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 8,
  },
  districtDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  landmarksContainer: {
    marginBottom: 20,
  },
  landmarksTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: 12,
  },
  landmarkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  landmarkText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#333',
  },
  miniMap: {
    height: 150,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  miniMapImage: {
    width: '100%',
    height: '100%',
  },
  locationDot: {
    position: 'absolute',
    width: 12,
    height: 12,
    backgroundColor: '#22c55e',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  districtSelector: {
    padding: 20,
  },
  districtCard: {
    width: 120,
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedDistrict: {
    borderWidth: 2,
    borderColor: '#22c55e',
  },
  districtThumbnail: {
    width: '100%',
    height: 80,
  },
  districtName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    padding: 8,
    textAlign: 'center',
  },
});