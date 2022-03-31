'use strict'

// white, yellow and green theme -----------------

let selector = document.querySelector('#theme-selector')
selector.addEventListener('change', changeTheme)
let cssRoot = document.querySelector(':root')

window.addEventListener('load', function (event) {
  setTheme()
})

function changeTheme () {
  localStorage.setItem('theme', selector.value)
  if (selector.value == 'white') {
    setWhiteTheme()
  } else if (selector.value == 'yellow') {
    setYellowTheme()
  } else if (selector.value == 'green') {
    setGreenTheme()
  }
}

function setTheme () {
  let theme = localStorage.getItem('theme')
  if (theme == 'white') {
    setWhiteTheme()
  } else if (theme == 'yellow') {
    setYellowTheme()
  } else if (selector.value == 'green') {
    setGreenTheme()
  }
}
function setWhiteTheme () {
  cssRoot.style.setProperty('--backColor', 'rgb(235, 232, 228)')
}

function setYellowTheme () {
  cssRoot.style.setProperty('--backColor', 'rgb(182, 144, 88)')
}

function setGreenTheme () {
  cssRoot.style.setProperty('--backColor', 'rgb(118, 131, 118)')
}

// ----------------------------------------------------

// get students, and sort from a - z. -----------------

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
// ----------------------------------------------------

// set key up function on the input field -------------

function setKeyUp () {
  let input = document.getElementById('student-input')
  input.addEventListener('keyup', runCreateStudentBox)
}
// ----------------------------------------------------

// creates a box for each student and adds html, (students name and total credits),
function createStudentBox (student, credits) {
  let studentContainer = document.getElementById('student-container')
  let studentBox = document.createElement('div')
  studentBox.classList.add('student-box')
  studentBox.innerHTML = `
<h1 class="student-name">${student.firstName +
    ' ' +
    student.lastName} (total: ${credits} credits)</h1>
<h2>Courses:</h2>
`
  // event listener that shows/hides studentCourseBox when user clicks.
  studentBox.addEventListener('click', function () {
    if (studentCourseBox.style.display === 'block') {
      studentCourseBox.style.display = 'none'
    } else {
      studentCourseBox.style.display = 'block'
    }
  })
  // creates divs for each course and adds html, (title, semester, year, passed and total credits).
  let studentCourseBox = document.createElement('div')
  studentCourseBox.classList.add('student-course-box')

  for (let studentCourse of student.courses) {
    for (let courseCourse of DATABASE.courses) {
      if (studentCourse.courseId == courseCourse.courseId) {
        let div = document.createElement('div')
        div.classList.add('student-course')
        div.innerHTML = `
                  <p>${courseCourse.title}</p>
                  <p>${studentCourse.started.semester} ${studentCourse.started.year} (${studentCourse.passedCredits} of ${courseCourse.totalCredits} credits)</p>
                </div>
      `
        if (studentCourse.passedCredits == courseCourse.totalCredits) {
          div.style.background = 'rgb(191, 154, 106)'
        }
        studentCourseBox.appendChild(div)
      }
    }
  }
  studentContainer.appendChild(studentBox)
  studentBox.appendChild(studentCourseBox)
  return
}
// ----------------------------------------------------

// "goes through" all students and call on functions
function runCreateStudentBox () {
  let studentContainer = document.getElementById('student-container')
  let students = getStudent()
  studentContainer.innerHTML = ''

  for (let student of students) {
    let credits = getTotalCredits(student.courses)
    createStudentBox(student, credits)
    // getCourseTitle(student)
  }
}
// ----------------------------------------------------

// get students total credit
function getTotalCredits (courses) {
  let studentTotalCredits = 0
  courses.forEach(course => {
    studentTotalCredits += course.passedCredits
  })
  return studentTotalCredits
}
// ----------------------------------------------------

// call on function -----------------------------------
setKeyUp()
