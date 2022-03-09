/**
 * 
 * @param {*} filedName 
 * @param {*} isNecessary 
 * @param {*} type 
 * @param {*} desc 
 * @param {*} subDesc 
 * @param {*} index 
 */
export function Field(filedName, isNecessary, type, desc, subDesc, index) {
  this.filedName = filedName;
  this.isNecessary = isNecessary;
  this.type = type;
  this.desc = desc;
  this.subDesc = subDesc;
  this.index = index;
}
