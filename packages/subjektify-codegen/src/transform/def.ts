export interface ModelTransform<TSource, TTarget> {
    transform(source: TSource): TTarget;
}
