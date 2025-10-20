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
import { getAllConversions, fitRecommendations } from '../data/conversionData';
import { useTheme } from '../context/ThemeContext';

const ConverterScreen = () => {
  const { theme } = useTheme();
  const [gender, setGender] = useState('men');
  const [fromCountry, setFromCountry] = useState('US');
  const [toCountry, setToCountry] = useState('UK');
  const [inputSize, setInputSize] = useState('');
  const [convertedSize, setConvertedSize] = useState(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const countries = [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'EU', name: 'Europe', flag: '🇪🇺' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: 'CM', name: 'Centimeters', flag: '📏' },
  ];
  
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
    if (!inputSize || !convertedSize) return;

    const favorite = {
      id: Date.now().toString(),
      gender,
      fromCountry,
      toCountry,
      inputSize,
      convertedSize,
    };

    const newFavorites = [...favorites, favorite];
    setFavorites(newFavorites);

    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.log('Error saving favorite:', error);
    }
  };

  const handleSwap = () => {
    // Swap the countries
    const tempCountry = fromCountry;
    setFromCountry(toCountry);
    setToCountry(tempCountry);

    // If there's a converted size, swap it with input
    if (convertedSize !== null && inputSize) {
      setInputSize(convertedSize.toFixed(1));
      setConvertedSize(parseFloat(inputSize));
    }

    // Animate the swap
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
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

  const handleConvert = () => {
    const size = parseFloat(inputSize);
    if (isNaN(size)) return;

    // Get all conversions first
    const allConversions = getAllConversions(size, fromCountry, gender);

    // Extract the target country conversion
    const result = allConversions[toCountry];
    setConvertedSize(result);

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

  return (
    <LinearGradient
      colors={theme.colors.gradient}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Ionicons name="footsteps" size={48} color={theme.colors.headerText} />
          <Text style={[styles.title, { color: theme.colors.headerText }]}>FitRight</Text>
          <Text style={[styles.subtitle, { color: theme.colors.headerText }]}>Get your fit right globally</Text>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.background }]}>
          {/* Gender Selection */}
          <Text style={[styles.label, { color: theme.colors.text }]}>Select Gender</Text>
          <View style={styles.genderContainer}>
            {['men', 'women', 'kids'].map((g) => {
              const getActiveColor = () => {
                if (g === 'women') return '#ec4899'; // Pink
                if (g === 'kids') return '#f59e0b'; // Yellow/Orange
                return theme.colors.primary; // Blue for men
              };

              const getIconColor = () => {
                if (gender === g) return '#fff';
                if (g === 'women') return '#ec4899';
                if (g === 'kids') return '#f59e0b';
                return theme.colors.primary;
              };

              const getTextColor = () => {
                if (gender === g) return '#fff';
                if (g === 'women') return '#ec4899';
                if (g === 'kids') return '#f59e0b';
                return theme.colors.primary;
              };

              return (
                <TouchableOpacity
                  key={g}
                  style={[
                    styles.genderButton,
                    { backgroundColor: theme.colors.inputBackground },
                    gender === g && { backgroundColor: getActiveColor() },
                  ]}
                  onPress={() => setGender(g)}
                >
                  <Ionicons
                    name={
                      g === 'men' ? 'man' : g === 'women' ? 'woman' : 'happy'
                    }
                    size={24}
                    color={getIconColor()}
                  />
                  <Text
                    style={[
                      styles.genderText,
                      { color: getTextColor() },
                    ]}
                  >
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* From Country Selection */}
          <Text style={[styles.label, { color: theme.colors.text }]}>From Country</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.countryScroll}
          >
            {countries.map((country) => (
              <TouchableOpacity
                key={country.code}
                style={[
                  styles.countryButton,
                  { backgroundColor: theme.colors.inputBackground },
                  fromCountry === country.code && { backgroundColor: theme.colors.primary },
                ]}
                onPress={() => setFromCountry(country.code)}
              >
                <Text style={styles.countryFlag}>{country.flag}</Text>
                <Text
                  style={[
                    styles.countryCode,
                    { color: theme.colors.textSecondary },
                    fromCountry === country.code && { color: '#fff' },
                  ]}
                >
                  {country.code}
                </Text>
                <Text
                  style={[
                    styles.countryName,
                    { color: theme.colors.textSecondary },
                    fromCountry === country.code && { color: '#fff' },
                  ]}
                >
                  {country.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Size Input */}
          <Text style={[styles.label, { color: theme.colors.text }]}>Your Size</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.colors.inputBackground, color: theme.colors.text }]}
            placeholder={`Enter ${fromCountry} size`}
            placeholderTextColor={theme.colors.textTertiary}
            keyboardType="decimal-pad"
            value={inputSize}
            onChangeText={setInputSize}
            onSubmitEditing={handleConvert}
          />

          {/* Swap Button */}
          <TouchableOpacity style={styles.swapButton} onPress={handleSwap}>
            <View style={[styles.swapButtonInner, { backgroundColor: theme.colors.inputBackground }]}>
              <Ionicons name="swap-vertical" size={28} color={theme.colors.primary} />
              <Text style={[styles.swapButtonText, { color: theme.colors.primary }]}>Swap</Text>
            </View>
          </TouchableOpacity>

          {/* To Country Selection */}
          <Text style={[styles.label, { color: theme.colors.text }]}>To Country</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.countryScroll}
          >
            {countries.map((country) => (
              <TouchableOpacity
                key={country.code}
                style={[
                  styles.countryButton,
                  { backgroundColor: theme.colors.inputBackground },
                  toCountry === country.code && { backgroundColor: theme.colors.primary },
                ]}
                onPress={() => setToCountry(country.code)}
              >
                <Text style={styles.countryFlag}>{country.flag}</Text>
                <Text
                  style={[
                    styles.countryCode,
                    { color: theme.colors.textSecondary },
                    toCountry === country.code && { color: '#fff' },
                  ]}
                >
                  {country.code}
                </Text>
                <Text
                  style={[
                    styles.countryName,
                    { color: theme.colors.textSecondary },
                    toCountry === country.code && { color: '#fff' },
                  ]}
                >
                  {country.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Convert Button */}
          <TouchableOpacity style={styles.convertButtonLarge} onPress={handleConvert}>
            <LinearGradient
              colors={theme.colors.gradient}
              style={styles.convertButtonGradient}
            >
              <Ionicons name="swap-horizontal" size={24} color="#fff" />
              <Text style={styles.convertButtonText}>Convert</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Conversion Result */}
          {convertedSize !== null && (
            <Animated.View
              style={[styles.resultCard, { backgroundColor: theme.colors.sectionBackground, transform: [{ scale: scaleAnim }] }]}
            >
              <View style={styles.resultHeader}>
                <Text style={[styles.resultLabel, { color: theme.colors.textSecondary }]}>Converted Size</Text>
                <TouchableOpacity onPress={saveFavorite}>
                  <Ionicons name="heart-outline" size={24} color={theme.colors.primary} />
                </TouchableOpacity>
              </View>

              <View style={styles.conversionDisplay}>
                <View style={styles.conversionFrom}>
                  <Text style={[styles.conversionCountry, { color: theme.colors.textSecondary }]}>
                    {countries.find(c => c.code === fromCountry)?.flag} {fromCountry}
                  </Text>
                  <Text style={[styles.conversionSize, { color: theme.colors.text }]}>{inputSize}</Text>
                </View>

                <Ionicons name="arrow-forward" size={32} color={theme.colors.primary} />

                <View style={styles.conversionTo}>
                  <Text style={[styles.conversionCountry, { color: theme.colors.textSecondary }]}>
                    {countries.find(c => c.code === toCountry)?.flag} {toCountry}
                  </Text>
                  <Text style={[styles.conversionSize, { color: theme.colors.primary }]}>
                    {convertedSize !== null ? convertedSize.toFixed(1) : 'N/A'}
                  </Text>
                </View>
              </View>
            </Animated.View>
          )}

          {/* Fit Recommendations */}
          <TouchableOpacity
            style={[styles.recommendationToggle, { backgroundColor: theme.colors.inputBackground }]}
            onPress={() => setShowRecommendations(!showRecommendations)}
          >
            <Text style={[styles.recommendationToggleText, { color: theme.colors.primary }]}>
              Shoe Fit Guide
            </Text>
            <Ionicons
              name={showRecommendations ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={theme.colors.primary}
            />
          </TouchableOpacity>

          {showRecommendations && (
            <View style={styles.recommendationsContainer}>
              {Object.entries(fitRecommendations).map(([type, tip]) => (
                <View key={type} style={[styles.recommendationItem, { backgroundColor: theme.colors.sectionBackground }]}>
                  <Text style={[styles.recommendationType, { color: theme.colors.text }]}>{type}</Text>
                  <Text style={[styles.recommendationTip, { color: theme.colors.textSecondary }]}>{tip}</Text>
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
  countryScroll: {
    marginBottom: 10,
  },
  countryButton: {
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    minWidth: 140,
    alignItems: 'center',
  },
  countryFlag: {
    fontSize: 32,
    marginBottom: 8,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  countryName: {
    fontSize: 12,
    fontWeight: '500',
  },
  convertButtonLarge: {
    marginTop: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  convertButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
  },
  convertButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
  },
  resultCard: {
    marginTop: 24,
    borderRadius: 16,
    padding: 20,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  conversionDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  conversionFrom: {
    flex: 1,
    alignItems: 'center',
  },
  conversionTo: {
    flex: 1,
    alignItems: 'center',
  },
  conversionCountry: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  conversionSize: {
    fontSize: 42,
    fontWeight: '700',
  },
  swapButton: {
    alignItems: 'center',
    marginVertical: 16,
  },
  swapButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  swapButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default ConverterScreen;
