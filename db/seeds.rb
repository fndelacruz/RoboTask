# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create!([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create!(name: 'Emanuel', city: cities.first)


DAYS = %w(SUN MON TUE WED THU FRI SAT)
INTERVALS = %w(MORNING AFTERNOON EVENING)
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

def generate_random_bio_line
  [
    "I worked for #{rand(2..40)} years as a #{FFaker::Job.title}.",
    "I worked as a #{FFaker::Job.title} for #{rand(2..40)} years.",
    "#{FFaker::Job.title} was my job title for #{rand(2..40)} years.",
    "I am highly skilled in #{FFaker::Sport.name}.",
    "I enjoy #{FFaker::Sport.name}.",
    "I'm saving up to buy a new #{FFaker::Product.product_name}.",
    "I really need a new #{FFaker::Product.product_name}.",
    "I am fluent in #{FFaker::Locale.language}.",
    "I was a #{FFaker::Locale.language} translator for #{rand(2..40)} years.",
    "I am fond of #{random_object}s.",
    "I dislike #{random_object}s.",
    "Occasionally, I like to eat a #{FFaker::Food.ingredient}.",
    "I cannot tolerate #{FFaker::Food.ingredient}.",
    "I specialize in #{FFaker::Skill.specialty}.",
    "#{FFaker::Skill.specialty} comes easy to me.",
    "#{FFaker::Product.product_name}s scare me.",
    "I own a #{random_vehicle}.",
    "I enjoy #{FFaker::Sport.name} whenever I can.",
    "#{random_object}s baffle me.",
    "I would like #{random_object}, but I like #{random_object} even more.",
    "I wish I was named #{FFaker::Name.name}.",
    "#{FFaker::Name.name} is my favorite actor.",
    "I love watching #{FFaker::Name.name} perform live.",
    "I once met #{FFaker::Name.name} at a #{FFaker::Sport.name} match.",
    "I wish I was more like #{FFaker::Name.name}.",
    "I like the color #{FFaker::Color.name}.",
    "My dream is to own a #{[random_vehicle, random_object, random_food_object].sample}.",
    "I carry a #{random_container} of #{random_object}s wherever I go.",
    "I am known for my premium #{random_car_part}.",
    "I am augmented with extra #{random_object}s.",
    "Sorry, I can't work with #{random_object}s.",
    "I am the new #{FFaker::Name.name} bot.",
    "I don't work with #{random_object}s.",
    "#{random_object.capitalize}s interfere with my circuity.",
    "You may pay me in #{random_object}s.",
    "I can accept #{random_object}s or #{random_object}s as payment.",
    "I work faster if you give me a #{random_object}.",
    "I can't work with #{random_object.capitalize}s.",
    "#{FFaker::Name.name} bots are my mortal enemy.",
    "I cooperate well with #{FFaker::Name.name} and #{FFaker::Name.name} bots.",
    "I cannot work alongside #{FFaker::Name.name} bots."
  ].sample
end

def random_bio
  bio = []
  rand(3..5).times do
    bio << generate_random_bio_line
  end
  bio.join(" ")
end


def random_review(is_good)
  random_good_reviews = [
    "Great job. Finished the job #{rand(2..5)} hours early.",
    "Was excellent at #{FFaker::Sport.name}.",
    "Very good at #{FFaker::Skill.specialty}!",
    "#{FFaker::Skill.specialty} is this one's specialty.",
    "Found my lost #{FFaker::Food.ingredient}!",
    "Bought some gourmet #{FFaker::Food.ingredient} thanks!.",
    "A+++",
    "A+++++++++",
    "Great job!",
    "I think his years as a #{FFaker::Job.title} really helped.",
    "I think her years as a #{FFaker::Job.title} really helped.",
    "I'm a lot better at #{FFaker::Sport.name} now.",
    "I really liked his #{random_object}.",
    "I really liked her #{random_object}.",
  ]
  random_bad_reviews = [
    "Finished the job #{rand(2..5)} hours too late.",
    "Was #{rand(3..8)} hours late to the task site.",
    "Didn't really know how to play #{FFaker::Sport.name}.",
    "Did not have experience with #{FFaker::Skill.specialty}.",
    "Claimed to be an expert at #{FFaker::Skill.specialty}. Lies!",
    "Did not deliver.",
    "I was promised a #{FFaker::Food.ingredient}. I got a #{FFaker::Food.ingredient} instead.",
    "I want a refund",
    "I don't think he really was a #{FFaker::Job.title} for #{rand(2..10)} years...",
    "#{FFaker::Job.title} expert? I don't think so...",
    "I don't think she really was a #{FFaker::Job.title} for #{rand(2..10)} years...",
    "I don't like his #{random_object}.",
    "I don't like her #{random_object}.",
  ]
  if is_good
    random_good_reviews.sample
  else
    random_bad_reviews.sample
  end
