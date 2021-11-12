import { baseProxyHandler } from './baseProxyHandler'

/**
 * reactive 方法
 * @param target
 */
export const reactive = <T>(target: T) => {
  return new Proxy(target, baseProxyHandler)
}
