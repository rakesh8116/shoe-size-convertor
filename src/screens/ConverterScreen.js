import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllConversions, brandAdjustments, fitRecommendations } from '../data/conversionData';

const ConverterScreen = () => {
  const [gender, setGender] = useState('men');
  const [sizeSystem, setSizeSystem] = useState('US');
  const [inputSize, setInputSize] = useState('');
  const [conversions, setConversions] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [favorites, setFavorites] = useState([]);
  
  const scaleAnim = new Animated.Value(1);

  useEffect(() => {
    loadFavorites();
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

  const saveFavorite = async () => {
    if (!inputSize || !conversions) return;
    
    const favorite = {
      id: Date.now().toString(),
      gender,
      system: sizeSystem,
      size: inputSize,
      brand: selectedBrand,
      conversions,
    };

    const newFavorites = [...favorites, favorite];
    setFavorites(newFavorites);
    
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.log('Error saving favorite:', error);
    }
  };

  const handleConvert = () => {
    const size = parseFloat(inputSize);
    if (isNaN(size)) return;

    const result = getAllConversions(size, sizeSystem, gender, selectedBrand);
    setConversions(result);

    // Animate the results
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const brands = Object.keys(brandAdjustments);

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Ionicons name="footsteps" size={48} color="#fff" />
          <Text style={styles.title}>SoleMate</Text>
          <Text style={styles.subtitle}>Your Perfect Fit, Worldwide</Text>
        </View>

        <View style={styles.card}>
          {/* Gender Selection */}
          <Text style={styles.label}>Select Gender</Text>
          <View style={styles.genderContainer}>
            {['men', 'women', 'kids'].map((g) => (
              <TouchableOpacity
                key={g}
                style={[
                  styles.genderButton,
                  gender === g && styles.genderButtonActive,
                ]}
                onPress={() => setGender(g)}
              >
                <Ionicons
                  name={
                    g === 'men' ? 'man' : g === 'women' ? 'woman' : 'happy'
                  }
                  size={24}
                  color={gender === g ? '#fff' : '#667eea'}
                />
                <Text
                  style={[
                    styles.genderText,
                    gender === g && styles.genderTextActive,
                  ]}
                >
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Size System Selection */}
          <Text style={styles.label}>Size System</Text>
          <View style={styles.systemContainer}>
            {['US', 'UK', 'EU', 'JP', 'CM'].map((system) => (
              <TouchableOpacity
                key={system}
                style={[
                  styles.systemButton,
                  sizeSystem === system && styles.systemButtonActive,
                ]}
                onPress={() => setSizeSystem(system)}
              >
                <Text
                  style={[
                    styles.systemText,
                    sizeSystem === system && styles.systemTextActive,
                  ]}
                >
                  {system}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Size Input */}
          <Text style={styles.label}>Your Size</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={`Enter ${sizeSystem} size`}
              placeholderTextColor="#999"
              keyboardType="decimal-pad"
              value={inputSize}
              onChangeText={setInputSize}
              onSubmitEditing={handleConvert}
            />
            <TouchableOpacity style={styles.convertButton} onPress={handleConvert}>
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.buttonGradient}
              >
                <Ionicons name="swap-horizontal" size={24} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Brand Selection */}
          <Text style={styles.label}>Brand (Optional)</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.brandScroll}
          >
            <TouchableOpacity
              style={[
                styles.brandChip,
                !selectedBrand && styles.brandChipActive,
              ]}
              onPress={() => setSelectedBrand(null)}
            >
              <Text
                style={[
                  styles.brandChipText,
                  !selectedBrand && styles.brandChipTextActive,
                ]}
              >
                Generic
              </Text>
            </TouchableOpacity>
            {brands.map((brand) => (
              <TouchableOpacity
                key={brand}
                style={[
                  styles.brandChip,
                  selectedBrand === brand && styles.brandChipActive,
                ]}
                onPress={() => setSelectedBrand(brand)}
              >
                <Text
                  style={[
                    styles.brandChipText,
                    selectedBrand === brand && styles.brandChipTextActive,
                  ]}
                >
                  {brand}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Conversion Results */}
          {conversions && (
            <Animated.View
              style={[styles.resultsContainer, { transform: [{ scale: scaleAnim }] }]}
            >
              <View style={styles.resultsHeader}>
                <Text style={styles.resultsTitle}>Size Conversions</Text>
                <TouchableOpacity onPress={saveFavorite}>
                  <Ionicons name="heart-outline" size={24} color="#667eea" />
                </TouchableOpacity>
              </View>

              {Object.entries(conversions).map(([system, size]) => (
                <View key={system} style={styles.resultRow}>
                  <View style={styles.resultSystem}>
                    <Ionicons name="flag" size={16} color="#667eea" />
                    <Text style={styles.resultSystemText}>{system}</Text>
                  </View>
                  <Text style={styles.resultSize}>
                    {size !== null ? size.toFixed(1) : 'N/A'}
                  </Text>
                </View>
              ))}

              {selectedBrand && brandAdjustments[selectedBrand][gender] !== 0 && (
                <View style={styles.brandNote}>
                  <Ionicons name="information-circle" size={16} color="#f59e0b" />
                  <Text style={styles.brandNoteText}>
                    {selectedBrand} typically runs{' '}
                    {brandAdjustments[selectedBrand][gender] > 0
                      ? 'large'
                      : 'small'}
                    . Adjusted accordingly.
                  </Text>
                </View>
              )}
            </Animated.View>
          )}

          {/* Fit Recommendations */}
          <TouchableOpacity
            style={styles.recommendationToggle}
            onPress={() => setShowRecommendations(!showRecommendations)}
          >
            <Text style={styles.recommendationToggleText}>
              Shoe Fit Guide
            </Text>
            <Ionicons
              name={showRecommendations ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#667eea"
            />
          </TouchableOpacity>

          {showRecommendations && (
            <View style={styles.recommendationsContainer}>
              {Object.entries(fitRecommendations).map(([type, tip]) => (
                <View key={type} style={styles.recommendationItem}>
                  <Text style={styles.recommendationType}>{type}</Text>
                  <Text style={styles.recommendationTip}>{tip}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginTop: 5,
  },
  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    minHeight: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    marginBottom: 12,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    marginHorizontal: 4,
  },
  genderButtonActive: {
    backgroundColor: '#667eea',
  },
  genderText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
  },
  genderTextActive: {
    color: '#fff',
  },
  systemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  systemButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 8,
    marginBottom: 8,
  },
  systemButtonActive: {
    backgroundColor: '#667eea',
  },
  systemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  systemTextActive: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
  },
  convertButton: {
    marginLeft: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonGradient: {
    padding: 16,
  },
  brandScroll: {
    marginBottom: 10,
  },
  brandChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 8,
  },
  brandChipActive: {
    backgroundColor: '#667eea',
  },
  brandChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
  },
  brandChipTextActive: {
    color: '#fff',
  },
  resultsContainer: {
    marginTop: 24,
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    padding: 20,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  resultSystem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultSystemText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: '500',
    color: '#666',
  },
  resultSize: {
    fontSize: 18,
    fontWeight: '700',
    color: '#667eea',
  },
  brandNote: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 12,
    backgroundColor: '#fef3c7',
    borderRadius: 8,
  },
  brandNoteText: {
    marginLeft: 8,
    fontSize: 13,
    color: '#92400e',
    flex: 1,
  },
  recommendationToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    marginTop: 20,
  },
  recommendationToggleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#667eea',
  },
  recommendationsContainer: {
    marginTop: 12,
  },
  recommendationItem: {
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    marginBottom: 8,
  },
  recommendationType: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  recommendationTip: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
});

export default ConverterScreen;
