export interface IActionReducer<T> {
  type: string;
  payload: T;
}
