// Mock data for the entire application

export const mockUsers = [
  {
    id: 1,
    username: 'admin@classin.com',
    full_name: 'Admin User',
    email: 'admin@classin.com',
    role: 'admin',
    avatar: 'A',
    is_active: 1
  },
  {
    id: 2,
    username: 'teacher@classin.com',
    full_name: 'John Teacher',
    email: 'teacher@classin.com',
    role: 'teacher',
    avatar: 'T',
    is_active: 1
  },
  {
    id: 3,
    username: 'student@classin.com',
    full_name: 'Jane Student',
    email: 'student@classin.com',
    role: 'student',
    avatar: 'S',
    is_active: 1
  }
];

export const mockClasses = [
  {
    id: 1,
    name: 'Mathematics 101',
    description: 'Introduction to Mathematics',
    teacher_id: 2,
    class_code: 'MATH101',
    is_active: 1,
    teacher_name: 'John Teacher'
  },
  {
    id: 2,
    name: 'Physics 101',
    description: 'Introduction to Physics',
    teacher_id: 2,
    class_code: 'PHYS101',
    is_active: 1,
    teacher_name: 'John Teacher'
  }
];

export const mockAssignments = [
  {
    id: 1,
    class_id: 1,
    title: 'Homework 1',
    description: 'Complete exercises 1-10',
    due_date: '2026-03-15',
    status: 'pending'
  },
  {
    id: 2,
    class_id: 1,
    title: 'Quiz 1',
    description: 'Chapter 1-3 quiz',
    due_date: '2026-03-20',
    status: 'pending'
  }
];

export const mockProgress = [
  {
    user_id: 3,
    class_id: 1,
    completion_percent: 65,
    assignments_completed: 5,
    assignments_total: 8
  },
  {
    user_id: 3,
    class_id: 2,
    completion_percent: 40,
    assignments_completed: 2,
    assignments_total: 5
  }
];

export const mockSessions = [
  {
    id: 1,
    class_id: 1,
    title: 'Introduction to Algebra',
    date: '2026-02-20',
    duration: '1 hour',
    status: 'completed'
  },
  {
    id: 2,
    class_id: 1,
    title: 'Linear Equations',
    date: '2026-02-27',
    duration: '1.5 hours',
    status: 'upcoming'
  }
];
