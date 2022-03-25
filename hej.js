'use strict'

function getStudent () {
  let input = document.getElementById('student-input')
  let students = DATABASE.students
    .filter(student =>
      student.lastName.toLowerCase().includes(input.value.toLowerCase())
    )
    .map(student => student)
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
  }
}

function getTotalCredits (courses) {
  let studentTotalCredits = 0
  courses.forEach(course => {
    studentTotalCredits += course.passedCredits
  })
  return studentTotalCredits
}

setKeyUp()
