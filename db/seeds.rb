# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create!([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create!(name: 'Emanuel', city: cities.first)


DAYS = %w(SUN MON TUE WED THU FRI SAT)
INTERVALS = %w(MORNING AFTERNOON EVENING)
# NOTE: Having some issues with time being different when generated here, vs
# time when rails parses during the datetime_formatted validation. Wasn't
# happening before... now, have to offset by 1 to get it formatted right...
INTERVAL = {
  "ANY" => 0,
  "MORNING" => 8,
  "AFTERNOON" => 12,
  "EVENING" => 16
}

HOUR_TO_INTERVAL = {
  0 => "ANY",
  8 => "MORNING",
  12 => "AFTERNOON",
  16 => "EVENING"
}

INTERVALS_TIMECODE = [0, 8, 12, 16]
def random_title
  random_titles = [
    "#{Faker::Hacker.verb} the #{Faker::Hacker.adjective} #{Faker::Hacker.abbreviation}",
    "#{Faker::Hacker.noun}s. #{Faker::Hacker.verb} the #{Faker::Hacker.adjective} #{Faker::Hacker.abbreviation}",
    "#{Faker::Hacker.noun}s, #{Faker::Hacker.noun}s, and #{Faker::Hacker.noun}s",
    "#{Faker::Hacker.adjective} #{Faker::Hacker.noun} with a #{Faker::Hacker.adjective}",
    "#{Faker::Hacker.ingverb} a #{Faker::Hacker.adjective} #{Faker::Hacker.adjective} #{Faker::Hacker.noun}",
    "#{Faker::Hacker.ingverb} a #{Faker::Hacker.adjective} #{Faker::Hacker.noun}",
    "#{Faker::Hacker.verb} the #{Faker::Hacker.verb}",
    "#{Faker::Hacker.ingverb} #{Faker::Hacker.adjective} #{Faker::Hacker.noun}",
    "#{Faker::Hacker.noun}s, #{Faker::Hacker.noun}s, and a #{Faker::Hacker.adjective} #{Faker::Hacker.adjective} #{Faker::Hacker.noun}"
  ]
  random_titles[rand(random_titles.length)].capitalize
end

# ******************************************************************************
# NOTE: this function adds some variety to robot success on job completion for
# the simulated job assignments
def get_wage(skill)
  modulation = rand(0.05..0.35) * (rand(2) == 0 ? -1 : 1)
  wage = (rand(0.6..0.8) * skill + (skill * modulation))
  # debugger
  return wage < 10 ? 10 : wage
end
# ******************************************************************************

ActiveRecord::Base.transaction do

#   # NOTE: TEMPORARILY DISABLING SEED ROBOTS
#   # ****************************************************************************
#   # NOTE: generate NUM_ROBOTS random robots...
#   # ****************************************************************************
#   NUM_ROBOTS = 20
#   random_robots = []
#   NUM_ROBOTS.times do |x|
#     skill = rand(70..90);
#     random_robots << {
#       is_robot: true,
#       fname: Faker::Name.first_name,
#       lname: Faker::Name.last_name,
#       email: Faker::Internet.email,
#       password_digest: BCrypt::Password.create("password"),
#       bio: Faker::Lorem.sentences(rand(4..10), true).join(" "),
#       skill: skill,
#       wage: get_wage(skill).to_i
#     }
#   end
#   User.create!(random_robots)
#
#   # ****************************************************************************
#   # NOTE: ...and their corresponding work times.
#   # ****************************************************************************
#   (1..NUM_ROBOTS).each do |x|
#     user = User.find(x)
#     user_work_times = []
#     DAYS.each do |day|
#       INTERVALS.each do |interval|
#         user_work_times << { day: day, interval: interval } if rand > rand(0.4)
#       end
#     end
#     user.work_times.create!(user_work_times)
#   end
#
#   # ****************************************************************************
#   # NOTE: generate NUM_CLIENTS random clients
#   # ****************************************************************************
#   NUM_CLIENTS = 20
#   random_clients = []
#   NUM_CLIENTS.times do |x|
#     random_clients << {
#       is_robot: false,
#       fname: Faker::Name.first_name,
#       lname: Faker::Name.last_name,
#       email: Faker::Internet.email,
#       password_digest: BCrypt::Password.create("password"),
#       bio: Faker::Lorem.sentences(rand(4..10), true).join(" ")
#     }
#   end
#   User.create!(random_clients)
#
#
# # ******************************************************************************
# # NOTE: generating random tasks created by non robot users
# # ******************************************************************************
  MIN_CREATED_TASKS = 20
  MAX_CREATED_TASKS = 30

  MIN_ASSIGNED_TASKS = 10
  MAX_ASSIGNED_TASKS = 20

  MIN_REVIEWED_TASKS = 5
  MAX_REVIEWED_TASKS = 10
