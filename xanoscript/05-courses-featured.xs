// Get Featured Courses - Returns featured courses for homepage
// NOTE: module_count and lesson_count are stored fields on courses table
query courses/featured verb=GET {
  input {}

  stack {
    // Query featured courses
    db.query courses {
      where = $db.courses.featured == true
      sort = {courses.id: "desc"}
    } as $courses
  }

  response = $courses

  tags = ["courses"]
}
