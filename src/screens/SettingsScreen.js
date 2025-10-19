import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

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
          value: darkMode,
          onValueChange: setDarkMode,
          comingSoon: true,
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
          label: 'About SoleMate',
          type: 'link',
          onPress: () => {},
        },
        {
          icon: 'help-circle',
          label: 'Help & Tutorial',
          type: 'link',
          onPress: () => {},
        },
        {
          icon: 'star',
          label: 'Rate App',
          type: 'link',
          onPress: () => {},
        },
        {
          icon: 'share-social',
          label: 'Share App',
          type: 'link',
          onPress: () => {},
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
        <View style={styles.settingItem} key={item.label}>
          <View style={styles.settingLeft}>
            <View style={styles.iconContainer}>
              <Ionicons name={item.icon} size={22} color="#667eea" />
            </View>
            <View>
              <Text style={styles.settingLabel}>{item.label}</Text>
              {item.comingSoon && (
                <Text style={styles.comingSoonBadge}>Coming Soon</Text>
              )}
            </View>
          </View>
          <Switch
            value={item.value}
            onValueChange={item.onValueChange}
            trackColor={{ false: '#e5e7eb', true: '#c7d2fe' }}
            thumbColor={item.value ? '#667eea' : '#f3f4f6'}
            disabled={item.comingSoon}
          />
        </View>
      );
    }

    return (
      <TouchableOpacity
        style={styles.settingItem}
        key={item.label}
        onPress={item.onPress}
      >
        <View style={styles.settingLeft}>
          <View style={styles.iconContainer}>
            <Ionicons name={item.icon} size={22} color="#667eea" />
          </View>
          <Text style={styles.settingLabel}>{item.label}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="settings" size={48} color="#fff" />
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {settingSections.map((section) => (
            <View key={section.title} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <View style={styles.sectionContent}>
                {section.items.map((item) => renderSettingItem(item))}
              </View>
            </View>
          ))}

          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>SoleMate v1.0.0</Text>
            <Text style={styles.copyrightText}>© 2025 All rights reserved</Text>
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
});

export default SettingsScreen;
