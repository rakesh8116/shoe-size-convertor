import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

const OnboardingModal = ({ visible, step, onNext, onSkip, onComplete, theme }) => {
  const steps = [
    {
      icon: 'footsteps',
      title: 'Welcome to FitRight!',
      description: 'Get your fit right globally. Convert shoe sizes between countries instantly.',
      color: '#667eea',
    },
    {
      icon: 'globe-outline',
      title: 'Country Selection',
      description: 'Choose your FROM and TO countries to convert between different sizing systems.',
      color: '#ec4899',
    },
    {
      icon: 'swap-vertical',
      title: 'Quick Swap',
      description: 'Tap the swap button to instantly flip your conversion direction.',
      color: '#f59e0b',
    },
    {
      icon: 'heart',
      title: 'Save Favorites',
      description: 'Save your frequent conversions for quick access anytime.',
      color: '#10b981',
    },
  ];

  const currentStep = steps[step];

  const handleNext = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (step < steps.length - 1) {
      onNext();
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSkip();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onSkip}
    >
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={[styles.skipText, { color: theme.colors.textTertiary }]}>Skip</Text>
          </TouchableOpacity>

          <View style={styles.content}>
            <View style={[styles.iconContainer, { backgroundColor: currentStep.color }]}>
              <Ionicons name={currentStep.icon} size={60} color="#fff" />
            </View>

            <Text style={[styles.title, { color: theme.colors.text }]}>{currentStep.title}</Text>
            <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
              {currentStep.description}
            </Text>

            <View style={styles.dots}>
              {steps.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    {
                      backgroundColor:
                        index === step ? theme.colors.primary : theme.colors.border,
                    },
                  ]}
                />
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <LinearGradient
              colors={theme.colors.gradient}
              style={styles.nextButtonGradient}
            >
              <Text style={styles.nextButtonText}>
                {step < steps.length - 1 ? 'Next' : 'Get Started'}
              </Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width * 0.85,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  skipButton: {
    alignSelf: 'flex-end',
    padding: 8,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 32,
  },
  dots: {
    flexDirection: 'row',
    marginTop: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  nextButton: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 20,
  },
  nextButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginRight: 8,
  },
});

export default OnboardingModal;
