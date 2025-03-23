import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight, Clock, Shield, Leaf, MapPin, Battery, ChartBar as BarChart3 } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const features = [
  {
    id: 'speed',
    title: 'Fast & Eco-Friendly',
    description: 'Zero-emission drone deliveries in minutes, reducing urban traffic and CO2 emissions',
    icon: Clock,
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80',
  },
  {
    id: 'eco',
    title: 'Sustainable Operations',
    description: 'Solar-powered charging stations and optimized flight paths for minimal energy consumption',
    icon: Leaf,
    image: 'https://images.unsplash.com/photo-1507124484497-b7f446e65519?w=800&q=80',
  },
  {
    id: 'safety',
    title: 'Smart & Safe',
    description: 'AI-powered navigation with real-time weather adaptation and noise reduction technology',
    icon: Shield,
    image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=800&q=80',
  }
];

const sustainabilityMetrics = [
  {
    id: 'emissions',
    title: 'CO2 Saved',
    value: '1,234 kg',
    icon: Leaf,
  },
  {
    id: 'energy',
    title: 'Solar Power',
    value: '85%',
    icon: Battery,
  },
  {
    id: 'efficiency',
    title: 'Route Efficiency',
    value: '94%',
    icon: BarChart3,
  }
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=1200&q=80' }}
          style={styles.heroImage}
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>AirDine</Text>
          <Text style={styles.heroSubtitle}>Sustainable Food Delivery for Europe</Text>
          <View style={styles.heroStats}>
            {sustainabilityMetrics.map((metric) => (
              <View key={metric.id} style={styles.statCard}>
                <metric.icon size={24} color="#22c55e" />
                <Text style={styles.statValue}>{metric.value}</Text>
                <Text style={styles.statTitle}>{metric.title}</Text>
              </View>
            ))}
          </View>
          <Pressable style={styles.heroButton}>
            <Text style={styles.heroButtonText}>Track Impact</Text>
            <ArrowRight size={20} color="#fff" />
          </Pressable>
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Sustainable Innovation</Text>
        
        {features.map((feature, index) => (
          <Animated.View
            key={feature.id}
            entering={FadeInDown.delay(index * 200)}
            style={styles.featureCard}
          >
            <Image
              source={{ uri: feature.image }}
              style={styles.featureImage}
              loading="lazy"
            />
            <View style={styles.featureContent}>
              <View style={styles.featureHeader}>
                <feature.icon size={24} color="#22c55e" />
                <Text style={styles.featureTitle}>{feature.title}</Text>
              </View>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          </Animated.View>
        ))}
      </View>

      {/* Coverage Map */}
      <View style={styles.mapSection}>
        <Text style={styles.sectionTitle}>Green Delivery Zones</Text>
        <View style={styles.mapCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1577086664693-894d8405334a?w=800&q=80' }}
            style={styles.mapImage}
            loading="lazy"
          />
          <View style={styles.mapOverlay}>
            <MapPin size={24} color="#22c55e" />
            <Text style={styles.mapText}>Expanding Sustainable Delivery Network</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  hero: {
    height: 600,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heroTitle: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 48,
    color: '#fff',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 20,
    color: '#fff',
    marginBottom: 32,
  },
  heroStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    minWidth: 100,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#fff',
    marginTop: 8,
  },
  statTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22c55e',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    gap: 8,
  },
  heroButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#fff',
  },
  featuresSection: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    marginBottom: 24,
  },
  featureCard: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  featureImage: {
    width: '100%',
    height: 200,
  },
  featureContent: {
    padding: 20,
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  featureTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
  },
  featureDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  mapSection: {
    padding: 20,
    paddingBottom: 40,
  },
  mapCard: {
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: 300,
  },
  mapOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
  },
  mapText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#000',
  },
});