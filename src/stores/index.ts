import { ExampleApi } from '../api';
import ExampleStore from './example.store';

const exampleApi = new ExampleApi();

class RootStore {
  example: ExampleStore;

  constructor() {
    this.example = new ExampleStore(this, {
      exampleApi,
    });
  }
}

const store = new RootStore();

export { RootStore, ExampleStore };

export default store;
