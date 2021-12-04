export const ifStyle =
  (prop: any) =>
  (truthy: any, falsy?: any) =>
  (props: { [x: string]: any }) => {
    try {
      return props[prop] ? truthy : falsy;
    } catch (error) {
      return falsy;
    }
  };
