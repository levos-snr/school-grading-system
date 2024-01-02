function submitAssignmentScores() {
    const courseID = document.getElementById('courseIDAssignment').value;
    const studentID = document.getElementById('studentIDAssignment').value;
    const assignment1 = document.getElementById('assignment1').value;
    const assignment2 = document.getElementById('assignment2').value;
 
    // Validate the inputs
    if (!courseID || !studentID || !assignment1 || !assignment2) {
        alert('All fields are required.');
        return;
    }

    
 
    // Submit the scores
  fetch('http://localhost:3000/scores', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      courseID,
      studentID,
      assignment1,
      assignment2,
    }),
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch((error) => console.error('Error:', error));
}
 
 
 function submitCatScores() {
    const courseID = document.getElementById('courseIDCat').value;
    const studentID = document.getElementById('studentIDCat').value;
    const cat1 = document.getElementById('cat1').value;
    const cat2 = document.getElementById('cat2').value;
 
    // Validate the inputs
    if (!courseID || !studentID || !cat1 || !cat2) {
        alert('All fields are required.');
        return;
    }
 
    // Submit the scores
  fetch('http://localhost:3000/scores', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      courseID,
      studentID,
      cat1,
      cat2,
    }),
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch((error) => console.error('Error:', error));
}
 
 function submitExamScore() {
    const courseID = document.getElementById('courseIDExam').value;
    const studentID = document.getElementById('studentIDExam').value;
    const exam = document.getElementById('exam').value;
 
    // Validate the inputs
    if (!courseID || !studentID || !exam) {
        alert('All fields are required.');
        return;
    }
 
    // Submit the scores
  fetch('http://localhost:3000/scores', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      courseID,
      studentID,
      exam,
      
    }),
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch((error) => console.error('Error:', error));
}