end
# ******************************************************************************
# NOTE: this function adds some variety to robot success on job completion for
# the simulated job assignments

def random_skill
  rand(70..90)
end

def random_wage(skill)
  modulation = rand(0.05..0.35) * (rand(2) == 0 ? -1 : 1)
  wage = (rand(0.6..0.8) * skill + (skill * modulation))
  return wage < 10 ? 10 : wage.to_i
end

# ******************************************************************************
def random_object
  [
    "#{FFaker::Product.product}",
    "#{FFaker::Product.product_name}",
    "#{FFaker::Product.brand} #{FFaker::Product.product}",
    "#{FFaker::Product.brand} #{FFaker::Product.product_name}",
    "#{FFaker::Product.model} #{FFaker::Product.product}",
    "#{FFaker::Product.model} #{FFaker::Product.product_name}",
    "#{FFaker::Food.fruit}",
    "#{FFaker::Food.herb_or_spice}",
    "#{FFaker::Food.ingredient}",
    "#{FFaker::Food.meat}",
    "#{FFaker::Food.vegetable}",
  ].sample
end

def random_food_object
  [
    "#{FFaker::Food.fruit}",
    "#{FFaker::Food.herb_or_spice}",
    "#{FFaker::Food.ingredient}",
    "#{FFaker::Food.meat}",
    "#{FFaker::Food.vegetable}"
  ].sample
end

def random_movie_rating
  %w(R PG PG-13 G).sample
end

def random_container
  %w(package box envelope container drum backpack sack bag satchel truckload trunk chest coffer carton vessel pouch).sample
end

def random_car_part
  %w(steering\ wheel windows seat trunk hood engine transmission brakes tank catalytic\ converter radio shifter carpet wheels air\ filter exhaust\ pipe fuel\ tank carburetor).sample
end

def random_vehicle
  "#{FFaker::Vehicle.year} #{FFaker::Vehicle.make} #{FFaker::Vehicle.model}"
end

def random_job_title
  "#{FFaker::Job.title}"
end

