import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Battery, BatteryFull, BatteryLow, MapPin } from 'lucide-react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import DroneMarker from '@/components/DroneMarker';

// Simulated drone data
const drones = [
  {
    id: 1,
    name: 'Drone Alpha',
    status: 'active',
    battery: 85,
    location: { latitude: 53.5511, longitude: 9.9937 }, // Hamburg coordinates
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=1000&auto=format',
    zone: 'Hamburg Center',
    destination: 'Mönckebergstraße 7',
    eta: '5 minutes',
  },
  {
    id: 2,
    name: 'Drone Beta',
    status: 'inactive',
    battery: 20,
    location: { latitude: 53.5461, longitude: 9.9937 },
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1000&auto=format',
    zone: 'Hamburg West',
    destination: 'Reeperbahn 1',
    eta: '12 minutes',
  },
  {
    id: 3,
    name: 'Drone Gamma',
    status: 'maintenance',
    battery: 50,
    location: { latitude: 53.5511, longitude: 10.0037 },
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1000&auto=format',
    zone: 'Hamburg East',
    destination: 'Billstedt Center',
    eta: '8 minutes',
  },
];

export default function OrdersScreen() {
  const [selectedZone, setSelectedZone] = useState('all');
  const [selectedDrone, setSelectedDrone] = useState(null);

  const filteredDrones = selectedZone === 'all' 
    ? drones 
    : drones.filter(drone => drone.zone === selectedZone);

  const getBatteryIcon = (battery: number) => {
    if (battery > 70) return <BatteryFull size={16} color="#22c55e" />;
    if (battery > 30) return <Battery size={16} color="#eab308" />;
    return <BatteryLow size={16} color="#ef4444" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#22c55e';
      case 'inactive': return '#ef4444';
      case 'maintenance': return '#eab308';
      default: return '#666';
    }
  };

  const zones = ['all', 'Hamburg Center', 'Hamburg West', 'Hamburg East'];

  // Update drone positions every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real app, this would fetch updated positions from an API
      console.log('Updating drone positions...');
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Live Drone Tracking</Text>
        
        {/* Zone Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.zoneFilter}
        >
          {zones.map((zone, index) => (
            <Pressable
              key={zone}
              style={[
                styles.zoneButton,
                selectedZone === zone && styles.zoneButtonActive
              ]}
              onPress={() => setSelectedZone(zone)}
            >
              <Text style={[
                styles.zoneButtonText,
                selectedZone === zone && styles.zoneButtonTextActive
              ]}>
                {zone === 'all' ? 'All Zones' : zone}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Map View */}
        <View style={styles.mapContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80' }}
            style={styles.mapBackground}
            loading="lazy"
          />
          <View style={styles.mapOverlay}>
            {filteredDrones.map((drone) => (
              <View
                key={drone.id}
                style={[
                  styles.droneMarker,
                  {
                    left: `${((drone.location.longitude - 9.9) / 0.2) * 100}%`,
                    top: `${((53.6 - drone.location.latitude) / 0.1) * 100}%`,
                  }
                ]}
              >
                <DroneMarker />
              </View>
            ))}
          </View>
        </View>

        {/* Drone List */}
        <ScrollView style={styles.droneList}>
          {filteredDrones.map((drone, index) => (
            <Animated.View
              key={drone.id}
              entering={FadeInRight.delay(index * 100)}
              style={[
                styles.droneCard,
                selectedDrone?.id === drone.id && styles.droneCardSelected
              ]}
            >
              <Image 
                source={{ uri: drone.image }}
                style={styles.droneImage}
                loading="lazy"
              />
              <View style={styles.droneInfo}>
                <Text style={styles.droneName}>{drone.name}</Text>
                <View style={styles.droneDetails}>
                  <View style={styles.statusContainer}>
                    <View style={[
                      styles.statusDot,
                      { backgroundColor: getStatusColor(drone.status) }
                    ]} />
                    <Text style={styles.statusText}>
                      {drone.status.charAt(0).toUpperCase() + drone.status.slice(1)}
                    </Text>
                  </View>
                  <View style={styles.locationContainer}>
                    <MapPin size={16} color="#666" />
                    <Text style={styles.locationText}>{drone.destination}</Text>
                  </View>
                  <View style={styles.batteryContainer}>
                    {getBatteryIcon(drone.battery)}
                    <Text style={styles.batteryText}>{drone.battery}%</Text>
                  </View>
                </View>
                <View style={styles.etaContainer}>
                  <Text style={styles.etaLabel}>ETA:</Text>
                  <Text style={styles.etaTime}>{drone.eta}</Text>
                </View>
              </View>
            </Animated.View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 16,
  },
  zoneFilter: {
    marginBottom: 16,
  },
  zoneButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f4f4f5',
    marginRight: 8,
  },
  zoneButtonActive: {
    backgroundColor: '#000',
  },
  zoneButtonText: {
    fontFamily: 'Inter-SemiBold',
    color: '#666',
  },
  zoneButtonTextActive: {
    color: '#fff',
  },
  mapContainer: {
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
  },
  mapBackground: {
    width: '100%',
    height: '100%',
  },
  mapOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  droneMarker: {
    position: 'absolute',
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
  droneList: {
    flex: 1,
  },
  droneCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  droneCardSelected: {
    borderColor: '#000',
    borderWidth: 2,
  },
  droneImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  droneInfo: {
    flex: 1,
  },
  droneName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 8,
  },
  droneDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  batteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  batteryText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  etaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  etaLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#666',
  },
  etaTime: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#22c55e',
  },
});