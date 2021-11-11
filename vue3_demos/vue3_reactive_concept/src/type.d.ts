declare type Effect = () => any

declare type DepsMap = Map<string, Set<Effect>>

declare type Ref<T> = {
  value: T
}
