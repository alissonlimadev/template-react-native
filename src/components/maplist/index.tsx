import React from 'react';
import { isEmpty } from '~/modules';
import Fragment from '../fragment';
import If from '../if';

type Props<T> = {
  data?: T[] | null;
  renderItem(item: T | string | number, index: number): React.ReactNode;
  keyExtractor?(
    item: T | string | number,
    index: number,
  ): string | number | null;
  Separator?: React.FunctionComponent | null;
  Footer?: React.FunctionComponent | null;
  Header?: React.FunctionComponent | null;
  EmptyComponent?: React.FunctionComponent | null;
};

type Item = {
  [key: string]: any;
};

const MapList = <T extends Item | number | string>({
  data = [],
  renderItem,
  Separator = null,
  Footer = null,
  Header = null,
  keyExtractor = undefined,
  EmptyComponent = null,
}: Props<T>) => {
  const getKey = (item: T, index: number): string | number => {
    if (keyExtractor) return keyExtractor(item, index) || `element${index}`;
    return `element${index}`;
  };

  if (!data) return null;

  if (isEmpty(data) && !!EmptyComponent) return <EmptyComponent />;

  return (
    <Fragment>
      {!!Header && <Header />}
      {data.map((item, index) => (
        <Fragment key={getKey(item, index)}>
          {renderItem(item, index)}
          <If condition={!!Separator && index < data.length - 1}>
            {!!Separator && <Separator />}
          </If>
        </Fragment>
      ))}
      {!!Footer && <Footer />}
    </Fragment>
  );
};

export default MapList;
