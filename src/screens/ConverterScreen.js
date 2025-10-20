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
  const [sizeSystem, setSizeSystem] = useState('US');
  const [inputSize, setInputSize] = useState('');
  const [conversions, setConversions] = useState(null);
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

    const result = getAllConversions(size, sizeSystem, gender);
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

          {/* Size System Selection */}
          <Text style={[styles.label, { color: theme.colors.text }]}>Size System</Text>
          <View style={styles.systemContainer}>
            {['US', 'UK', 'EU', 'JP', 'CM'].map((system) => (
              <TouchableOpacity
                key={system}
                style={[
                  styles.systemButton,
                  { backgroundColor: theme.colors.inputBackground },
                  sizeSystem === system && { backgroundColor: theme.colors.primary },
                ]}
                onPress={() => setSizeSystem(system)}
              >
                <Text
                  style={[
                    styles.systemText,
                    { color: theme.colors.textSecondary },
                    sizeSystem === system && { color: '#fff' },
                  ]}
                >
                  {system}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Size Input */}
          <Text style={[styles.label, { color: theme.colors.text }]}>Your Size</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, { backgroundColor: theme.colors.inputBackground, color: theme.colors.text }]}
              placeholder={`Enter ${sizeSystem} size`}
              placeholderTextColor={theme.colors.textTertiary}
              keyboardType="decimal-pad"
              value={inputSize}
              onChangeText={setInputSize}
              onSubmitEditing={handleConvert}
            />
            <TouchableOpacity style={styles.convertButton} onPress={handleConvert}>
              <LinearGradient
                colors={theme.colors.gradient}
                style={styles.buttonGradient}
              >
                <Ionicons name="swap-horizontal" size={24} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Conversion Results */}
          {conversions && (
            <Animated.View
              style={[styles.resultsContainer, { backgroundColor: theme.colors.sectionBackground, transform: [{ scale: scaleAnim }] }]}
            >
              <View style={styles.resultsHeader}>
                <Text style={[styles.resultsTitle, { color: theme.colors.text }]}>Size Conversions</Text>
                <TouchableOpacity onPress={saveFavorite}>
                  <Ionicons name="heart-outline" size={24} color={theme.colors.primary} />
                </TouchableOpacity>
              </View>

              {Object.entries(conversions).map(([system, size]) => (
                <View key={system} style={[styles.resultRow, { borderBottomColor: theme.colors.border }]}>
                  <View style={styles.resultSystem}>
                    <Ionicons name="flag" size={16} color={theme.colors.primary} />
                    <Text style={[styles.resultSystemText, { color: theme.colors.textSecondary }]}>{system}</Text>
                  </View>
                  <Text style={[styles.resultSize, { color: theme.colors.primary }]}>
                    {size !== null ? size.toFixed(1) : 'N/A'}
                  </Text>
                </View>
              ))}
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
});

export default ConverterScreen;
