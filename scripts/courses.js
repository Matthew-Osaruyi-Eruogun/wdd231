// scripts/courses.js

// The Course List Array 
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: '...',
        technology: ['Python'],
        completed: true // Set to true if you completed this course
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: '...',
        technology: ['HTML', 'CSS'],
        completed: true

    },
     
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
                    'Python'
                ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
                    'C#'
                ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
                    'HTML',
                    'CSS',
                    'JavaScript'
                ],
        completed: true
    },
            
        

    // ... all 6 course objects here
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: '...',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false // Example of an uncompleted course
    }
];

// --- Rendering Function ---
function renderCourseCards(courseList) {
    const courseContainer = document.getElementById('course-cards');
    const totalCreditsElement = document.getElementById('total-credits');
    courseContainer.innerHTML = ''; // Clear existing cards

    courseList.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('course-card');

        // Style completed courses differently
        if (course.completed) {
            card.classList.add('completed');
        }

        card.innerHTML = `
            <p class="subject">${course.subject} ${course.number}</p>
            <h3 class="title">${course.title}</h3>
            <p class="credits">Credits: ${course.credits}</p>
        `;
        courseContainer.appendChild(card);
    });

    // --- Calculate Total Credits using Array.reduce() ---
    const totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsElement.textContent = totalCredits;
}


// --- Filtering Logic (using Array.filter()) ---
function filterCourses(subject = 'All') {
    let filteredList;

    if (subject === 'All') {
        filteredList = courses;
    } else {
        // Filter the array based on the subject property
        filteredList = courses.filter(course => course.subject === subject);
    }

    renderCourseCards(filteredList);
}

// --- Event Listeners and Initial Load ---
document.addEventListener('DOMContentLoaded', () => {
    // Initial Load: Display all courses
    filterCourses('All');

    // Event listeners for the filter buttons
    document.getElementById('filter-all').addEventListener('click', () => filterCourses('All'));
    document.getElementById('filter-cse').addEventListener('click', () => filterCourses('CSE'));
    document.getElementById('filter-wdd').addEventListener('click', () => filterCourses('WDD'));

    // Optional: Add logic to handle responsive navigation menu here if not in a separate file
    // Example: document.getElementById('menu-button').addEventListener('click', () => {
    //     document.getElementById('main-nav').classList.toggle('open');
    // });
});