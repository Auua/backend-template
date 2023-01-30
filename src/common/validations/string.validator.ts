import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class StringValidator implements ValidatorConstraintInterface {
  private safeStringValue = /^[Å-Öå-ö#&-;=?-~]*$/;

  validate(text: string, args: ValidationArguments) {
    return this.safeStringValue.test(text);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Text ($value) has unwanted characters!';
  }
}

export function IsValidString(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsValidString',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: StringValidator,
    });
  };
}
