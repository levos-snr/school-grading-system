// Dummy function to simulate report generation
function generateReport(reportType) {
    const displayArea = document.querySelector('.generated-report');
    displayArea.innerHTML = `<p>Generated report for ${reportType}</p>`;
}

// Function to show the form for adding a student
function showAddStudentForm() {
    const displayArea = document.querySelector('.generated-report');
    displayArea.innerHTML = `
        <h2>Add Student</h2>
        <form id="addStudentForm">
            <div class="form-group">
                <label for="studentName">Student Name</label>
                <input type="text" class="form-control" id="studentName" placeholder="Enter Student Name" required>
            </div>
            <div class="form-group">
                <label for="studentID">Student ID</label>
                <input type="text" class="form-control" id="studentID" placeholder="Enter Student ID" required>
            </div>
            <button type="button" class="btn btn-primary" onclick="addStudent()">Add Student</button>
        </form>
    `;
}

// Function to show the form for adding a course
function showAddCourseForm() {
    const displayArea = document.querySelector('.generated-report');
    displayArea.innerHTML = `
        <h2>Add Course</h2>
        <form id="addCourseForm">
            <div class="form-group">
                <label for="courseCode">Course Code</label>
                <input type="text" class="form-control" id="courseCode" placeholder="Enter Course Code" required>
            </div>
            <div class="form-group">
                <label for="courseName">Course Name</label>
                <input type="text" class="form-control" id="courseName" placeholder="Enter Course Name" required>
            </div>
            <div class="form-group">
                <label for="semester">Semester</label>
                <input type="text" class="form-control" id="semester" placeholder="Enter Semester" required>
            </div>
            <button type="button" class="btn btn-primary" onclick="addCourse()">Add Course</button>
        </form>
    `;
}
// Function to add a student
function addStudent() {
    const studentName = document.getElementById('studentName').value;
    const studentID = document.getElementById('studentID').value;

    fetch('http://localhost:3000/admin/add-student', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            studentName: studentName,
            studentId: studentID,
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(`Student added successfully: ${studentName} (${studentID})`);
            } else {
                alert('Error adding student. Please try again.');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Error adding student. Please try again.');
        });
}


// Function to add a course
function addCourse() {
    const courseCode = document.getElementById('courseCode').value;
    const courseName = document.getElementById('courseName').value;
    const semester = document.getElementById('semester').value;

    fetch('http://localhost:3000/admin/add-course', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            courseCode,
            courseName,
            semester,
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(`Course added successfully: ${courseCode} - ${courseName} (Semester ${semester})`);
            } else {
                alert('Error adding course. Please try again.');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Error adding course. Please try again.');
        });
}

// Function to show the form for adding a semester
function showAddSemesterForm() {
    const displayArea = document.querySelector('.generated-report');
    displayArea.innerHTML = `
        <h2>Add Semester</h2>
        <form id="addSemesterForm">
            <div class="form-group">
                <label for="semesterName">Semester Name</label>
                <input type="text" class="form-control" id="semesterName" placeholder="Enter Semester Name" required>
            </div>
            <div class="form-group">
                <label for="academicYear">Academic Year</label>
                <input type="text" class="form-control" id="academicYear" placeholder="Enter Academic Year" required>
            </div>
            <button type="button" class="btn btn-primary" onclick="addSemester()">Add Semester</button>
        </form>
    `;
}

// Function to add a semester
function addSemester() {
    const semesterName = document.getElementById('semesterName').value;
    const academicYear = document.getElementById('academicYear').value;

    fetch('http://localhost:3000/admin/add-semester', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            semesterName,
            academicYear,
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(`Semester added successfully: ${semesterName} (Academic Year ${academicYear})`);
            } else {
                alert('Error adding semester. Please try again.');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Error adding semester. Please try again.');
        });
}

// Function to show the form for adding a lecturer
function showAddLecturerForm() {
    const displayArea = document.querySelector('.generated-report');
    displayArea.innerHTML = `
        <h2>Add Lecturer</h2>
        <form id="addLecturerForm">
            <div class="form-group">
                <label for="lecturerName">Lecturer Name</label>
                <input type="text" class="form-control" id="lecturerName" placeholder="Enter Lecturer Name" required>
            </div>
            <div class="form-group">
                <label for="lecturerID">Lecturer ID</label>
                <input type="text" class="form-control" id="lecturerID" placeholder="Enter Lecturer ID" required>
            </div>
            <button type="button" class="btn btn-primary" onclick="addLecturer()">Add Lecturer</button>
        </form>
    `;
}

// Function to add a lecturer
function addLecturer() {
    const lecturerName = document.getElementById('lecturerName').value;
    const lecturerID = document.getElementById('lecturerID').value;

    fetch('http://localhost:3000/admin/add-lecturer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            lecturerName,
            lecturerID,
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(`Lecturer added successfully: ${lecturerName} (ID: ${lecturerID})`);
            } else {
                alert('Error adding lecturer. Please try again.');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Error adding lecturer. Please try again.');
        });
}
