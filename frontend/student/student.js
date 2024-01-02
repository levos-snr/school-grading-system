var totalRegisteredCoursesSemester1 = 0;
var totalRegisteredCoursesSemester2 = 0;
var currentAcademicYear = 1;

// Function to fetch courses from the server and populate dropdowns
function populateCourseDropdowns() {
    fetch(`http://localhost:3000/courses`)
        .then(response => response.json())
        .then(data => {
            // Populate dropdowns for Semester 1
            populateDropdownOptions('Semester1', data);
            // Populate dropdowns for Semester 2
            populateDropdownOptions('Semester2', data);
        })
        .catch(error => {
            console.error('Error fetching courses:', error);
        });
}

// Call the function to populate course dropdowns on page load
populateCourseDropdowns();

// Function to populate dropdown options
function populateDropdownOptions(semester, courses) {
    var courseCodeDropdown = document.getElementById('courseCode' + semester);
    var courseNameDropdown = document.getElementById('courseName' + semester);

    // Clear existing options
    courseCodeDropdown.innerHTML = '';
    courseNameDropdown.innerHTML = '';

    // Add options for each dropdown
    courses.forEach(course => {
        var optionCode = document.createElement('option');
        optionCode.value = course.courseCode;
        optionCode.text = course.courseCode;
        courseCodeDropdown.add(optionCode);

        var optionCourse = document.createElement('option');
        optionCourse.value = course.courseName;
        optionCourse.text = course.courseName;
        courseNameDropdown.add(optionCourse);
    });
}

function registerCourse(semester) {
    var studentName, studentID, courseCode, courseName;

    // Get student details
    if (semester === 'semester1') {
        studentName = document.getElementById('studentNameSemester1').value;
        studentID = document.getElementById('studentIDSemester1').value;
        courseCode = document.getElementById('courseCodeSemester1').value;
        courseName = document.getElementById('courseNameSemester1').value;
    } else if (semester === 'semester2') {
        studentName = document.getElementById('studentNameSemester2').value;
        studentID = document.getElementById('studentIDSemester2').value;
        courseCode = document.getElementById('courseCodeSemester2').value;
        courseName = document.getElementById('courseNameSemester2').value;
    } else {
        return; // Invalid semester
    }

    // Check if the student exists, if not, add the student
    fetch(`http://localhost:3000/student/${studentID}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(student => {
            if (!student) {
                // Student does not exist, add the student
                return fetch(`http://localhost:3000/student`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        studentName: studentName,
                        studentId: studentID,
                    }),
                });
            }
            return Promise.resolve();
        })
        .then(() => {
            // Check if the course exists, if not, add the course
            return fetch(`http://localhost:3000/courses/${courseCode}`)
        })
        .then(response => response.json())
        .then(course => {
            if (!course) {
                // Course does not exist, add the course
                return fetch(`http://localhost:3000/courses`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        courseCode: courseCode,
                        courseName: courseName,
                    }),
                });
            }
            return Promise.resolve();
        })
        .then(() => {
            // Enforce registration limits for each semester
            var totalRegisteredCourses = (semester === 'semester1') ? totalRegisteredCoursesSemester1 : totalRegisteredCoursesSemester2;
            if (totalRegisteredCourses >= 5) {
                alert("You have reached the maximum limit of 5 courses for this semester.");
                return;
            }

            // Increment the total registered courses for the semester
            if (semester === 'semester1') {
                totalRegisteredCoursesSemester1++;
            } else if (semester === 'semester2') {
                totalRegisteredCoursesSemester2++;
            }

            // Enforce total academic year limit
            if (totalRegisteredCoursesSemester1 + totalRegisteredCoursesSemester2 > 10) {
                alert("You have reached the maximum limit of 10 courses for the academic year.");
                // Rollback the increment for the semester
                if (semester === 'semester1') {
                    totalRegisteredCoursesSemester1--;
                } else if (semester === 'semester2') {
                    totalRegisteredCoursesSemester2--;
                }
                return;
            }

            // Create a list item for the registered course
            var listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.textContent = courseCode + ' - ' + courseName + ' - ' + semester.charAt(0).toUpperCase() + semester.slice(1) + ' (Year ' + currentAcademicYear + ')';

            // Append the list item to the registered courses list based on the semester
            if (semester === 'semester1') {
                document.getElementById('registeredCoursesListSemester1').appendChild(listItem);
                updateTotalCoursesMessage('semester1');
                // Clear the form inputs for Semester 1
                document.getElementById('studentNameSemester1').value = '';
                document.getElementById('studentIDSemester1').value = '';
                document.getElementById('courseCodeSemester1').value = '';
                document.getElementById('courseNameSemester1').value = '';
            } else if (semester === 'semester2') {
                document.getElementById('registeredCoursesListSemester2').appendChild(listItem);
                updateTotalCoursesMessage('semester2');
                // Clear the form inputs for Semester 2
                document.getElementById('studentNameSemester2').value = '';
                document.getElementById('studentIDSemester2').value = '';
                document.getElementById('courseCodeSemester2').value = '';
                document.getElementById('courseNameSemester2').value = '';
            }

            // Send a POST request to register the course in the database
            return fetch(`http://localhost:3000/student/register-course`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    studentId: studentID,
                    semester: semester,
                    courseCode: courseCode,
                    courseName: courseName,
                }),
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Check for success or error in the response
            if (data.success) {
                alert('Course registered successfully!');
            } else {
                alert('Error registering course. Please try again.');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            console.log('Status:', error.response.status);
            console.log('Status Text:', error.response.statusText);
            alert('Error registering course. Please try again.');
        });
}

function updateTotalCoursesMessage(semester) {
    var totalCoursesMessage = "Total Registered Courses - " + semester.charAt(0).toUpperCase() + semester.slice(1) + ": " +
        ((semester === 'semester1') ? totalRegisteredCoursesSemester1 : totalRegisteredCoursesSemester2);

    document.getElementById('totalCoursesMessage' + semester.charAt(0).toUpperCase() + semester.slice(1)).textContent = totalCoursesMessage;
}
