let input = document.getElementById('student-input')

function getStudent () {
  let student = DATABASE.students
    .filter((student) => student.lastName.toLowerCase().includes(input.value))
    .map((student) => student.firstName + ' ' + student.lastName)
  return student
}

input.addEventListener('keyup', function () {
  let gotStudent = getStudent()
  let studentContainer = document.getElementById('student-container')
  studentContainer.innerHTML = ''
  runCreateStudentBox(gotStudent)

  if (input.value == 0) {
    studentContainer.innerHTML = ''
  }
})

function createStudentBox (student) {
  let studentContainer = document.getElementById('student-container')
  let studentDiv = document.createElement('div')
  studentDiv.classList.add('student-box')
  studentDiv.innerHTML = `
<h1 class="student-name">${student} (total: ${'hej'} credits)</h1>
<h2>Courses:</h2>
`
  studentContainer.appendChild(studentDiv)
}

function runCreateStudentBox (students) {
  for (let student of students) {
    createStudentBox(student)
  }
}
