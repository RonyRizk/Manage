export type ValidationRule = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean;
};
type ValidationResult = {
  isValid: boolean;
  errors: {
    [key: string]: string[];
  };
};
export declare function validateForm<T>(data: T, rules: {
  [P in keyof T]?: ValidationRule;
}): ValidationResult;
export {};
