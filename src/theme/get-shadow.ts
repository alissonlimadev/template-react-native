type GetShadowProps = {
  radius?: number;
  isTopShadow?: boolean;
};

const getShadow = ({
  radius = 4,
  isTopShadow = false,
}: GetShadowProps = {}): string => `
  shadow-offset: 0px ${isTopShadow ? '-' : ''}4px;
  shadow-opacity: 0.12;
  shadow-radius: ${radius}px;
  elevation: 3;
`;

export default getShadow;
