import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Course {
  name: string;
  description: string;
  status: 'Completed' | 'In Progress' | 'Not Started';
  duration: string;
  lessons: number;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  // Sample course data
  courses: Course[] = [
    {
      name: 'HTML & CSS',
      description: 'Learn the basics of creating and styling web pages.',
      status: 'Completed',
      duration: '5 hours',
      lessons: 15
    },
    {
      name: 'JavaScript Basics',
      description: 'Understand variables, functions, arrays and basic JavaScript.',
      status: 'In Progress',
      duration: '6 hours',
      lessons: 18
    },
    {
      name: 'SQL Fundamentals',
      description: 'Learn databases, SQL queries, tables and joins.',
      status: 'In Progress',
      duration: '4 hours',
      lessons: 12
    },
    {
      name: 'Angular Basics',
      description: 'Learn components, templates and data binding in Angular.',
      status: 'Not Started',
      duration: '4 hours',
      lessons: 10
    },
    {
      name: 'Aptitude Preparation',
      description: 'Practice quantitative aptitude and logical reasoning.',
      status: 'Completed',
      duration: '8 hours',
      lessons: 20
    },
    {
      name: 'Interview Skills',
      description: 'Improve communication and interview preparation skills.',
      status: 'Not Started',
      duration: '3 hours',
      lessons: 8
    }
  ];

  // Search and filter values
  searchText = '';
  selectedStatus = 'All Status';
  sortOrder = 'default';

  // Add course form
  showAddForm = false;

  // Selected course
  selectedCourse: Course | null = null;

  // New course
  newCourse: Course = {
    name: '',
    description: '',
    status: 'Not Started',
    duration: '',
    lessons: 0
  };


  // Total number of courses
  get totalCourses() {
    return this.courses.length;
  }


  // Completed courses
  get completedCourses() {
    return this.courses.filter(
      course => course.status === 'Completed'
    ).length;
  }


  // Courses in progress
  get inProgressCourses() {
    return this.courses.filter(
      course => course.status === 'In Progress'
    ).length;
  }


  // Courses not started
  get notStartedCourses() {
    return this.courses.filter(
      course => course.status === 'Not Started'
    ).length;
  }


  // Search, filter and sort courses
  get filteredCourses() {

    let result = this.courses.filter(course => {

      const search = this.searchText.toLowerCase();

      const nameMatch = course.name
        .toLowerCase()
        .includes(search);

      const descriptionMatch = course.description
        .toLowerCase()
        .includes(search);

      const statusMatch =
        this.selectedStatus === 'All Status' ||
        course.status === this.selectedStatus;

      return (nameMatch || descriptionMatch) && statusMatch;
    });


    // Sort A-Z
    if (this.sortOrder === 'az') {
      result = [...result].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }


    // Sort Z-A
    if (this.sortOrder === 'za') {
      result = [...result].sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    }

    return result;
  }


  // Open add course form
  openAddForm() {
    this.showAddForm = true;
  }


  // Close add course form
  closeAddForm() {
    this.showAddForm = false;
  }


  // Add a new course
  addCourse() {

    if (
      this.newCourse.name.trim() === '' ||
      this.newCourse.description.trim() === '' ||
      this.newCourse.duration.trim() === '' ||
      this.newCourse.lessons <= 0
    ) {
      alert('Please fill in all course details.');
      return;
    }

    this.courses.push({
      ...this.newCourse
    });

    // Clear the form
    this.newCourse = {
      name: '',
      description: '',
      status: 'Not Started',
      duration: '',
      lessons: 0
    };

    this.showAddForm = false;
  }


  // Show course details
  showCourseDetails(course: Course) {
    this.selectedCourse = course;
  }


  // Close course details
  closeCourseDetails() {
    this.selectedCourse = null;
  }


  // Start a course
  startCourse(course: Course) {

    if (course.status === 'Not Started') {
      course.status = 'In Progress';
    }

    this.selectedCourse = course;
  }
}