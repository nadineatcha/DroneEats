import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, Pressable, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search as SearchIcon, Filter, Star, Clock, Euro } from 'lucide-react-native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';

// Rich content data with high-quality Unsplash images
const categories = [
  {
    id: 'featured',
    name: 'Featured',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80'
  },
  {
    id: 'new',
    name: 'New',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80'
  },
  {
    id: 'trending',
    name: 'Trending',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80'
  },
  {
    id: 'popular',
    name: 'Popular',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80'
  }
];

const restaurants = [
  {
    id: 1,
    name: 'La Maison Bistro',
    cuisine: 'French',
    rating: 4.8,
    priceRange: '€€€',
    deliveryTime: '20-30',
    images: {
      exterior: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
      interior: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
      ambiance: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80'
    },
    specialDishes: [
      {
        name: 'Coq au Vin',
        description: 'Traditional French chicken braised in wine',
        price: '28',
        image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80',
        isSpecial: true
      },
      {
        name: 'Beef Bourguignon',
        description: 'Slow-cooked beef in red wine sauce',
        price: '32',
        image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=800&q=80'
      }
    ]
  },
  {
    id: 2,
    name: 'Sakura Japanese',
    cuisine: 'Japanese',
    rating: 4.9,
    priceRange: '€€€€',
    deliveryTime: '25-35',
    images: {
      exterior: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
      interior: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&q=80',
      ambiance: 'https://images.unsplash.com/photo-1548940740-204726a19be3?w=800&q=80'
    },
    specialDishes: [
      {
        name: 'Omakase Set',
        description: 'Chef\'s special selection sushi',
        price: '85',
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80',
        isSpecial: true
      },
      {
        name: 'Wagyu Steak',
        description: 'A5 grade Japanese wagyu',
        price: '120',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80'
      }
    ]
  }
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('featured');
  const { width } = useWindowDimensions();

  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Header */}
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <SearchIcon size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search restaurants or dishes"
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
          <Pressable style={styles.filterButton}>
            <Filter size={20} color="#000" />
          </Pressable>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map((category, index) => (
            <Animated.View
              key={category.id}
              entering={FadeIn.delay(index * 100)}
            >
              <Pressable
                style={[
                  styles.categoryCard,
                  selectedCategory === category.id && styles.categoryCardSelected
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Image
                  source={{ uri: category.image }}
                  style={styles.categoryImage}
                  loading="lazy"
                />
                <View style={styles.categoryOverlay}>
                  <Text style={styles.categoryText}>{category.name}</Text>
                </View>
              </Pressable>
            </Animated.View>
          ))}
        </ScrollView>

        {/* Restaurants */}
        <View style={styles.restaurantsContainer}>
          {restaurants.map((restaurant, index) => (
            <Animated.View
              key={restaurant.id}
              entering={FadeInDown.delay(index * 200)}
              style={styles.restaurantCard}
            >
              {/* Restaurant Header */}
              <Image
                source={{ uri: restaurant.images.exterior }}
                style={styles.restaurantImage}
                loading="lazy"
              />
              <View style={styles.restaurantContent}>
                <View style={styles.restaurantHeader}>
                  <View>
                    <Text style={styles.restaurantName}>{restaurant.name}</Text>
                    <Text style={styles.cuisineType}>{restaurant.cuisine}</Text>
                  </View>
                  <View style={styles.ratingContainer}>
                    <Star size={16} color="#fbbf24" fill="#fbbf24" />
                    <Text style={styles.rating}>{restaurant.rating}</Text>
                  </View>
                </View>

                <View style={styles.restaurantInfo}>
                  <View style={styles.infoItem}>
                    <Clock size={16} color="#666" />
                    <Text style={styles.infoText}>{restaurant.deliveryTime} min</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.priceRange}>{restaurant.priceRange}</Text>
                  </View>
                </View>

                {/* Special Dishes */}
                <Text style={styles.sectionTitle}>Special Dishes</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.dishesContainer}
                >
                  {restaurant.specialDishes.map((dish) => (
                    <View key={dish.name} style={styles.dishCard}>
                      <Image
                        source={{ uri: dish.image }}
                        style={styles.dishImage}
                        loading="lazy"
                      />
                      {dish.isSpecial && (
                        <View style={styles.specialBadge}>
                          <Text style={styles.specialText}>Chef's Special</Text>
                        </View>
                      )}
                      <View style={styles.dishContent}>
                        <Text style={styles.dishName}>{dish.name}</Text>
                        <Text style={styles.dishDescription}>{dish.description}</Text>
                        <Text style={styles.dishPrice}>€{dish.price}</Text>
                      </View>
                    </View>
                  ))}
                </ScrollView>

                {/* Restaurant Ambiance */}
                <Text style={styles.sectionTitle}>Ambiance</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.ambianceContainer}
                >
                  <Image
                    source={{ uri: restaurant.images.interior }}
                    style={styles.ambianceImage}
                    loading="lazy"
                  />
                  <Image
                    source={{ uri: restaurant.images.ambiance }}
                    style={styles.ambianceImage}
                    loading="lazy"
                  />
                </ScrollView>
              </View>
            </Animated.View>
          ))}
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
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f4f5',
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  filterButton: {
    padding: 12,
    backgroundColor: '#f4f4f5',
    borderRadius: 12,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  categoryCard: {
    width: 120,
    height: 160,
    marginRight: 12,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  categoryCardSelected: {
    borderWidth: 3,
    borderColor: '#22c55e',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 12,
  },
  categoryText: {
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    fontSize: 14,
  },
  restaurantsContainer: {
    padding: 20,
  },
  restaurantCard: {
    marginBottom: 32,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  restaurantImage: {
    width: '100%',
    height: 200,
  },
  restaurantContent: {
    padding: 20,
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  restaurantName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 4,
  },
  cuisineType: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#fffbeb',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  rating: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#f59e0b',
  },
  restaurantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  priceRange: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#22c55e',
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 16,
  },
  dishesContainer: {
    marginBottom: 24,
  },
  dishCard: {
    width: 280,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
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
  dishImage: {
    width: '100%',
    height: 180,
  },
  specialBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#22c55e',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  specialText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#fff',
  },
  dishContent: {
    padding: 16,
  },
  dishName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 4,
  },
  dishDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  dishPrice: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#22c55e',
  },
  ambianceContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  ambianceImage: {
    width: 200,
    height: 150,
    borderRadius: 12,
    marginRight: 12,
  },
});