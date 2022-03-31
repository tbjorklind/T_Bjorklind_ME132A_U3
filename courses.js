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

// get courses, and sort titles from a - z. -----------------
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
// ----------------------------------------------------

// set key up function on the input field -------------

function setKeyUp () {
  let input = document.getElementById('course-input')
  input.addEventListener('keyup', runCreateCourseBox)
}
// ----------------------------------------------------

// creates a box for each course and adds html, (course title and total credits)
function createCourseBox (course) {
  let courseContainer = document.getElementById('course-container')
  let courseBox = document.createElement('div')
  courseBox.classList.add('course-box')
  courseBox.innerHTML = `
  <h1 class="student-name">${course.title} (${course.totalCredits} credits)</h1>
  <h2>Students:</h2>
  `
  // event listener that shows/hides courseStudentBox and courseTeacherBox when user clicks.
  courseBox.addEventListener('click', function () {
    if (
      courseStudentBox.style.display === 'block' &&
      courseTeacherBox.style.display === 'block'
    ) {
      courseStudentBox.style.display = 'none'
      courseTeacherBox.style.display = 'none'
    } else {
      courseStudentBox.style.display = 'block'
      courseTeacherBox.style.display = 'block'
    }
  })

  // creates a box with all students that studied the course,
  // makes student divs and adds html (name, passed credits, semester, year).

  let courseStudentBox = document.createElement('div')
  courseStudentBox.classList.add('course-student-box')

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
  // creates teacher-box, and teacher-divs and adds html (name and post)
  let courseTeacherBox = document.createElement('div')
  courseTeacherBox.classList.add('teacher-box')

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
  courseContainer.appendChild(courseBox)
  courseBox.appendChild(courseStudentBox)
  courseBox.appendChild(courseTeacherBox)
}

// ----------------------------------------------------

// "goes through" all courses and call on functions
function runCreateCourseBox () {
  let courseContainer = document.getElementById('course-container')
  let courses = getCourse()
  courseContainer.innerHTML = ''

  for (let course of courses) {
    createCourseBox(course)
  }
}
// ----------------------------------------------------

// call on function -----------------------------------
setKeyUp()
