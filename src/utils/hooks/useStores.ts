import React from 'react';
import store from '~/stores';
import { MobXProviderContext } from '../../modules';

export const useStores = (): typeof store => {
  return React.useContext(MobXProviderContext).rootStore;
};
