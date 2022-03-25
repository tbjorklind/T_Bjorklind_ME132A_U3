'use strict'

function getStudent () {
  let input = document.getElementById('student-input')
  let students = DATABASE.students
    .filter(student =>
      student.lastName.toLowerCase().includes(input.value.toLowerCase())
    )
    .map(student => student)
    .sort(function (a, b) {
      if (a.firstName < b.firstName) {
        return -1
      }
      if (a.firstName > b.firstName) {
        return 1
      }
      return 0
    })
  return students
}

function setKeyUp () {
  let input = document.getElementById('student-input')
  input.addEventListener('keyup', runCreateStudentBox)
}

function createStudentBox (student, credits) {
  let studentContainer = document.getElementById('student-container')
  let div = document.createElement('div')
  div.classList.add('student-box')
  div.innerHTML = `
<h1 class="student-name">${student.firstName +
    ' ' +
    student.lastName} (total: ${credits} credits)</h1>
<h2>Courses:</h2>
`
  studentContainer.appendChild(div)
}

function runCreateStudentBox () {
  let studentContainer = document.getElementById('student-container')
  let students = getStudent()
  studentContainer.innerHTML = ''

  for (let student of students) {
    let credits = getTotalCredits(student.courses)
    createStudentBox(student, credits)
    getCourseTitle(student)
  }
}

function getTotalCredits (courses) {
  let studentTotalCredits = 0
  courses.forEach(course => {
    studentTotalCredits += course.passedCredits
  })
  return studentTotalCredits
}
//and courses total credits, 
function getCourseTitle (student) {
  let studentContainer = document.getElementById('student-container')
  let studentCourseBox = document.createElement('div')
  studentCourseBox.classList.add('student-course-box')
  studentContainer.appendChild(studentCourseBox)

  for (let studentCourse of student.courses) {
    for (let courseCourse of DATABASE.courses) {
      if (studentCourse.courseId == courseCourse.courseId) {

        let div = document.createElement('div')
        div.classList.add('student-course')
        div.innerHTML =
        `
                  <p>${courseCourse.title}</p>
                  <p>${studentCourse.started.semester} ${studentCourse.started.year} (${studentCourse.passedCredits
                  } of ${courseCourse.totalCredits} credits)</p>
                </div>
      `
      if (studentCourse.passedCredits == courseCourse.totalCredits){
        div.style.background = "rgb(191, 154, 106)";
      }
        studentCourseBox.appendChild(div)
      }
    }
  } return
  }

setKeyUp()