def random_job_generator(location)
  job_ed = ["repaired", "fixed", "cleaned", "demolished", "overhauled", "painted", "washed", "adjusted"]
  jobs = [
    {"Wait in line" => [
      "Wait in line here to buy me a #{random_object}.",
      "Wait in line to buy me a #{random_object}.",
      "Please wait at #{location} to pick up a #{random_object}.",
      "Stand in line to pickup my tickets to the #{FFaker::Name.name} show.",
      "Hold my spot in line at the #{%w(bank amusement\ park supermarket produce\ stand movie\ theater electronics\ store).sample}."
      ]},
    {"Find a lost item" => [
      "Please help me find my lost #{random_object}.",
      "Someone stole my #{random_object}. I last saw it at #{location}.",
      "I can't find my #{random_object}. Can you help me find it?",
      "Misplaced my #{random_object}. I need it found ASAP.",
      "I'm looking for my lost #{random_object} and #{random_object}.",
      "#{random_object} missing. Need help ASAP!!"
      ]},
    {"Buy me a product" => [
      "I need a new #{random_object}. Please get me one with a #{random_object}.",
      "Pick up a #{random_object} at the #{%w(store office pier).sample} for me.",
      "#{random_object} and a #{random_object} needed ASAP.",
      "Please buy me a #{random_object} in a #{random_object}. I need it with extra #{random_object}s.",
      "Need some #{random_food_object} for my #{%w(breakfast lunch dinner).sample}."
    ]},
    {"Cook me something" => [
      "Please make me a #{random_food_object} and #{random_food_object} sandwich.",
      "Make me a #{random_food_object} #{%w(pizza stew chili sausage burger soup pie).sample} with extra #{random_food_object}s.",
      "Cook me some #{random_food_object} #{%w(soup waffles pancakes eggs omelettes).sample}.",
      "Please boil me some #{random_food_object}s and #{random_food_object}s.",
      "I would like a #{random_food_object} #{%w(pie tart burrito casserole taco).sample}.",
    ]},
    {"Help with language" => [
      "I need a #{FFaker::Locale.language} tutor to help me pass my class.",
      "Need a #{FFaker::Locale.language} to #{FFaker::Locale.language} translator.",
      "#{FFaker::Locale.language} professor needed for local research project.",
      "#{FFaker::Locale.language} to #{FFaker::Locale.language} translator needed.",
      "Need a #{FFaker::Locale.language} to #{FFaker::Locale.language} translator with #{rand(2..10)} years experience.",
      "Need a #{FFaker::Locale.language} translator to translate some ancient texts.",
      "#{FFaker::Locale.language} linguist needed to teach #{["my mom", "my friend", "my daughter", "my son", "my dad", "my cousin"].sample}.",
      "Need a robot versed in #{FFaker::Locale.language} sign language."
    ]},
    {"Deliver something" => [
      "I have a #{rand(2..200)} #{FFaker::UnitEnglish.mass_name} #{random_container} to deliver to #{location}.",
      "#{rand(2..200)} #{random_container} of #{random_object}s need to be delivered to #{location}.",
      "#{random_container.capitalize} of #{random_object} needs to be delivered to #{location}.",
      "A #{rand(2..200)} #{FFaker::UnitEnglish.mass_name} #{random_container} needs to be picked up from #{location} and be delivered to a secret location.",
      "Fast courier needed to deliver a #{random_container} of #{random_object}s.",
      "#{random_object} transporter needed. Please bring your own #{random_container}.",
      "#{random_container.capitalize} of #{random_object}s need to be delivered to #{location}."
    ]},
    {"Build a website" => [
      "Need a coder with #{rand(5..10)}+ years experience with #{FFaker::Skill.specialty}.",
      "#{FFaker::Skill.tech_skill} coder needed. Will be doing a lot of #{FFaker::Skill.specialty}.",
      "#{FFaker::Skill.specialty} expert needed. Experience with #{FFaker::Skill.tech_skill} and #{FFaker::Skill.tech_skill} is necessary.",
      "#{FFaker::Skill.tech_skill} expert needed for a #{FFaker::Skill.specialty} project.",
      "Expert with #{FFaker::Skill.tech_skill} and #{FFaker::Skill.tech_skill} needed for some #{FFaker::Skill.specialty}.",
      "#{%w(Junior Senior).sample} #{FFaker::Skill.specialty} designer needed to program in #{FFaker::Skill.tech_skill}."
    ]},
    {"Repair a vehicle" => [
      "My #{random_vehicle}'s #{random_car_part} stopped working, need a repair bot.",
      "The #{random_car_part} on my #{random_vehicle} needs a tune-up.",
      "Need someone to repair my #{random_vehicle}'s broken #{random_car_part}.",
      "I broke my #{random_vehicle}'s #{random_car_part}. Need a repair-bot ASAP.",
      "My #{random_vehicle}'s #{random_car_part} and #{random_car_part} stopped working. Help!",
      "I need help installing a #{random_car_part} in my #{random_vehicle}.",
      "My hover #{random_vehicle} stopped working. Please help!"
    ]},
    {"Sport trainer needed" => [
      "Need a good #{FFaker::Sport.name} trainer to help prepare for #{%w(a\ competition the\ olympics an\ upcoming match the\ big\ leagues).sample}.",
      "#{FFaker::Sport.name} expert needed to teach #{%w(me my\ son my\ daughter my\ friend ).sample}.",
      "#{FFaker::Sport.name} and #{FFaker::Sport.name} master needed to help me up my game.",
      "Champion level #{FFaker::Sport.name} expert needed to entertain at my #{%w(school birthday\ party engagement\ party wedding graduation).sample}.",
      "Amateur #{FFaker::Sport.name} robot needed to practice my moves.",
      "#{FFaker::Sport.name} profesional neeeded to critique my skill.",
      "One on one #{FFaker::Sport.name} training needed ASAP!"
    ]},
    {"Find me a movie" => [
      "Rent me a good movie, something like a #{random_movie_rating}-rated #{FFaker::Movie.title}.",
      "#{FFaker::Movie.title} needed for a party.",
      "Please find a good #{random_movie_rating} movie to play at my #{%w(wedding party social\ gathering).sample}.",
      "Id like to watch a movie like #{FFaker::Movie.title} and #{FFaker::Movie.title}.",
      "I need a copy of #{FFaker::Movie.title}.",
      "Looking for a movie like #{FFaker::Movie.title}, but #{random_movie_rating} rated.",
      "#{random_movie_rating} rated movie needed for a local event. Something like #{FFaker::Movie.title} or #{FFaker::Movie.title}.",
    ]},

    {"Hacker needed" => [
      "#{Faker::Hacker.say_something_smart} #{Faker::Hacker.say_something_smart} #{Faker::Hacker.say_something_smart}.",
      "#{Faker::Hacker.say_something_smart} #{Faker::Hacker.say_something_smart}.",
      "#{Faker::Hacker.say_something_smart} #{Faker::Hacker.say_something_smart} #{Faker::Hacker.say_something_smart} #{Faker::Hacker.say_something_smart}."
    ]},
    {"General help" => [
      "Making some art. I need a #{random_object} in a #{random_container}.",
      "Need help stuffing a #{random_object} into a #{random_container}.",
      "Please fix my broken #{random_object}.",
      "My #{random_object} needs a new #{random_object}, but I'm not sure what to do.",
      "There are too many #{random_object}s on my lawn. Please pack them in a #{random_container} and get rid of them.",
      "Need help hiding a #{random_object}. I have a #{random_container} full of #{random_object}s that might help.",
      "Need help digging some #{random_object}s that I buried in a #{random_container}.",
      "I found a locked #{random_container}. I think it might have #{random_object}s and #{random_object}s. Help me unlock it!",
      "My security #{random_object} got stolen. Please get me a new one.",
      "Need a #{random_container} of #{random_object}s to replace my #{random_object}."
    ]}
  ]
    job = jobs.sample
    job_title = job.keys[0]

    description = [job.values[0].sample]
    rand(2..4).times { |_| description << job_flavor_text }

    description = description.join(" ")

    { title: job_title, description: description }
