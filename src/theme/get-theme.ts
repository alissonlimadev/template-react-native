import { get } from '~/modules';

export const getTheme = (attribute: string) => (props: { theme: any }) =>
  get(props.theme, attribute);
