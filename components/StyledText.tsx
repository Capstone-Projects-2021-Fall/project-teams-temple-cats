import * as React from 'react';

import { Text, TextProps } from './Themed';
/**
 * Style constant to use the provided space-mono text for text rendering
 * @param props: Text
 * @returns Text in space-mono font
 */
export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}