end

def job_flavor_text
  [
      "Could take #{rand(2..14)} hours, please be prepared.",
      "Please bring a #{random_object}.",
      "No #{FFaker::Name.first_name} or #{FFaker::Name.first_name} robots.",
      "Bringing a #{random_object} and a #{random_object} could come handy.",
      "FYI, I am allergic to #{random_food_object}s and #{random_food_object}s.",
      "#{random_object} bonus if done well.",
      "Please bring a #{random_object}.",
      "Do not apply if you own a #{random_vehicle}.",
      "Knowledge of #{FFaker::Sport.name} is a plus.",
      "Experience with #{FFaker::Skill.specialty} is crucial.",
      "Please bring an empty #{random_container}.",
      "A #{random_container} of #{random_object}s is required.",
      "Priority given to #{random_vehicle} owners.",
      "Bonus #{random_object} if job done well.",
      "Please don't bring a #{random_container} of #{random_object}s.",
      "No #{random_object}s or #{random_object}s!",
      "A #{random_car_part} module should suffice.",
      "#{FFaker::Skill.tech_skill} knowledge is preferred, but not necessary.",
      "Experience as a #{random_job_title} would be great!",
      "#{random_job_title}s need not apply!",
      "No #{FFaker::Name.last_name} robots please.",
      "#{FFaker::Name.last_name} or #{FFaker::Name.first_name} robots are preferred.",
      "#{FFaker::Name.first_name} robots are preferred.",
      "Special consideration given to #{random_job_title}s.",
      "Driving a #{random_vehicle} would really help.",
      "Please don't bring #{random_object}s in #{random_container}s.",
      "Experience using #{random_food_object} is a plus. Using #{random_food_object}? Even better!",
      "Attention to #{%w(time detail skill your\ battery\ level temperature spatial\ awareness).sample} is critical.",

    ].sample
end



