import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
  Linking,
  Share,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const SettingsScreen = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showTutorialModal, setShowTutorialModal] = useState(false);

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out FitRight - Get your fit right globally! The perfect shoe size converter app.',
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const settingSections = [
    {
      title: 'Preferences',
      items: [
        {
          icon: 'notifications',
          label: 'Notifications',
          type: 'switch',
          value: notifications,
          onValueChange: setNotifications,
        },
        {
          icon: 'moon',
          label: 'Dark Mode',
          type: 'switch',
          value: isDarkMode,
          onValueChange: toggleTheme,
        },
        {
          icon: 'save',
          label: 'Auto-save Conversions',
          type: 'switch',
          value: autoSave,
          onValueChange: setAutoSave,
        },
      ],
    },
    {
      title: 'About',
      items: [
        {
          icon: 'information-circle',
          label: 'About FitRight',
          type: 'link',
          onPress: () => setShowAboutModal(true),
        },
        {
          icon: 'help-circle',
          label: 'Help & Tutorial',
          type: 'link',
          onPress: () => setShowTutorialModal(true),
        },
        {
          icon: 'share-social',
          label: 'Share App',
          type: 'link',
          onPress: handleShare,
        },
      ],
    },
    {
      title: 'Legal',
      items: [
        {
          icon: 'document-text',
          label: 'Terms of Service',
          type: 'link',
          onPress: () => {},
        },
        {
          icon: 'shield-checkmark',
          label: 'Privacy Policy',
          type: 'link',
          onPress: () => {},
        },
      ],
    },
  ];

  const renderSettingItem = (item) => {
    if (item.type === 'switch') {
      return (
        <View style={[styles.settingItem, { backgroundColor: theme.colors.background, borderBottomColor: theme.colors.border }]} key={item.label}>
          <View style={styles.settingLeft}>
            <View style={[styles.iconContainer, { backgroundColor: theme.colors.inputBackground }]}>
              <Ionicons name={item.icon} size={22} color={theme.colors.primary} />
            </View>
            <View>
              <Text style={[styles.settingLabel, { color: theme.colors.text }]}>{item.label}</Text>
            </View>
          </View>
          <Switch
            value={item.value}
            onValueChange={item.onValueChange}
            trackColor={{ false: theme.colors.border, true: '#c7d2fe' }}
            thumbColor={item.value ? theme.colors.primary : theme.colors.inputBackground}
          />
        </View>
      );
    }

    return (
      <TouchableOpacity
        style={[styles.settingItem, { backgroundColor: theme.colors.background, borderBottomColor: theme.colors.border }]}
        key={item.label}
        onPress={item.onPress}
      >
        <View style={styles.settingLeft}>
          <View style={[styles.iconContainer, { backgroundColor: theme.colors.inputBackground }]}>
            <Ionicons name={item.icon} size={22} color={theme.colors.primary} />
          </View>
          <Text style={[styles.settingLabel, { color: theme.colors.text }]}>{item.label}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={theme.colors.textTertiary} />
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient colors={theme.colors.gradient} style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="settings" size={48} color={theme.colors.headerText} />
        <Text style={[styles.title, { color: theme.colors.headerText }]}>Settings</Text>
      </View>

      <View style={[styles.content, { backgroundColor: theme.colors.background }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {settingSections.map((section) => (
            <View key={section.title} style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.textTertiary }]}>{section.title}</Text>
              <View style={[styles.sectionContent, { backgroundColor: theme.colors.sectionBackground }]}>
                {section.items.map((item) => renderSettingItem(item))}
              </View>
            </View>
          ))}

          <View style={styles.versionContainer}>
            <Text style={[styles.versionText, { color: theme.colors.textTertiary }]}>FitRight v1.0.0</Text>
            <Text style={[styles.copyrightText, { color: theme.colors.textTertiary }]}>Get your fit right globally</Text>
            <Text style={[styles.copyrightText, { color: theme.colors.textTertiary, marginTop: 8 }]}>© 2025 All rights reserved</Text>
          </View>
        </ScrollView>
      </View>

      {/* About Modal */}
      <Modal
        visible={showAboutModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAboutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
            <View style={styles.modalHeader}>
              <Ionicons name="footsteps" size={48} color={theme.colors.primary} />
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>FitRight</Text>
              <Text style={[styles.modalSubtitle, { color: theme.colors.textSecondary }]}>Version 1.0.0</Text>
            </View>

            <View style={styles.modalBody}>
              <Text style={[styles.modalDescription, { color: theme.colors.textSecondary }]}>
                Get your fit right globally
              </Text>

              <View style={styles.featureList}>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={20} color={theme.colors.primary} />
                  <Text style={[styles.featureText, { color: theme.colors.text }]}>Convert shoe sizes across US, UK, EU, JP, and CM</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={20} color={theme.colors.primary} />
                  <Text style={[styles.featureText, { color: theme.colors.text }]}>Brand-specific size adjustments</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={20} color={theme.colors.primary} />
                  <Text style={[styles.featureText, { color: theme.colors.text }]}>Save and manage favorite conversions</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={20} color={theme.colors.primary} />
                  <Text style={[styles.featureText, { color: theme.colors.text }]}>Visual size comparison charts</Text>
                </View>
              </View>

              <View style={[styles.developerSection, { borderTopColor: theme.colors.border }]}>
                <Ionicons name="person-circle-outline" size={24} color={theme.colors.primary} />
                <View style={styles.developerInfo}>
                  <Text style={[styles.developerLabel, { color: theme.colors.textTertiary }]}>Developed by</Text>
                  <Text style={[styles.developerName, { color: theme.colors.text }]}>Ruhan Singh</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: theme.colors.primary }]}
              onPress={() => setShowAboutModal(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Tutorial Modal */}
      <Modal
        visible={showTutorialModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowTutorialModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
            <View style={styles.modalHeader}>
              <Ionicons name="help-circle" size={48} color={theme.colors.primary} />
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>How to Use FitRight</Text>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.tutorialStep}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>1</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={[styles.stepTitle, { color: theme.colors.text }]}>Select Gender</Text>
                  <Text style={[styles.stepDescription, { color: theme.colors.textSecondary }]}>
                    Choose between Men, Women, or Kids sizing
                  </Text>
                </View>
              </View>

              <View style={styles.tutorialStep}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>2</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={[styles.stepTitle, { color: theme.colors.text }]}>Choose Size System</Text>
                  <Text style={[styles.stepDescription, { color: theme.colors.textSecondary }]}>
                    Select your current size system (US, UK, EU, JP, or CM)
                  </Text>
                </View>
              </View>

              <View style={styles.tutorialStep}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>3</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={[styles.stepTitle, { color: theme.colors.text }]}>Enter Your Size</Text>
                  <Text style={[styles.stepDescription, { color: theme.colors.textSecondary }]}>
                    Type in your shoe size and tap the convert button
                  </Text>
                </View>
              </View>

              <View style={styles.tutorialStep}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>4</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={[styles.stepTitle, { color: theme.colors.text }]}>Select Brand (Optional)</Text>
                  <Text style={[styles.stepDescription, { color: theme.colors.textSecondary }]}>
                    Choose a specific brand for adjusted sizing recommendations
                  </Text>
                </View>
              </View>

              <View style={styles.tutorialStep}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>5</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={[styles.stepTitle, { color: theme.colors.text }]}>Save Favorites</Text>
                  <Text style={[styles.stepDescription, { color: theme.colors.textSecondary }]}>
                    Tap the heart icon to save conversions for quick access later
                  </Text>
                </View>
              </View>
            </ScrollView>

            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: theme.colors.primary }]}
              onPress={() => setShowTutorialModal(false)}
            >
              <Text style={styles.modalButtonText}>Got it!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  comingSoonBadge: {
    fontSize: 11,
    color: '#f59e0b',
    fontWeight: '600',
    marginTop: 2,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  versionText: {
    fontSize: 14,
    color: '#9ca3af',
    fontWeight: '600',
  },
  copyrightText: {
    fontSize: 12,
    color: '#d1d5db',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    maxHeight: '80%',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
  },
  modalSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  modalBody: {
    marginBottom: 20,
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '500',
  },
  featureList: {
    marginTop: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  featureText: {
    marginLeft: 10,
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  developerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  developerInfo: {
    marginLeft: 12,
  },
  developerLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  developerName: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 2,
  },
  modalButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  tutorialStep: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default SettingsScreen;
