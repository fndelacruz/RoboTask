### Phase 1: User Authentication, Task, Tasktypes and Qualifications Model, Task and User API
## Rails
### Models
* User
* Task
* Tasktypes
* Qualifications

### Controllers
* UsersController (create, update, show, new)
* SessionsController (create, new, destroy)
* Api::TaskController (create, index, show, update)
* Api::UserController (index, edit)

### Views
* users/new.html.erb
* session/new.html.erb
* tasks/index.json.jbuilder
* tasks/show.json.jbuilder
* users/index.json.jbuilder

## Flux
### Views (React Components)

### Stores

### Actions

### ApiUtil

* task creator relevant
* ApiUtil.createTask (-> Api::TaskController:create)
* ApiUtil.fetchAllCreatedTasks (-> Api::TaskController:index)
* ApiUtil.fetchRelevantWorkers (-> Api::UserControler:index)

* worker user relevant
* ApiUtil.fetchRelevantUnassignedTasks (-> Api::TaskController:index)
* ApiUtil.fetchAllWorkedTasks (-> Api::TaskController:index)
* ApiUtil.editWorkerProfile (-> Api::UserController:edit)

* all users
* ApiUtil.editTask (-> Api::TaskController:update)
* ApiUtil.fetchTask (-> Api::TaskController:show)

## Gems/Libraries
* BCrypt