ActiveRecord::Base.transaction do

  # ****************************************************************************
  # NOTE: generate NUM_ROBOTS random robots...
  # ****************************************************************************
  NUM_ROBOTS = 40

  random_robots = []
  NUM_ROBOTS.times do |x|
    skill = random_skill
    random_robots << {
      is_robot: true,
      fname: FFaker::Name.first_name,
      lname: FFaker::Name.last_name,
      email: FFaker::Internet.email,
      password_digest: BCrypt::Password.create("password"),
      bio: random_bio,
      skill: skill,
      wage: random_wage(skill)
    }
  end
  User.create!(random_robots)

  # ****************************************************************************
  # NOTE: ...and their corresponding work times.
  # ****************************************************************************
  (1..NUM_ROBOTS).each do |x|
    user = User.find(x)
    user_work_times = []
    DAYS.each do |day|
      INTERVALS.each do |interval|
        user_work_times << { day: day, interval: interval } if rand > rand(0.4)
      end
    end
    user.work_times.create!(user_work_times)
  end

  # ****************************************************************************
  # NOTE: generate NUM_CLIENTS random clients
  # ****************************************************************************
  NUM_CLIENTS = 40
  random_clients = []
  NUM_CLIENTS.times do |x|
    random_clients << {
      is_robot: false,
      fname: FFaker::Name.first_name,
      lname: FFaker::Name.last_name,
      email: FFaker::Internet.email,
      password_digest: BCrypt::Password.create("password"),
    }
  end
  User.create!(random_clients)


