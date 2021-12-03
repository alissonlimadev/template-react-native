import {
  CommonActions,
  NavigationAction,
  NavigationContainerRef,
  StackActions,
} from '~/modules';
import { Stacks } from '~/utils';
import Storage from '../storage/storage.service';

type RouteParams = Record<string, any>;

let navigator: NavigationContainerRef<NavigationParams>;

export function setTopLevelNavigator(
  navigatorRef: NavigationContainerRef<NavigationParams>,
): void {
  navigator = navigatorRef;
}

export function dispatch(fn: NavigationAction): void {
  navigator.dispatch(fn);
}

export function resetRouteToTop(
  routeName: string,
  params?: Record<string, any>,
): void {
  navigator.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: routeName,
          params,
        },
      ],
    }),
  );
}

export function navigate(routeName: string, params?: RouteParams): void {
  navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params,
    }),
  );
}

export function goBack(): void {
  navigator.dispatch(CommonActions.goBack());
}

export function logout(): void {
  Storage.clearWholeStorage();
  resetRouteToTop(Stacks.AUTH);
}

export function replace(name: string, params?: RouteParams): void {
  navigator.dispatch(StackActions.replace(name, params));
}

export function getCurrentRoute(): string {
  return navigator.getCurrentRoute()?.name || '';
}
