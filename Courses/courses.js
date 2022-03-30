'use strict'

function createCourseBox (course, credits) {
  let courseContainer = document.getElementById('course-container')
  let div = document.createElement('div')
  div.classList.add('course-box')
  div.innerHTML = `
  <h1 class="student-name">${course.title} (${course.totalCredits} credits)</h1>
  `
  courseContainer.appendChild(div)
}

function getCourse () {
  let input = document.getElementById('course-input')
  let courses = DATABASE.courses
    .filter(course =>
      course.title.toLowerCase().includes(input.value.toLowerCase())
    )
    .map(course => course)
    .sort(function (a, b) {
      if (a.title < b.title) {
        return -1
      }
      if (a.title > b.title) {
        return 1
      }
      return 0
    })
  return courses
}

function setKeyUp () {
  let input = document.getElementById('course-input')
  input.addEventListener('keyup', runCreateCourseBox)
}

function runCreateCourseBox () {
  let courseContainer = document.getElementById('course-container')
  let courses = getCourse()
  courseContainer.innerHTML = ''

  for (let course of courses) {
    createCourseBox(course)
    getStudentNames(course)
    createTeacherDivs(course)
  }
}

function getStudentNames (course) {
  let courseContainer = document.getElementById('course-container')
  let courseStudentBox = document.createElement('div')
  courseStudentBox.classList.add('course-student-box')
  courseContainer.appendChild(courseStudentBox)
  courseStudentBox.innerHTML = `
  <h2>Students:</h2>
  `
  let students = DATABASE.students
  for (let student of students) {
    for (let studentCourse of student.courses) {
      if (course.courseId == studentCourse.courseId) {
        let div = document.createElement('div')
        div.classList.add('course-student')
        div.innerHTML = `
                        <p>${student.firstName + ' ' + student.lastName} (${
          studentCourse.passedCredits
        } credits)</p>
                        <p>${studentCourse.started.semester} ${
          studentCourse.started.year
        }</p>
            `
        if (course.totalCredits == studentCourse.passedCredits) {
          div.style.background = 'rgb(111, 121, 111)'
        }
        courseStudentBox.appendChild(div)
      }
    }
  }
}


function createTeacherDivs (course) {
  let teacherBox = document.getElementById('course-container')
  let courseTeacherBox = document.createElement('div')
  courseTeacherBox.classList.add('teacher-box')
  teacherBox.appendChild(courseTeacherBox)
  courseTeacherBox.innerHTML = `
<h2> Teachers and <span>course responsible:</span></h2>
  `
  let teachers = DATABASE.teachers
  for (let teacher of teachers) {
    for (let courseTeacher of course.teachers)
      if (teacher.teacherId == courseTeacher) {
        let div = document.createElement('div')
        div.classList.add('course-teacher')
        div.innerHTML = `<p>${teacher.firstName + ' ' + teacher.lastName} (${
          teacher.post
        })</p>`
        if (course.courseResponsible === teacher.teacherId) {
          div.style.background = 'rgb(123, 110, 110)'
        }
        courseTeacherBox.appendChild(div)
      }
  }
}
setKeyUp()
