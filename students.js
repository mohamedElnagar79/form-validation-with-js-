window.addEventListener('load', function () {
  let studentNameTextObj = document.querySelector('input[name=studentName]')
  let StudentGradeTextObj = document.querySelector('input[name=studentGrade]')
  let addBtnObj = document.querySelector('input[type= button]')
  let nameErrorTextObj = document.querySelector('#nameError')
  let gradeErrorTextObj = document.querySelector('#gardeError')
  let checkGradeTextObj = document.querySelector('#checkGrade')
  let emptyGradeTextObj = document.querySelector('#emptyGrade')

  let studentsTable = document.createElement('table')
  this.document.body.append(studentsTable)
  let studentsArray = []
 studentsTable.addEventListener("click",function(event){
   let fName= event.target.parentElement.parentElement.firstChild.innerText;
   if(event.target.localName == "button"){
        event.target.parentElement.parentElement.remove()
   }
   for (let i in studentsArray)
     if (fName == studentsArray[i].studentName){
       studentsArray.splice(i,1)
     }
})


  //   to check user name
  studentNameTextObj.addEventListener('blur', function () {
    if (studentNameTextObj.value == '') {
      nameErrorTextObj.classList.remove('hide')
    } else nameErrorTextObj.classList.add('hide')
  })
  //   to check if the user enter string on userGrade input
  StudentGradeTextObj.addEventListener('keypress', function (event) {
    if (isNaN(event.key)) {
      event.preventDefault()
      gradeErrorTextObj.classList.remove('hide')
    } else {
      gradeErrorTextObj.classList.add('hide')
    }
  })

  //   to check if the user enter value >100 or <0
  StudentGradeTextObj.addEventListener('blur', function () {
    if (StudentGradeTextObj.value > 100 || StudentGradeTextObj.value < 0) {
      checkGradeTextObj.classList.remove('hide')
      emptyGradeTextObj.classList.add('hide')
    } else if (StudentGradeTextObj.value == '') {
      emptyGradeTextObj.classList.remove('hide')
      checkGradeTextObj.classList.add('hide')
    } else {
      checkGradeTextObj.classList.add('hide')
      emptyGradeTextObj.classList.add('hide')
    }
  })

  // to add elements to table   "add btn"
  addBtnObj.addEventListener('click', function (event) {
    // push input to array
    let flag = false
    for (let item of studentsArray) {
      if (item.studentName == studentNameTextObj.value) {
        flag = true
      }
    }
    if (flag == true || !isNaN(studentNameTextObj.value ) ) {
      nameErrorTextObj.classList.remove('hide')
    } else if (
      studentNameTextObj.value == '' ||
      StudentGradeTextObj.value == ''
    ) {
      event.preventDefault()
    } else {
      studentsArray.push({
        studentName: studentNameTextObj.value,
        studentGrade: StudentGradeTextObj.value
      })

      // select department to change table style
      let selectDepart = document.querySelector(
        'input[name=Department]:checked'
      )
      // create tr
      let tableTr = document.createElement('tr')
      studentsTable.append(tableTr)
      tableTr.classList.add(selectDepart.value)

      //  create td and push input to table
      let tableTd = document.createElement('td')
      tableTd.innerText = studentNameTextObj.value
      tableTr.append(tableTd)

      tableTd = document.createElement('td')
      tableTd.innerText = StudentGradeTextObj.value
      tableTr.append(tableTd)

      //  to push delete btn
      tableTd = document.createElement('td')
      let deleteBtn = document.createElement('button')
      deleteBtn.innerText = 'Delete'
      tableTd.append(deleteBtn)
      tableTr.append(tableTd)

     
    }
  }) // end of add btn event listner

  let sortObj = document.querySelector('select[name=sortStudents]')
  // sort
  sortObj.addEventListener('change', function () {
    if (sortObj.value == 'name') {
      studentsArray.sort(function (s, t) {
        var a = s.studentName.toLowerCase()
        var b = t.studentName.toLowerCase()
        if (a < b) return -1
        if (a > b) return 1
        return 0
      })
      studentsTable.innerHTML = ''
      for (let item of studentsArray) {
        // add tr
        let tableTr = document.createElement('tr')
        studentsTable.append(tableTr)
        // add td
        let tableTd = document.createElement('td')
        tableTd.innerText = item.studentName
        tableTr.append(tableTd)
        tableTd = document.createElement('td')
        tableTd.innerText = item.studentGrade
        tableTr.append(tableTd)

        //  to push delete btn
        tableTd = document.createElement('td')
        deleteBtn = document.createElement('button')
        deleteBtn.innerText = 'Delete'
        tableTd.append(deleteBtn)
        tableTr.append(tableTd)      
      }
    } else if (sortObj.value == 'none') {
      return
    } else if (sortObj.value == 'grade') {
      studentsArray.sort(function (s, t) {
        var a = parseInt(s.studentGrade)
        var b = parseInt(t.studentGrade)
        return a - b
      })
      studentsTable.innerHTML = ''
      for (let item of studentsArray) {
        // add tr
        let tableTr = document.createElement('tr')
        studentsTable.append(tableTr)
        // add td
        let tableTd = document.createElement('td')
        tableTd.innerText = item.studentName
        tableTr.append(tableTd)
        tableTd = document.createElement('td')
        tableTd.innerText = item.studentGrade
        tableTr.append(tableTd)
        //  to push delete btn
        tableTd = document.createElement('td')
        deleteBtn = document.createElement('button')
        deleteBtn.innerText = 'Delete'
        tableTd.append(deleteBtn)
        tableTr.append(tableTd)
      }
    }
  })
  // end of sort
  // filter
  let filter = document.querySelector('select[name=filterStudents]')
  filter.addEventListener('change', function () {
    if (filter.value == 'success') {
      for (let item in studentsArray) {
        if (studentsArray[item].studentGrade <= 60) {
          studentsTable.childNodes[item].classList.add('hide')
        } else studentsTable.childNodes[item].classList.remove('hide')
      }
    } else if (filter.value == 'fail') {
      for (let item in studentsArray) {
        if (studentsArray[item].studentGrade > 60) {
          studentsTable.childNodes[item].classList.add('hide')
        } else studentsTable.childNodes[item].classList.remove('hide')
      }
    } else if (filter.value == 'all') {
      for (let item in studentsArray) {
        studentsTable.childNodes[item].classList.remove('hide')
      }
    }
  })
})
