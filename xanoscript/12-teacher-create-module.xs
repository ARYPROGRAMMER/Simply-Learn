// Teacher Create Module - Create a new module for a course (teachers only)
// NOTE: Enable "Requires Authentication" in Xano endpoint settings (select "users" table)
query "teacher/modules" verb=POST {
  api_group = "all endpoints"
  auth = "users"

  input {
    int course_id
    text title filters=trim
    text description?
    int order_index?
  }

  stack {
    // Get the course - teacher check built into query
    db.query courses {
      where = $db.courses.id == $input.course_id && $db.courses.teacher == $auth.id
    } as $courses
  
    precondition ($courses != null) {
      error_type = "inputerror"
      error = "Course not found or access denied."
    }
  
    // Get count of existing modules to auto-set order_index
    db.query modules {
      where = $db.modules.course == $input.course_id
    } as $existingModules
  
    // Create the module
    db.add modules {
      data = {
        created_at : "now"
        course     : $input.course_id
        title      : $input.title
        description: $input.description
        order_index: $input.order_index ?? $existingModules.length
      }
    } as $module

    // Update module_count on course
    db.edit courses {
      field_name = "id"
      field_value = $input.course_id
      data = {
        module_count: $existingModules.length + 1
      }
    }
  }

  response = {
    id         : $module.id
    course     : $module.course
    title      : $module.title
    description: $input.description
    order_index: $module.order_index
    created_at : $module.created_at
  }

  tags = ["teacher", "modules"]
}