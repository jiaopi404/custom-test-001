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
const { v4: uuidV4 } = require('uuid')
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
// 1. 超出老师意向要求的，按照学分排序，剩余的学生从关联中删除，添加到未选中组；
// 2. 按照意向数量 与 实际数量，对老师进行排序；
// 3. 将未选中组递归添加到选课中；

function autoCourseChoosing () {
  // 1
  const unChooseStuList = []
  teacherList.forEach(teacher => {
    if (getDIFBetweenStuNumberAndStuListLength(teacher.id) < 0) {
      let thisTeacherStuList = getStuListByTeacherId(teacher.id)
      thisTeacherStuList.sort((a, b) => b.gpa - a.gpa)
      // console.log('111', JSON.parse(JSON.stringify(thisTeacherStuList)))
      // console.log('222', teacher)
      unChooseStuList.push(...thisTeacherStuList.slice(teacher.stuNumber, thisTeacherStuList.length))
    }
  })
  // 1.2 删除关联关系
  unChooseStuList.forEach(stu => {
    const tnsInfo = getTnsInfoByStuId(stu.id)
    deleteTnsById(tnsInfo.id)
  })
  console.log('unchoose stu list: ', unChooseStuList)
  console.log('current tnsList is: ', tnsList)
  // 2. 不需要排序，直接遍历
  // teacherList.sort((a, b) => {
  //   const stuListLenOfA = getStuListByTeacherId(a.id).length
  //   const stuListLenOfB = getStuListByTeacherId(b.id).length
  //   return -(a.stuNumber - stuListLenOfA) + (b.stuNumber - stuListLenOfB)
  // })
  // 3. 自动补全
  autoChooseFunc(unChooseStuList)
  const actualStuNumTeacherList = teacherList.map(item => {
    return {
      ...item,
      actualStuNum: getStuListByTeacherId(item.id).length
    }
  })
  console.log('teacher list is: ', actualStuNumTeacherList)
  console.log('stu length is: ', actualStuNumTeacherList.reduce((prev, item) => {
    prev += item.actualStuNum
    return prev
  }, 0))
}
/**
 * 自动补全系统
 */
function autoChooseFunc (unChooseStuList) {
  teacherList.forEach(teacher => {
    const actualStuNum = getStuListByTeacherId(teacher.id).length // 获取实际数量
    if (actualStuNum < teacher.stuNumber) { // 实际小于需求，添加一次
      if (unChooseStuList.length) {
        const stu = unChooseStuList.pop()
        tnsList.push({
          id: uuidV4(),
          teacherId: teacher.id,
          stuId: stu.id
        })
      }
    }
  })
  if (unChooseStuList.length) {
    autoChooseFunc(unChooseStuList)
  } else {
    return
  }
}
// autoCourseChoosing()
autoCourseChoosing()
