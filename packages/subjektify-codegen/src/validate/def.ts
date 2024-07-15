export interface Validator<T> {
    validate(value?: T): void;
}
