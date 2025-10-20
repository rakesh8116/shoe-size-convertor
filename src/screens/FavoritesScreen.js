import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';

const FavoritesScreen = () => {
  const { theme } = useTheme();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
    // Set up interval to check for updates
    const interval = setInterval(loadFavorites, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem('favorites');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.log('Error loading favorites:', error);
    }
  };

  const deleteFavorite = async (id) => {
    Alert.alert(
      'Delete Favorite',
      'Are you sure you want to remove this from favorites?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const newFavorites = favorites.filter((fav) => fav.id !== id);
            setFavorites(newFavorites);
            try {
              await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
            } catch (error) {
              console.log('Error deleting favorite:', error);
            }
          },
        },
      ]
    );
  };

  const clearAllFavorites = () => {
    Alert.alert(
      'Clear All Favorites',
      'Are you sure you want to clear all saved sizes?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            setFavorites([]);
            try {
              await AsyncStorage.removeItem('favorites');
            } catch (error) {
              console.log('Error clearing favorites:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <LinearGradient
      colors={theme.colors.gradient}
      style={styles.container}
    >
      <View style={styles.header}>
        <Ionicons name="heart" size={48} color={theme.colors.headerText} />
        <Text style={[styles.title, { color: theme.colors.headerText }]}>Saved Sizes</Text>
        {favorites.length > 0 && (
          <TouchableOpacity onPress={clearAllFavorites} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={[styles.content, { backgroundColor: theme.colors.background }]}>
        {favorites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-dislike-outline" size={80} color={theme.colors.textTertiary} />
            <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>No saved sizes yet</Text>
            <Text style={[styles.emptySubtext, { color: theme.colors.textTertiary }]}>
              Save your favorite conversions from the converter tab
            </Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {favorites.map((favorite) => (
              <View key={favorite.id} style={[styles.favoriteCard, { backgroundColor: theme.colors.sectionBackground }]}>
                <View style={styles.favoriteHeader}>
                  <View style={styles.favoriteInfo}>
                    <View style={[styles.genderBadge, { backgroundColor: theme.colors.primary }]}>
                      <Ionicons
                        name={
                          favorite.gender === 'men'
                            ? 'man'
                            : favorite.gender === 'women'
                            ? 'woman'
                            : 'happy'
                        }
                        size={16}
                        color="#fff"
                      />
                    </View>
                    <Text style={[styles.favoriteSystem, { color: theme.colors.text }]}>
                      {favorite.system} {favorite.size}
                    </Text>
                    {favorite.brand && (
                      <Text style={[styles.favoriteBrand, { color: theme.colors.textSecondary }]}>• {favorite.brand}</Text>
                    )}
                  </View>
                  <TouchableOpacity onPress={() => deleteFavorite(favorite.id)}>
                    <Ionicons name="trash-outline" size={22} color="#ef4444" />
                  </TouchableOpacity>
                </View>

                <View style={styles.conversionsGrid}>
                  {Object.entries(favorite.conversions).map(([system, size]) => (
                    <View key={system} style={[styles.conversionItem, { backgroundColor: theme.colors.background }]}>
                      <Text style={[styles.conversionSystem, { color: theme.colors.textSecondary }]}>{system}</Text>
                      <Text style={[styles.conversionSize, { color: theme.colors.primary }]}>
                        {size !== null ? size.toFixed(1) : 'N/A'}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  clearButton: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#999',
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 8,
    textAlign: 'center',
  },
  favoriteCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  favoriteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  favoriteInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  genderBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  favoriteSystem: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  favoriteBrand: {
    fontSize: 14,
    color: '#999',
    marginLeft: 8,
  },
  conversionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  conversionItem: {
    width: '20%',
    padding: 12,
    margin: 4,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
  },
  conversionSystem: {
    fontSize: 11,
    fontWeight: '600',
    color: '#999',
    marginBottom: 4,
  },
  conversionSize: {
    fontSize: 16,
    fontWeight: '700',
    color: '#667eea',
  },
});

export default FavoritesScreen;