#
#   # NOTE: formats San Francisco addresses into usable array
#   lines = File.readlines("#{Rails.root}/db/sf_final_addresses.txt")
#   processed_addresses = []
#   lines.each do |line|
#     raw_line_entry = line.split(/[\t,\n]/)
#     processed_entry = []
#     raw_line_entry.each_with_index do |field, idx|
#       if idx == 0
#         address = field.split
#         address.each { |el| el.capitalize! }
#         processed_entry << address.join(" ")
#       else
#         processed_entry << field
#       end
#     end
#     processed_addresses << processed_entry
#   end
#
#   # NOTE: creates open tasks for each client user
#   ((NUM_ROBOTS + 1)..(NUM_ROBOTS + NUM_CLIENTS)).each do |x|
#     user = User.find(x)
#     rand(MIN_CREATED_TASKS..MAX_CREATED_TASKS).times do |x|
#       random_description_arr = []
#       rand(4..7).times { |x| random_description_arr.push(Faker::Hacker.say_something_smart)}
#       random_description = random_description_arr.join(" ")
#
#       rand_addr_raw = processed_addresses.sample
#       random_address = "#{rand_addr_raw[0]}, San Francisco, CA, #{rand_addr_raw[1]}"
#
#       random_datetime = Faker::Date.between(1.days.from_now, 20.days.from_now).to_time.utc.change(hour: INTERVALS_TIMECODE.sample)
#
#       user.created_tasks.create!([
#         {
#           title: random_title,
#           description: random_description,
#           location: random_address,
#           lat: rand_addr_raw[2],
#           lng: rand_addr_raw[3],
#           datetime: random_datetime,
#           wage: rand(20..80),
#           is_open: true
#         }
#       ])
#     end
#
#     # randomly assign user tasks to worker..
#     rand(MIN_ASSIGNED_TASKS..MAX_ASSIGNED_TASKS).times do |x|
#       pending_tasks = Task.where("creator_id = #{user.id}")
#       # pending_tasks = User.last.created_tasks.where(worker_id = nil)
#       task = pending_tasks[rand(pending_tasks.length)]
#       task_day = task.datetime.strftime("%a").upcase
#       task_hour = task.datetime.hour
#       task_interval = HOUR_TO_INTERVAL[task_hour]
#
#       all_workers = User.joins(:work_times).group("users.id").having("(count(user_id)) > 0")
#       valid_workers = []
#
#       all_workers.each do |worker|
#         canwork = []
#         if task_interval == "ANY"
#           canWork = worker.work_times.where('work_times.day = ?', task_day).references(:work_times)
#         else
#           canWork = worker.work_times.where('work_times.interval = ?', task_interval).where('work_times.day = ?', task_day).references(:work_times)
#         end
#         valid_workers.push(worker) if canWork.count > 0
#       end
#
#       task.worker = valid_workers[rand(valid_workers.length)]
#       task.save!
#       task.creator.send_message("AUTO-NOTIFICATION: I hired you for this task!", task)
#     end
#
#     # # assign reviews to those assigned Tasks
#     rand(MIN_REVIEWED_TASKS..MAX_REVIEWED_TASKS).times do |x|
#       assigned_tasks = user.created_tasks.select { |task| task.review == nil }
#       task = assigned_tasks.sample
#       description_arr = Faker::Lorem.sentences(rand(4..10), true)
#
#       # NOTE: THIS IS HACKY. FIND OUT WHY ASSIGNED_TASKS does not filter non-reviewed
#       # tasks appropriately
#       unless task.worker.nil?
#         # debugger
#         rand(2..3).times do
#           description_arr.push("#{task.worker.fname} #{Faker::Lorem.sentence.downcase}")
#         end
#         description = description_arr.shuffle!.join(" ")
#
#         # NOTE: rolls the dice for job success based on worker's skill attribute
#         chance_to_succeed = task.worker.skill
#         is_positive = chance_to_succeed > (rand * 100).to_i ? true : false
#         Review.create!([
#           {
#             task: task,
#             is_positive: is_positive,
#             description: description,
#             created_at: task.datetime + rand(1..3).days
#           }
#         ])
#       end
#     end
#   end
#

