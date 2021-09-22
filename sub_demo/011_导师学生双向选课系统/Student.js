/**
 * 学生
 * @param name 姓名
 * @param gpa 绩点
 * @constructor
 */
const { v4: uuidV4 } = require('uuid')
function Student (name, gpa) {
  this.id = uuidV4() // 唯一 id
  this.name = name || '某学生'
  this.gpa = gpa || 1.0
}

Student.prototype.toString = function () {
  return `学生id: ${this.id}，姓名: ${this.name}, 绩点: ${this.gpa}\n`
}

module.exports = Student
