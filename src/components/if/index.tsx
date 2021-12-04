import React, { FC } from 'react';

type Props = {
  condition: boolean;
};

const If: FC<Props> = ({ condition, children }) => {
  return <>{condition ? children : null}</>;
};

export default If;
