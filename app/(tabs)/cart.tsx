import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Package, Clock, ChevronRight, CircleAlert as AlertCircle, User } from 'lucide-react-native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import DroneMarker from '@/components/DroneMarker';

const orderItems = [
  {
    id: 1,
    name: 'Coq au Vin',
    restaurant: 'Le Petit Bistro',
    price: 28.50,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80',
  },
  {
    id: 2,
    name: 'Wagyu Steak',
    restaurant: 'Sakura',
    price: 95.00,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
  }
];

const deliveryStatus = {
  stage: 'preparation', // preparation, pickup, delivery, arrived
  estimatedTime: '25 minutes',
  distance: '2.3 km',
  drone: {
    id: 'DRN-2024',
    name: 'Drone Alpha',
    battery: 85,
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&q=80',
  }
};

export default function CartScreen() {
  const [showNotification, setShowNotification] = useState(true);

  const getStatusColor = (stage: string) => {
    switch (stage) {
      case 'preparation': return '#eab308';
      case 'pickup': return '#3b82f6';
      case 'delivery': return '#22c55e';
      case 'arrived': return '#22c55e';
      default: return '#666';
    }
  };

  const getStatusText = (stage: string) => {
    switch (stage) {
      case 'preparation': return 'Preparing your order';
      case 'pickup': return 'Drone en route to restaurant';
      case 'delivery': return 'Order on the way';
      case 'arrived': return 'Order arrived';
      default: return 'Processing';
    }
  };

  const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Status Notification */}
        {showNotification && (
          <Animated.View 
            entering={FadeIn}
            style={styles.notification}
          >
            <AlertCircle size={20} color="#22c55e" />
            <Text style={styles.notificationText}>Drone assigned to your order!</Text>
            <Pressable onPress={() => setShowNotification(false)}>
              <Text style={styles.notificationClose}>×</Text>
            </Pressable>
          </Animated.View>
        )}

        {/* Live Tracking Map */}
        <View style={styles.mapSection}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80' }}
            style={styles.mapBackground}
            loading="lazy"
          />
          <View style={styles.mapOverlay}>
            <DroneMarker />
          </View>
        </View>

        {/* Delivery Status */}
        <View style={styles.statusSection}>
          <View style={styles.statusHeader}>
            <View style={styles.statusIndicator}>
              <View style={[styles.statusDot, { backgroundColor: getStatusColor(deliveryStatus.stage) }]} />
              <Text style={styles.statusText}>{getStatusText(deliveryStatus.stage)}</Text>
            </View>
            <View style={styles.deliveryInfo}>
              <Clock size={16} color="#666" />
              <Text style={styles.deliveryText}>{deliveryStatus.estimatedTime}</Text>
              <MapPin size={16} color="#666" />
              <Text style={styles.deliveryText}>{deliveryStatus.distance}</Text>
            </View>
          </View>

          {/* Drone Info */}
          <View style={styles.droneCard}>
            <Image
              source={{ uri: deliveryStatus.drone.image }}
              style={styles.droneImage}
              loading="lazy"
            />
            <View style={styles.droneInfo}>
              <Text style={styles.droneName}>{deliveryStatus.drone.name}</Text>
              <Text style={styles.droneId}>ID: {deliveryStatus.drone.id}</Text>
              <View style={styles.batteryIndicator}>
                <View 
                  style={[
                    styles.batteryLevel, 
                    { width: `${deliveryStatus.drone.battery}%` }
                  ]} 
                />
              </View>
            </View>
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.orderSection}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {orderItems.map((item, index) => (
            <Animated.View
              key={item.id}
              entering={FadeInDown.delay(index * 200)}
              style={styles.orderItem}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.itemImage}
                loading="lazy"
              />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.restaurantName}>{item.restaurant}</Text>
                <View style={styles.itemPricing}>
                  <Text style={styles.itemPrice}>€{item.price.toFixed(2)}</Text>
                  <Text style={styles.itemQuantity}>×{item.quantity}</Text>
                </View>
              </View>
            </Animated.View>
          ))}
        </View>

        {/* Total */}
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>€{total.toFixed(2)}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  notification: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    padding: 16,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    gap: 8,
  },
  notificationText: {
    flex: 1,
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#166534',
  },
  notificationClose: {
    fontSize: 24,
    color: '#166534',
  },
  mapSection: {
    height: 300,
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusSection: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: -40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  statusHeader: {
    marginBottom: 16,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deliveryText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  droneCard: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 12,
    gap: 12,
  },
  droneImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  droneInfo: {
    flex: 1,
  },
  droneName: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginBottom: 4,
  },
  droneId: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  batteryIndicator: {
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
  },
  batteryLevel: {
    height: '100%',
    backgroundColor: '#22c55e',
    borderRadius: 2,
  },
  orderSection: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  itemInfo: {
    flex: 1,
    padding: 12,
  },
  itemName: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginBottom: 4,
  },
  restaurantName: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  itemPricing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemPrice: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#22c55e',
  },
  itemQuantity: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  totalLabel: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
  totalAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#22c55e',
  },
});