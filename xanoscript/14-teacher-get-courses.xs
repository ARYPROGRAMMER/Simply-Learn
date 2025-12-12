// Teacher Get My Courses - Get all courses created by the teacher
// NOTE: Enable "Requires Authentication" in Xano endpoint settings (select "users" table)
// NOTE: module_count and lesson_count are stored fields on courses table
query "teacher/courses" verb=GET {
  api_group = "all endpoints"
  auth = "users"

  input {}

  stack {
    // Get all courses by this teacher
    db.query courses {
      where = $db.courses.teacher == $auth.id
      sort = {courses.created_at: "desc"}
    } as $courses
  }

  response = $courses

  tags = ["teacher", "courses"]
}
