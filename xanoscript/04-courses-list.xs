// Get All Courses - Returns list of all courses
// NOTE: module_count and lesson_count are stored fields on courses table
query courses verb=GET {
  input {}

  stack {
    // Query all courses
    db.query courses {
      sort = {courses.id: "desc"}
    } as $courses
  }

  response = $courses

  tags = ["courses"]
}
