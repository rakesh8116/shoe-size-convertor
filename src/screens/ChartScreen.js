import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { conversionData, widthGuide } from '../data/conversionData';
import { useTheme } from '../context/ThemeContext';

const ChartScreen = () => {
  const { theme } = useTheme();
  const [selectedGender, setSelectedGender] = useState('men');

  const renderSizeChart = (gender) => {
    const data = conversionData[gender];
    if (!data) return null;

    return (
      <View style={styles.chartSection}>
        <Text style={[styles.chartTitle, { color: theme.colors.text }]}>
          {gender.charAt(0).toUpperCase() + gender.slice(1)}'s Size Chart
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            {/* Header Row */}
            <View style={[styles.tableHeader, { backgroundColor: theme.colors.primary }]}>
              <View style={styles.tableCell}>
                <Text style={styles.headerText}>US</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.headerText}>UK</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.headerText}>EU</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.headerText}>JP/CM</Text>
              </View>
            </View>

            {/* Data Rows */}
            {data.US.map((usSize, index) => (
              <View key={index} style={[styles.tableRow, { borderBottomColor: theme.colors.border }]}>
                <View style={styles.tableCell}>
                  <Text style={[styles.cellText, { color: theme.colors.text }]}>{usSize}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={[styles.cellText, { color: theme.colors.text }]}>{data.UK[index]}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={[styles.cellText, { color: theme.colors.text }]}>{data.EU[index]}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={[styles.cellText, { color: theme.colors.text }]}>{data.CM[index]}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={theme.colors.gradient}
      style={styles.container}
    >
      <View style={styles.header}>
        <Ionicons name="grid" size={48} color={theme.colors.headerText} />
        <Text style={[styles.title, { color: theme.colors.headerText }]}>Size Charts</Text>
        <Text style={[styles.subtitle, { color: theme.colors.headerText }]}>Complete Reference Guide</Text>
      </View>

      <View style={[styles.content, { backgroundColor: theme.colors.background }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Gender Selection Buttons */}
          <View style={styles.genderContainer}>
            {['men', 'women', 'kids'].map((g) => {
              const getActiveColor = () => {
                if (g === 'women') return '#ec4899'; // Pink
                if (g === 'kids') return '#f59e0b'; // Yellow/Orange
                return theme.colors.primary; // Blue for men
              };

              const getIconColor = () => {
                if (selectedGender === g) return '#fff';
                if (g === 'women') return '#ec4899';
                if (g === 'kids') return '#f59e0b';
                return theme.colors.primary;
              };

              const getTextColor = () => {
                if (selectedGender === g) return '#fff';
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
                    selectedGender === g && { backgroundColor: getActiveColor() },
                  ]}
                  onPress={() => setSelectedGender(g)}
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

          {/* Size Chart for Selected Gender */}
          {renderSizeChart(selectedGender)}

          {/* Width Guide */}
          <View style={styles.guideSection}>
            <Text style={[styles.guideTitle, { color: theme.colors.text }]}>Width Guide</Text>
            <Text style={[styles.guideDescription, { color: theme.colors.textSecondary }]}>
              Shoe width is as important as length for proper fit
            </Text>

            {Object.entries(widthGuide).map(([width, description]) => (
              <View key={width} style={[styles.guideItem, { backgroundColor: theme.colors.sectionBackground }]}>
                <View style={[styles.guideIconContainer, { backgroundColor: theme.colors.background }]}>
                  <Ionicons name="resize" size={20} color={theme.colors.primary} />
                </View>
                <View style={styles.guideContent}>
                  <Text style={[styles.guideWidthName, { color: theme.colors.text }]}>
                    {width.charAt(0).toUpperCase() + width.slice(1)}
                  </Text>
                  <Text style={[styles.guideWidthDescription, { color: theme.colors.textSecondary }]}>{description}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* How to Measure */}
          <View style={styles.guideSection}>
            <Text style={[styles.guideTitle, { color: theme.colors.text }]}>How to Measure Your Feet</Text>

            <View style={styles.stepContainer}>
              <View style={[styles.stepNumber, { backgroundColor: theme.colors.primary }]}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={[styles.stepTitle, { color: theme.colors.text }]}>Prepare Materials</Text>
                <Text style={[styles.stepDescription, { color: theme.colors.textSecondary }]}>
                  Get a piece of paper, a pencil, and a ruler or measuring tape
                </Text>
              </View>
            </View>

            <View style={styles.stepContainer}>
              <View style={[styles.stepNumber, { backgroundColor: theme.colors.primary }]}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={[styles.stepTitle, { color: theme.colors.text }]}>Trace Your Foot</Text>
                <Text style={[styles.stepDescription, { color: theme.colors.textSecondary }]}>
                  Stand on the paper and trace the outline of your foot while wearing socks
                </Text>
              </View>
            </View>

            <View style={styles.stepContainer}>
              <View style={[styles.stepNumber, { backgroundColor: theme.colors.primary }]}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={[styles.stepTitle, { color: theme.colors.text }]}>Measure Length</Text>
                <Text style={[styles.stepDescription, { color: theme.colors.textSecondary }]}>
                  Measure from heel to longest toe. This is your foot length in cm
                </Text>
              </View>
            </View>

            <View style={styles.stepContainer}>
              <View style={[styles.stepNumber, { backgroundColor: theme.colors.primary }]}>
                <Text style={styles.stepNumberText}>4</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={[styles.stepTitle, { color: theme.colors.text }]}>Convert to Size</Text>
                <Text style={[styles.stepDescription, { color: theme.colors.textSecondary }]}>
                  Use the CM column in the charts above to find your size
                </Text>
              </View>
            </View>
          </View>

          {/* Tips Section */}
          <View style={styles.tipsSection}>
            <Text style={[styles.guideTitle, { color: theme.colors.text }]}>Pro Tips</Text>

            <View style={styles.tipItem}>
              <Ionicons name="bulb" size={20} color="#f59e0b" />
              <Text style={styles.tipText}>
                Measure your feet at the end of the day when they're largest
              </Text>
            </View>

            <View style={styles.tipItem}>
              <Ionicons name="bulb" size={20} color="#f59e0b" />
              <Text style={styles.tipText}>
                Always measure both feet and use the larger measurement
              </Text>
            </View>

            <View style={styles.tipItem}>
              <Ionicons name="bulb" size={20} color="#f59e0b" />
              <Text style={styles.tipText}>
                Leave about a thumb's width between your toe and shoe end
              </Text>
            </View>

            <View style={styles.tipItem}>
              <Ionicons name="bulb" size={20} color="#f59e0b" />
              <Text style={styles.tipText}>
                Consider the shoe type - athletic shoes need more room than dress shoes
              </Text>
            </View>
          </View>

          {/* Footer */}
          <View style={[styles.footer, { backgroundColor: theme.colors.inputBackground }]}>
            <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
              Always try on shoes when possible, as fit can vary by brand and style
            </Text>
          </View>
        </ScrollView>
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
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginTop: 5,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
  },
  chartSection: {
    marginBottom: 32,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#667eea',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tableCell: {
    width: 80,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  cellText: {
    fontSize: 14,
    color: '#333',
  },
  guideSection: {
    marginBottom: 32,
  },
  guideTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  guideDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  guideItem: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  guideIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  guideContent: {
    flex: 1,
  },
  guideWidthName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  guideWidthDescription: {
    fontSize: 13,
    color: '#666',
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  tipsSection: {
    marginBottom: 32,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fef3c7',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#78350f',
    marginLeft: 12,
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  genderButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  genderText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ChartScreen;
