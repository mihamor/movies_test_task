import React from 'react';
import { ScrollView, ScrollViewProps, ViewProps } from 'react-native';

/**
 * https://github.com/APSL/react-native-keyboard-aware-scroll-view
 */
const KeyboardAvoidingView: React.FC<ScrollViewProps> = (props: ViewProps) => {
  // eslint-disable-next-line global-require
  const lib = require('react-native-keyboard-aware-scroll-view');

  const defaultProps: ScrollViewProps = {
    style: { flex: 1 },
    contentContainerStyle: { flexGrow: 1 },
    bounces: false,
    bouncesZoom: false,
    alwaysBounceVertical: false,
    alwaysBounceHorizontal: false,
  };

  if (!lib) {
    const message: string = [
      'react-native-keyboard-aware-scroll-view: module not installed',
      'using fake call',
    ].join('\n');

    console.warn(message);

    return React.createElement(ScrollView, defaultProps);
  }

  return React.createElement(lib.KeyboardAwareScrollView, {
    enableOnAndroid: true,
    ...defaultProps,
    ...props,
  });
};

export default KeyboardAvoidingView;
