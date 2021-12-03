import { action, computed, observable } from 'mobx';
import { ExampleApi } from '~/api';
import { RootStore } from '~/stores';

type InjectedApis = {
  exampleApi: ExampleApi;
};

export default class OrdersStore {
  rootStore: RootStore;
  exampleApi: ExampleApi;

  @observable
  example = 'test';

  constructor(rootStore: RootStore, { exampleApi }: InjectedApis) {
    this.rootStore = rootStore;
    this.exampleApi = exampleApi;
  }

  @computed get exampleComputed(): boolean {
    return true;
  }

  @action
  exampleAction = async (): Promise<void> => {};
}
