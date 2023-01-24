import { ChangeEvent } from "react";


export interface IFieldComponentProps<T = string>{
    title: string;
    onChange(e: ChangeEvent<any>): void;
    value: T;
    inputName: string;
    hasError: boolean;
    errorText: string;
  }