# # ******************************************************************************
# # NOTE: generating random tasks created by non robot users
# # ******************************************************************************
  SIZE_FACTOR = 1
  MIN_CREATED_TASKS = 20 * SIZE_FACTOR
  MAX_CREATED_TASKS = 25 * SIZE_FACTOR

  MIN_ASSIGNED_TASKS = 15 * SIZE_FACTOR
  MAX_ASSIGNED_TASKS = 20 * SIZE_FACTOR

  MIN_REVIEWED_TASKS = 10 * SIZE_FACTOR
  MAX_REVIEWED_TASKS = 15 * SIZE_FACTOR

  # NOTE: formats San Francisco addresses into usable array
  lines = File.readlines("#{Rails.root}/db/sf_final_addresses.txt")
  processed_addresses = []
  lines.each do |line|
    raw_line_entry = line.split(/[\t,\n]/)
    processed_entry = []
    raw_line_entry.each_with_index do |field, idx|
      if idx == 0
        address = field.split
        address.each { |el| el.capitalize! }
        processed_entry << address.join(" ")
      else
        processed_entry << field
      end
    end
    processed_addresses << processed_entry
  end

  # NOTE: creates open tasks for each client user
  ((NUM_ROBOTS + 1)..(NUM_ROBOTS + NUM_CLIENTS)).each do |x|
    user = User.find(x)
    rand(MIN_CREATED_TASKS..MAX_CREATED_TASKS).times do |x|
      rand_addr_raw = processed_addresses.sample
      random_address = "#{rand_addr_raw[0]}, San Francisco, CA, #{rand_addr_raw[1]}"
      random_datetime = Faker::Date.between(1.days.from_now, 20.days.from_now).to_time.utc.change(hour: INTERVALS_TIMECODE.sample)

      job = random_job_generator(random_address)
      user.created_tasks.create!([
        {
          title: job[:title],
          description: job[:description],
          location: random_address,
          lat: rand_addr_raw[2],
          lng: rand_addr_raw[3],
          datetime: random_datetime,
          wage: rand(20..80),
          is_open: true
        }
      ])
    end

    # randomly assign user tasks to worker..
    rand(MIN_ASSIGNED_TASKS..MAX_ASSIGNED_TASKS).times do |x|
      pending_tasks = Task.where("creator_id = #{user.id}")
      # pending_tasks = User.last.created_tasks.where(worker_id = nil)
      task = pending_tasks[rand(pending_tasks.length)]
      task_day = task.datetime.strftime("%a").upcase
      task_hour = task.datetime.hour
      task_interval = HOUR_TO_INTERVAL[task_hour]

      all_workers = User.joins(:work_times).group("users.id").having("(count(user_id)) > 0")
      valid_workers = []

      all_workers.each do |worker|
        canwork = []
        if task_interval == "ANY"
          canWork = worker.work_times.where('work_times.day = ?', task_day).references(:work_times)
        else
          canWork = worker.work_times.where('work_times.interval = ?', task_interval).where('work_times.day = ?', task_day).references(:work_times)
        end
        valid_workers.push(worker) if canWork.count > 0
      end

      task.worker = valid_workers.sample
      task.save!
      # task.creator.send_message("AUTO-NOTIFICATION: I hired you for this task!", task)
    end

    # # assign reviews to those assigned Tasks
    rand(MIN_REVIEWED_TASKS..MAX_REVIEWED_TASKS).times do |x|
      assigned_tasks = user.created_tasks.select { |task| task.review == nil }
      task = assigned_tasks.sample

      unless task.worker.nil?

        # NOTE: rolls the dice for job success based on worker's skill attribute
        is_positive = task.worker.skill > (rand * 100).to_i ? true : false
        Review.create!([
          {
            task: task,
            is_positive: is_positive,
            description: random_review(is_positive),
            created_at: task.datetime + rand(1..3).days
          }
        ])
      end
    end
  end


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
  user = user.last

  # NOTE: generate some unassigned random tasks for the guest client user
  rand(MIN_CREATED_TASKS..MAX_CREATED_TASKS).times do |x|
    rand_addr_raw = processed_addresses.sample
    random_address = "#{rand_addr_raw[0]}, San Francisco, CA, #{rand_addr_raw[1]}"

    random_datetime = Faker::Date.between(1.days.from_now, 20.days.from_now)
      .to_time.utc.change(hour: INTERVALS_TIMECODE.sample)

    job = random_job_generator(random_address)

    user.created_tasks.create!([
      {
        title: job[:title],
        description: job[:description],
        location: random_address,
        lat: rand_addr_raw[2],
        lng: rand_addr_raw[3],
        wage: rand(20..100),
        is_open: true,
        datetime: random_datetime
      }
    ])
  end

  # randomly assign guest client user tasks to workers
  rand(MIN_ASSIGNED_TASKS..MAX_ASSIGNED_TASKS).times do |x|
    pending_tasks = Task.where("creator_id = #{user.id}").where("worker_id IS NULL")
    task = pending_tasks[rand(pending_tasks.length)]
    task_day = task.datetime.strftime("%a").upcase
    task_hour = task.datetime.hour
    task_interval = HOUR_TO_INTERVAL[task_hour]

    all_workers = User.joins(:work_times).group("users.id").having("(count(user_id)) > 0")
    valid_workers = []

    all_workers.each do |worker|
      canwork = []
      if task_interval == "ANY"
        canWork = worker.work_times.where('work_times.day = ?', task_day).references(:work_times)
      else
        canWork = worker.work_times.where('work_times.interval = ?', task_interval).where('work_times.day = ?', task_day).references(:work_times)
      end
      valid_workers.push(worker) if canWork.count > 0
    end

    task.worker = valid_workers.sample
    task.save!
    # task.creator.send_message("AUTO-NOTIFICATION: I hired you for this task!", task)
  end

  # assign reviews to those assigned Tasks
  rand(MIN_ASSIGNED_TASKS..MAX_ASSIGNED_TASKS).times do |x|
    assigned_tasks = user.created_tasks.select { |task| task.review == nil }
    task = assigned_tasks.sample

    # NOTE: FIND OUT WHY ASSIGNED_TASKS does not filter non-reviewed
    # tasks appropriately
    unless task.worker.nil?
      is_positive = task.worker.skill > (rand * 100).to_i ? false : true
      Review.create!([
        {
          task: task,
          is_positive: is_positive,
          description: random_review(is_positive),
          created_at: task.datetime + rand(1..3).days
        }
      ])
    end
  end

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

  # # NOTE: randomly assign workable tasks to Guest robot
  rand(MIN_ASSIGNED_TASKS..MAX_ASSIGNED_TASKS).times do |x|
    workable_tasks = guest_robot_user.workable_tasks(Task.where("worker_id IS NULL"))
    task = workable_tasks.sample
    task.worker_id = guest_robot_user.id
    task.save!
    # task.creator.send_message("AUTO-NOTIFICATION: I hired you for this task!", task)
  end

  # NOTE: assign reviews to Guest robot's completed tasks
  rand(MIN_REVIEWED_TASKS..MAX_REVIEWED_TASKS).times do |x|
    task = guest_robot_user.worked_tasks_in_progress.sample
    # NOTE: rolls the dice for job success based on worker's skill attribute
    is_positive = task.worker.skill > (rand * 100).to_i ? true : false
    Review.create!([
      {
        task: task,
        is_positive: is_positive,
        description: random_review(is_positive),
        created_at: task.datetime + rand(1..3).days
      }
    ])
  end
end
