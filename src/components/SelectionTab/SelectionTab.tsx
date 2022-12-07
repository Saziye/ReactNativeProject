import React, {FC, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  View,
} from 'react-native';
import {Colors, Fonts, Scale} from 'theme';

interface Tab {
  index: number;
  title: string;
}
interface SelectionTab {
  data: Array<Tab>;
  onPress?: (element: Tab) => void;
}

const SelectionTab: FC<SelectionTab> = ({data, onPress}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <View>
      <ScrollView
        nestedScrollEnabled={true}
        bounces={false}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        {data.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setActiveIndex(item.index);
                onPress && onPress(item);
              }}
              style={[styles.menuContainer]}>
              <Text
                style={[
                  styles.menuText,
                  activeIndex === item.index
                    ? styles.menuTextActive
                    : styles.menuTextInActive,
                ]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  menuContainer: {
    paddingVertical: Scale(12),
    paddingHorizontal: Scale(12.5),
    alignItems: 'center',
  },
  menuText: {
    fontFamily: Fonts.Regular,
    fontSize: Scale(14),
    lineHeight: Scale(21),
    textAlign: 'center',
  },
  menuTextActive: {
    color: Colors.primary,
  },
  menuTextInActive: {
    color: Colors.white,
  },
});

export default SelectionTab;
