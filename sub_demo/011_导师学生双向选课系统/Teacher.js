/**
 * 老师类
 * @param researchTopic 研究课题
 * @param stuNumber 带的学生人数
 * @constructor
 */
const { v4: uuidV4 } = require('uuid')
function Teacher (name, researchTopic, stuNumber) {
  this.id = uuidV4() // 老师 id
  this.name = name || '某老师'
  this.researchTopic = researchTopic || '某课题'
  this.stuNumber = stuNumber || 5
}

Teacher.prototype.toString = function () {
  return `老师id: ${this.id}，姓名: ${this.name}, 研究课题: ${this.researchTopic}, 意向带学生数: ${this.stuNumber}\n`
}

module.exports = Teacher
