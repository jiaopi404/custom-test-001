const targetMap: TargetMap = new WeakMap<any, DepsMap>() // 存放 deps
let activeEffect: null | Effect = null

/**
 * effect
 * @param eff
 */
export const effect = (eff: Effect) => {
  activeEffect = eff
  activeEffect()
  activeEffect = null
}

/**
 * track 组建 targetMap
 * @param target
 * @param key key of target
 */
export const track = (target: any, key: Key): void => {
  // console.log('tracker: ', target, key)
  let depsMap: DepsMap | undefined = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map<string, Deps>()
    targetMap.set(target, depsMap) // !important
  }
  let deps: Deps | undefined = depsMap.get(key)
  if (!deps) {
    deps = new Set<Effect>()
    depsMap.set(key, deps) // !important
  }
  if (activeEffect) { // !important
    deps.add(activeEffect)
  }
}

/**
 * 执行所有的 effect
 * @param target
 * @param key
 */
export const trigger = (target: any, key: Key): void => {
  // console.log('trigger: ', target, key)
  let depsMap: DepsMap | undefined = targetMap.get(target)
  if (!depsMap) {
    return
  }
  let deps: Deps | undefined = depsMap.get(key)
  if (!deps) {
    return
  }
  deps.forEach(eff => eff()) // 执行所有的 effect
}