#   # ****************************************************************************
#   # NOTE: create Guest client user and created tasks
#   # ****************************************************************************
  user = User.create!([{
    is_robot: "false",
    fname: "Client",
    lname: "Guest",
    email: "client@guest.guest",
    password_digest: BCrypt::Password.create("password"),
    bio: "I am a guest client."
  }])
  # user = user.last
  #
  # # NOTE: generate some unassigned random tasks for the guest client user
  # rand(MIN_CREATED_TASKS..MAX_CREATED_TASKS).times do |x|
  #   random_description_arr = []
  #   rand(4..7).times { |x| random_description_arr.push(Faker::Hacker.say_something_smart)}
  #   random_description = random_description_arr.join(" ")
  #   rand_addr_raw = processed_addresses.sample
  #   random_address = "#{rand_addr_raw[0]}, San Francisco, CA, #{rand_addr_raw[1]}"
  #
  #   random_datetime = Faker::Date.between(1.days.from_now, 20.days.from_now)
  #     .to_time.utc.change(hour: INTERVALS_TIMECODE.sample)
  #
  #   user.created_tasks.create!([
  #     {
  #       title: random_title,
  #       description: random_description,
  #       location: random_address,
  #       lat: rand_addr_raw[2],
  #       lng: rand_addr_raw[3],
  #       wage: rand(20..100),
  #       is_open: true,
  #       datetime: random_datetime
  #     }
  #   ])
  # end
  #
  # # randomly assign guest client user tasks to workers
  # rand(MIN_ASSIGNED_TASKS..MAX_ASSIGNED_TASKS).times do |x|
  #   pending_tasks = Task.where("creator_id = #{user.id}").where("worker_id IS NULL")
  #   task = pending_tasks[rand(pending_tasks.length)]
  #   task_day = task.datetime.strftime("%a").upcase
  #   task_hour = task.datetime.hour
  #   task_interval = HOUR_TO_INTERVAL[task_hour]
  #
  #   all_workers = User.joins(:work_times).group("users.id").having("(count(user_id)) > 0")
  #   valid_workers = []
  #
  #   all_workers.each do |worker|
  #     canwork = []
  #     if task_interval == "ANY"
  #       canWork = worker.work_times.where('work_times.day = ?', task_day).references(:work_times)
  #     else
  #       canWork = worker.work_times.where('work_times.interval = ?', task_interval).where('work_times.day = ?', task_day).references(:work_times)
  #     end
  #     valid_workers.push(worker) if canWork.count > 0
  #   end
  #
  #   task.worker = valid_workers[rand(valid_workers.length)]
  #   task.wage = task.worker.wage
  #   # debugger
  #   task.save!
  #   task.creator.send_message("AUTO-NOTIFICATION: I hired you for this task!", task)
  # end
  #
  # # assign reviews to those assigned Tasks
  # rand(MIN_ASSIGNED_TASKS..MAX_ASSIGNED_TASKS).times do |x|
  #   assigned_tasks = user.created_tasks.select { |task| task.review == nil }
  #   task = assigned_tasks.sample
  #   description_arr = Faker::Lorem.sentences(rand(4..10), true)
  #
  #   # NOTE: THIS IS HACKY. FIND OUT WHY ASSIGNED_TASKS does not filter non-reviewed
  #   # tasks appropriately
  #   unless task.worker.nil?
  #     # debugger
  #     rand(2..3).times do
  #       description_arr.push("#{task.worker.fname} #{Faker::Lorem.sentence.downcase}")
  #     end
  #     description = description_arr.shuffle!.join(" ")
  #
  #     chance_to_succeed = task.worker.skill
  #     is_positive = chance_to_succeed > (rand * 100).to_i ? false : true
  #
  #     Review.create!([
  #       {
  #         task: task,
  #         is_positive: is_positive,
  #         description: description,
  #         created_at: task.datetime + rand(1..3).days
  #       }
  #     ])
  #   end
  # end

  # ****************************************************************************
  # NOTE: create Guest robot user. skill is only for random generation purposes
  # ****************************************************************************
  User.create!([{
    is_robot: "true",
    fname: "Robot",
    lname: "Guest",
    email: "robot@guest.guest",
    password_digest: BCrypt::Password.create("password"),
    bio: "I am a guest robot.",
    wage: 85,
    skill: 90
  }])
  guest_robot_user = User.last

  # NOTE: randomly generate Guest robot user's work times
  work_times = []
  DAYS.each do |day|
    INTERVALS.each do |interval|
      work_times << { day: day, interval: interval } if rand > rand(0.4)
    end
  end
  guest_robot_user.work_times.create!(work_times)

  # NOTE: randomly assign workable tasks to Guest robot
  # rand(MIN_ASSIGNED_TASKS..MAX_ASSIGNED_TASKS).times do |x|
  #   workable_tasks = guest_robot_user.workable_tasks(Task.where("worker_id IS NULL"))
  #   task = workable_tasks.sample
  #   task.worker_id = guest_robot_user.id
  #   task.wage = guest_robot_user.wage
  #   task.save!
  #   task.creator.send_message("AUTO-NOTIFICATION: I hired you for this task!", task)
  # end
  #
  # # NOTE: assign reviews to Guest robot's completed tasks
  # rand(MIN_REVIEWED_TASKS..MAX_REVIEWED_TASKS).times do |x|
  #   task = guest_robot_user.worked_tasks_in_progress.sample
  #   description_arr = Faker::Lorem.sentences(rand(4..10), true)
  #
  #   # NOTE: THIS IS HACKY. FIND OUT WHY ASSIGNED_TASKS does not filter non-reviewed
  #   # tasks appropriately
  #   rand(2..3).times do
  #     description_arr.push("#{task.worker.fname} #{Faker::Lorem.sentence.downcase}")
  #   end
  #   description = description_arr.shuffle!.join(" ")
  #
  #   # NOTE: rolls the dice for job success based on worker's skill attribute
  #   chance_to_succeed = task.worker.skill
  #   is_positive = chance_to_succeed > (rand * 100).to_i ? true : false
  #   Review.create!([
  #     {
  #       task: task,
  #       is_positive: is_positive,
  #       description: description,
  #       created_at: task.datetime + rand(1..3).days
  #     }
  #   ])
  # end
end
