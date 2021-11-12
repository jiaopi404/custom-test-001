declare type Effect = () => void

declare type Deps = Set<Effect>

declare type DepsMap = Map<Key, Deps>

declare type TargetMap = WeakMap<any, DepsMap>

declare type Ref<T> = {
  value: any
}

declare type Key = string | Symbol
