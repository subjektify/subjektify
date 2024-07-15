export interface Transform<TSource, TTarget> {
    transform(source: TSource): TTarget;
}
