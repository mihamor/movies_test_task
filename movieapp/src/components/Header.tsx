import React from 'react';
import { GestureResponderEvent, ViewProps } from 'react-native';
import { SafeAreaLayout } from '_components/SafeAreaLayout';
import {
  TopNavigation,
  TopNavigationAction,
  StyleService,
  useStyleSheet,
  IconElement,
  IconProps,
  Text,
} from '@ui-kitten/components';

import { BackIcon } from '../atoms/icons';

export interface HeaderProps extends ViewProps {
  title?: string,
  onBackPress?: (event: GestureResponderEvent) => void;
  right?: React.ReactElement,
}

const Header: React.FC<HeaderProps> = ({
  title,
  onBackPress,
  right,
  style,
}: HeaderProps) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <SafeAreaLayout
      insets="top"
      style={[styles.container, style]}
    >
      <TopNavigation
        style={styles.header}
        title={() => <Text style={styles.titleStyle}>{title}</Text>}
        accessoryLeft={() => (
          <TopNavigationAction
            onPress={onBackPress}
            icon={(iconStyle: IconProps): IconElement => (
              <BackIcon {...iconStyle} fill={styles.iconStyle.borderColor} />
            )}
          />
        )}
        accessoryRight={right && (() => right)}
      />
    </SafeAreaLayout>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'color-primary-default',
    width: '100%',
  },
  header: {
    backgroundColor: 'color-primary-default',
    width: '100%',
  },
  titleStyle: {
    color: 'text-control-color',
  },
  iconStyle: {
    borderColor: 'text-control-color',
  },
});

export default Header;
