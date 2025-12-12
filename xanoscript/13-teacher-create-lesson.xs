// Teacher Create Lesson - Create a new lesson for a module (teachers only)
// NOTE: Enable "Requires Authentication" in Xano endpoint settings (select "users" table)
// NOTE: Ownership check built into query - teacher must own the course
query "teacher/lessons" verb=POST {
  api_group = "all endpoints"
  auth = "users"

  input {
    int module_id
    text title filters=trim
    text slug filters=trim|lower
    text description?
    text content?
    text mux_playback_id?
    int duration?
    int order_index?
  }

  stack {
    // Get the module
    db.get modules {
      field_name = "id"
      field_value = $input.module_id
    } as $module
  
    precondition ($module != null) {
      error_type = "inputerror"
      error = "Module not found."
    }
  
    // Get the course and verify ownership in one query
    db.query courses {
      where = $db.courses.id == $module.course && $db.courses.teacher == $auth.id
    } as $courses
  
    precondition ($courses != null) {
      error_type = "accessdenied"
      error = "You can only add lessons to your own courses."
    }
  
    // Check if slug is unique
    db.get lessons {
      field_name = "slug"
      field_value = $input.slug
    } as $existingLesson
  
    precondition ($existingLesson == null) {
      error_type = "inputerror"
      error = "A lesson with this slug already exists."
    }
  
    // Get count of existing lessons in module
    db.query lessons {
      where = $db.lessons.module == $input.module_id
    } as $existingLessons
  
    // Create the lesson
    db.add lessons {
      data = {
        created_at     : "now"
        module         : $input.module_id
        title          : $input.title
        slug           : $input.slug
        description    : $input.description
        content        : $input.content
        mux_playback_id: $input.mux_playback_id
        duration       : $input.duration
        order_index    : $input.order_index ?? $existingLessons.length
      }
    } as $lesson

    // Update lesson_count on course
    db.edit courses {
      field_name = "id"
      field_value = $module.course
      data = {
        lesson_count: $courses[0].lesson_count + 1
      }
    }
  }

  response = {
    id             : $lesson.id
    module         : $lesson.module
    title          : $lesson.title
    slug           : $lesson.slug
    description    : $input.description
    content        : $input.content
    mux_playback_id: $input.mux_playback_id
    duration       : $input.duration
    order_index    : $input.order_index
    created_at     : $lesson.created_at
  }

  tags = ["teacher", "lessons"]
}
