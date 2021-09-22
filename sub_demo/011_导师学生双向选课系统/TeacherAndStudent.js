/**
 * 老师 学生 关联类；选课题类
 * @param teacherId 老师 id
 * @param stuId 学生 id
 * @constructor
 */
const { v4: uuidV4 } = require('uuid')
function TeacherAndStudent (teacherId, stuId) {
  this.id = uuidV4()
  this.teacherId = teacherId
  this.stuId = stuId
}

module.exports = TeacherAndStudent
