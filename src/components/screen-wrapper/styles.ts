import { StyleProp, ViewStyle } from 'react-native';
import { getBottomSpace, getStatusBarHeight, styled } from '~/modules';
import { getTheme, ifStyle } from '~/theme';
import Typography from '../typography';

const statusBar = getStatusBarHeight();
const bottomSpacing = getBottomSpace();
const xlargeSpacing = getTheme('spacing.xl');
const largeSpacing = getTheme('spacing.lg');
const isContrast = ifStyle('contrast');
const isFullWidth = ifStyle('fullWidth');
const brandPrimary = getTheme('pallete.primary.main');
const backgroundColor = getTheme('pallete.background.z0');

type ChildrenWrapperProps = {
  contentContainerStyle: StyleProp<ViewStyle>;
  fullWidth: boolean;
  contrast?: boolean;
};

export const ChildrenWrapper = styled.ScrollView.attrs((props: any) => ({
  contentContainerStyle: {
    height: '100%',
    paddingHorizontal: isFullWidth(0, largeSpacing(props))(props),
    flexDirection: 'column',
    jutifyContent: 'center',
    paddingTop: props?.contentContainerStyle[0]?.paddingTop || statusBar,
    ...props.contentContainerStyle,
  },
}))<ChildrenWrapperProps>`
  flex: 1;
  width: 100%;
  padding-bottom: ${bottomSpacing}px;
  background-color: ${(props: any) =>
    props?.contentContainerStyle[0]?.backgroundColor ||
    isContrast(brandPrimary(props), backgroundColor(props))(props)};
`;
type TitleProps = {
  fullWidth: boolean;
};
export const Title = styled(Typography)<TitleProps>`
  font-size: ${({ theme }) => theme.fontSizes.xl}px;
  margin-horizontal: ${isFullWidth(xlargeSpacing, 0)}px;
  font-weight: 700;
`;

type SubtitleProps = {
  fullWidth: boolean;
};
export const Subtitle = styled(Typography)<SubtitleProps>`
  margin-horizontal: ${isFullWidth(xlargeSpacing, 0)}px;
  margin-bottom: ${xlargeSpacing}px;
  font-weight: 300;
  opacity: 0.8;
  letter-spacing: 0.3px;
`;
