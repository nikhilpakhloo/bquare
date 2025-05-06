import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageSourcePropType } from 'react-native';

interface NavItem {
  label: string;
  icon: ImageSourcePropType;
  onPress?: () => void;
}

interface NavGridProps {
  items: NavItem[];
}

const NavGrid: React.FC<NavGridProps> = ({ items }) => {
  return (
    <View style={styles.navContainer}>
      {items.map((item, index) => (
        <TouchableOpacity key={index} style={styles.navItem} onPress={item.onPress}>
          <View style={styles.iconContainer}>
            <Image source={item.icon} style={styles.icon} />
          </View>
          <Text style={styles.navText}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    padding: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  navItem: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '48%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 10,
  },
  iconContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    width: 30,
    height: 30,
  },
  navText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});

export default NavGrid;
