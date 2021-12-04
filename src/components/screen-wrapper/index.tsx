import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import DismissKeyboardView from '../dismiss-keyboard-view';
import If from '../if';
import { ChildrenWrapper, Subtitle, Title } from './styles';

type SceneStyle = {
  [index: number]: {
    backgroundColor?: string;
  };
};
type Props = {
  title?: string;
  subtitle?: string;
  style?: SceneStyle;
  contentContainerStyle?: StyleProp<ViewStyle>;
  scrollRef?: any;
  fullWidth?: boolean;
  contrast?: boolean;
  scrollEnabled?: boolean;
};

const ScreenWrapper: React.FC<Props> = ({
  children,
  title = '',
  subtitle = '',
  style = [{}],
  contentContainerStyle = {},
  scrollRef = React.createRef(),
  fullWidth = false,
  scrollEnabled = true,
  contrast = false,
  ...rest
}) => (
  <DismissKeyboardView>
    <ChildrenWrapper
      fullWidth={fullWidth}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      contentContainerStyle={Object.assign(style, contentContainerStyle)}
      ref={scrollRef}
      scrollEnabled={scrollEnabled}
      contrast={contrast}
      {...rest}
    >
      <If condition={!!title}>
        <Title fullWidth={fullWidth}>{title}</Title>
      </If>
      <If condition={!!subtitle}>
        <Subtitle fullWidth={fullWidth}>{subtitle}</Subtitle>
      </If>
      {children}
    </ChildrenWrapper>
  </DismissKeyboardView>
);

export default ScreenWrapper;
