/**
 * 需求：
 * 设计并实现一个毕业设计学生导师双向选择系统，支持导师设置选题以及填写意向带领学生数目，学生填报志愿选择自己意向候选的 5 位导师，导师根据
 * 学生填报志愿的情况从选择自己的学生中选择自己中意的学生，双向选择结束后，提供一个算法对未选中的学生以及未被选满的导师进行智能匹配；
 * 1. 每个学生最终必须被分配到有且仅有一个导师；
 * 2. 每个导师最多不超过 5 学生；
 * 3. 热门老师选择溢出时，考虑学生绩点优劣进行选择；
 */
const randomstring = require('randomstring')
const Student = require('./Student')
const Teacher = require('./Teacher')
const TeacherAndStudent = require('./TeacherAndStudent')
const fs = require('fs')
/**
// console.log(Student)
// 1. 学生表
const stuList = []
for (let i = 0; i < 20; i++) {
  const stu = new Student(randomstring.generate(5), Number((Math.random() * 10).toFixed(2)))
  stuList.push(stu)
}
console.log(stuList.toString())
// 2. 老师表
const teacherList = []
for (let i = 0; i < 10; i++) {
  const teacher = new Teacher(randomstring.generate(5), randomstring.generate(5), Math.floor(Math.random() * 5) + 1)
  teacherList.push(teacher)
}
console.log(teacherList.toString())
// 3. 选课表
const tnsList = []
for (let i = 0; i < stuList.length; i++) {
  const stuId = stuList[i].id
  let teacherId = teacherList[Math.floor(Math.random() * teacherList.length)].id
  const tns = new TeacherAndStudent(teacherId, stuId)
  tnsList.push(tns)
}
console.log(tnsList)
const data = {
  stuList: stuList,
  teacherList: teacherList,
  tnsList: tnsList
}
const dataStr = JSON.stringify(data)

fs.writeFileSync('./data.txt', dataStr)
 */
const fileContent = fs.readFileSync('./data.txt', 'utf-8')

const data = JSON.parse(fileContent)

// console.log(data)

const stuList = data.stuList
const teacherList =data.teacherList
const tnsList = data.tnsList
// ======================== [接口集  start] ===========================
function getStuListByTeacherId (teacherId) {
  const stuIdList = tnsList.filter(item => item.teacherId === teacherId).map(item => item.stuId)
  return stuList.filter(item => stuIdList.indexOf(item.id) > -1)
}
function getTnsInfoById (tnsId) {
  const tnsItem = tnsList.find(item => item.id === tnsId)
  return {
    id: tnsItem.id,
    stu: stuList.find(item => item.id === tnsItem.stuId),
    teacher: teacherList.find(item => item.id === tnsItem.teacherId)
  }
}

/**
 * 根据 学生id 查找关联关系
 * @param stuId
 * @return {{teacher, stu, id}}
 */
function getTnsInfoByStuId (stuId) {
  const tnsItem = tnsList.find(item => item.stuId === stuId)
  return getTnsInfoById(tnsItem.id)
}
function getStuById (stuId) {
  return stuList.find(item => item.id === stuId)
}
function getTeacherById (teacherId) {
  return teacherList.find(item => item.id === teacherId)
}

/**
 * 根据 tnsId 删除 tns
 * @param tnsId
 */
function deleteTnsById (tnsId) {
  const tnsIndex = tnsList.findIndex(item => item.id === tnsId)
  tnsList.splice(tnsIndex, 1)
}

/**
 * 添加 tns
 * @param teacherId
 * @param stuId
 */
function addTns (teacherId, stuId) {
  const tns = new TeacherAndStudent(teacherId, stuId)
  tnsList.push(tns)
}

/**
 * 意向数是否一致
 * @param teacherId
 * @return {boolean}
 */
function ifTeacherStuNumberEnough (teacherId) {
  const teacher = getTeacherById(teacherId)
  const stuListTemp = getStuListByTeacherId(teacherId)
  return teacher.stuNumber === stuListTemp.length
}

/**
 * 获取差值
 * @param teacherId
 * @return {number}
 */
function getDIFBetweenStuNumberAndStuListLength (teacherId) {
  const teacher = getTeacherById(teacherId)
  const stuListTemp = getStuListByTeacherId(teacherId)
  return teacher.stuNumber - stuListTemp.length
}
// ======================== [接口集  end] ===========================
// 算法
// 1. 超出老师意向要求的，按照学分排序，剩余的学生从关联中删除，添加到未选中组
// 2. 按照意向数量 与 实际数量进行排序
// 3. 将未选中组递归添加到选课中
