import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare class StringValidator implements ValidatorConstraintInterface {
    private safeStringValue;
    validate(text: string, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare function IsValidString(validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;
