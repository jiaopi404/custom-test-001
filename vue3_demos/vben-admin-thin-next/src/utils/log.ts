const projectName = import.meta.env.VITE_GLOB_APP_TITLE;

export class LxLogInfo {

  static _getTemplate (color: string = '#409EFF', ...msg) {
    const _first = msg[0]
    if (typeof _first === 'string') { // 如果 string
      return [`%c [${msg[0]}]`, `color: ${color}; font-size: 16px;`, ...msg.slice(1)]
    } else {
      return [`%c [${projectName}]`, `color: ${color}; font-size: 16px;`, ...msg]
    }
  }

  constructor (...msg) {
    return LxLogInfo._getTemplate('#409EFF', ...msg)
  }

  static primary (...msg) {
    return LxLogInfo._getTemplate('#409EFF', ...msg)
  }

  static success (...msg) {
    return LxLogInfo._getTemplate('#67C23A', ...msg)
  }
  static warn (...msg) {
    return LxLogInfo._getTemplate('#E6A23C', ...msg)
  }
  static info (...msg) {
    return LxLogInfo._getTemplate('#F56C6C', ...msg)
  }
  static error (...msg) {
    return LxLogInfo._getTemplate('#909399', ...msg)
  }
}

export function warn(message: string) {
  console.warn(`[${projectName} warn]:${message}`);
}

export function error(message: string) {
  throw new Error(`[${projectName} error]:${message}`);
}
