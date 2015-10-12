# RoboTask

[Heroku link][heroku] **NB:** This should be a link to your production site

[heroku]: http://link.pending.com

## Minimum Viable Product

RoboTask is a web application inspired by Task Rabbit built using Ruby on Rails
and React.js. Hire robots to do stuff for you. Or, Sign up as a robot to do
stuff for people and earn some credits.

RoboTask allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create accounts
- [ ] Handle sessions (log in/log out)
- [ ] Create, view, edit, and delete tasks
- [ ] Receive recommendations for which robot to hire to fulfill a task
- [ ] View qualified robot profiles and manually select one to perform a task
- [ ] Mark tasks as completed and rate assigned robot's performance (good/bad)
- [ ] Receive notifications (canceled job, found fulfiller, new reviews of self, etc.)
- [ ] as task fulfiller, select capable task types, robot qualifications, and available datetimes
- [ ] as task fulfiller, accept/cancel assigned task. Send notification messages to task giver.

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication and JSON API, Task Model and JSON API, Tasktypes and Qualifications Model  (2 days)

Phase 1: Build user account signup and login authentication using BCrypt. On
login users are directed to the landing page. Here, users see a form to create
a new task, as well as the option to sign up as a worker (User.is_worker). I
will then create the Task mode, JSON API and ApiActions.

I will then create the Tasktype and Qualification models which will allow tasks
to have one Tasktype (ex: delivery, guard duty, etc.) and many Qualifications
(ex: jetpack, extra storage modules, cloaking, etc.). Worker users, choose which
Tasktypes they can perform and what qualities they have.

I will create a User JSON API to filter worker users based on Tasktype and
Qualification to help task-worker-assignment. Basic forms will be created to
submit worker user TaskType/Qualification details to the database.

By the end of this phase, users will be able to create an account, log in,
create, view, and edit their created tasks, as well as mark them as
completed (successfully or not). Worker users will be able to view which tasks
are available for fulfillment. Task creator (and later, worker user) of a task can
cancel a task by marking it completed with a "false" is_successful attribute.

[Details][phase-one]

###
### Phase 2: Flux Architecture, Views, Stores, Routes. Task CRUD (2.5 days)

Phase 2: I will set up the Flux architecture, Stores, React Router and Views for
the base application. First, I will set up the User and Task store. The user
store will track worker user availability based on TaskTypes, Qualifications,
and datetimes. The task store will track which Tasks are open for fulfillment
based on the same three criteria.

Next, I will create the React View to display all available workers for a given
task (WorkerIndex), which consists of several workers (WorkerIndexItem).
A React View to display all available tasks for a given worker user will be
shown with the (TasksIndex), which consists of several tasks (TaskIndexItem).

I will create forms (TaskForm, WorkerUserForm) to let users submit and accept
tasks, respectively. Task creators can submit the task without choosing a
worker user (TaskBestChoice), or can select a particular qualified worker
user(TaskChooseWorker).

[Details][phase-two]

### Phase 3: Add style with Bootstrap and add seed data (0.5 days)

Phase 3: I will use bootstrap to create a consistent style and flow to the
application. I will add seed data to populate the user database, tasktypes,
qualifications. I will also add tasks having colorful flavor text.

[Details][phase-three]

### Phase 4: Add notification/message system (2 days)

Phase 4: I will add a notification system that is triggered when a task is
assigned to a worker user and when a task is completed. After an assignment
event, a notification will be automatically sent from the task creator to the
worker user, and vice versa, as a reminder for an accepted contract. When a task
is marked as completed (whether finished successfully or canceled), a
notification is sent to the task creator and worker user. Users will be able to
mark notifications as read, hidden, and deleted.

This involves creating a Notifications model, JSON Api and ApiActions, Store and
React view. Notification deletions from the database will be determined at the
model level, when both sender and receiver mark it as deleted. Integrate as a
drop down menu.

[Details][phase-four]

### Phase 5: Add review system (2 days)

Phase 5: I will add a review system for tasks. When a task is completed, the
task creator can rate the respective worker's job performance and fill in an
optional review text component. These reviews will feed into the worker user
show page as an overall satisfaction percentage to help task creators choose
which worker user to select for a task.  

[Details][phase-five]

### Phase 6: Styling Cleanup and addtional seeding (1 day)

Phase 6: Adjust CSS of specific elements to have better application flow. Add
additional transitions where to frequently accessed elements. Add more seed data
as necessary.

### Phase 7 (Bonus): Allow worker users to view all tasks on map in particular geofence (default: circular)

Phase 7: Use Google Maps API to allow worker users to view all available tasks
based on location. Can filter tasks based on certain TaskTypes, Qualifications,
and datetimes.

### Bonus Features (TBD)
- [ ] Make nicer transitions
- [ ] Task creators can schedule tasks to be fulfilled on a periodic basis (daily, weekly, etc.)
- [ ] Task fulfillers can view a map that displays tasks via google maps API and allows task view on click
- [ ] Task fulfillers can automatically adjust payrate depending on which qualifications are requested
- [ ] Task fulfillers can separate availability datetimes based on task type

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
