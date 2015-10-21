# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create!([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create!(name: 'Emanuel', city: cities.first)

# User1 is a task creator
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

ActiveRecord::Base.transaction do
  User.create!([
    {
      fname: Faker::Name.first_name,
      lname: Faker::Name.last_name,
      email: Faker::Internet.email,
      password_digest: BCrypt::Password.create("password"),
      bio: "user1 bio"
    }
  ])

  User.last.created_tasks.create!([
    {
      title: "Need more catfood",
      description: "Please deliver some cat food to me, in 2 days anytime. I prefer salmon.",
      location: "555 Cat Lane",
      datetime: (Time.now.utc + 2.days).change(hour: 0)
    },
    {
      title: "Need baloons",
      description: "I need some balloons tomorrow morning. need quickly!",
      location: "task2 location",
      datetime: (Time.now.utc + 1.days).change(hour: 8)
    }
  ])

  # User2 is a task creator
  User.create!([
    {
      fname: Faker::Name.first_name,
      lname: Faker::Name.last_name,
      email: Faker::Internet.email,
      password_digest: BCrypt::Password.create("password"),
      bio: "user2 bio"
    }
  ])
  User.last.created_tasks.create!([
    {
      title: "Lost Dog",
      description: "Please help my find my dog, sometime next week in the afternoon. I lost him in the park. Anytime is fine.",
      location: "532 Candy St.",
      datetime: (Time.now.utc + 2.days).change(hour: 0)
    }
  ])

  # User3 is a worker who works on weekdays, anytime
  User.create!([
    {
      fname: Faker::Name.first_name,
      lname: Faker::Name.last_name,
      email: Faker::Internet.email,
      password_digest: BCrypt::Password.create("password"),
      bio: "I like to work on the weekdays, anytime."
    }
  ])

  (1..5).each do |day_idx|
    (0..2).each do |interval_idx|
      User.last.work_times.create!([
        {
          day: DAYS[day_idx],
          interval: INTERVALS[interval_idx]
        }
      ])
    end
  end

  # User4 is a worker who works on weekends, anytime
  User.create!([
    {
      fname: Faker::Name.first_name,
      lname: Faker::Name.last_name,
      email: Faker::Internet.email,
      password_digest: BCrypt::Password.create("password"),
      bio: "I like to work on the weekends, anytime."
    }
  ])

  [0, 6].each do |day_idx|
    (0..2).each do |interval_idx|
      User.last.work_times.create!([
        {
          day: DAYS[day_idx],
          interval: INTERVALS[interval_idx]
        }
      ])
    end
  end

  # User5 is a worker who works on mon, wed, fri, in the evenings
  User.create!([
    {
      fname: Faker::Name.first_name,
      lname: Faker::Name.last_name,
      email: Faker::Internet.email,
      password_digest: BCrypt::Password.create("password"),
      bio: "I work evenings on mon, wed, fri."
    }
  ])

  [1,3,5].each do |day_idx|
    [2].each do |interval_idx|
      User.last.work_times.create!([
        {
          day: DAYS[day_idx],
          interval: INTERVALS[interval_idx]
        }
      ])
    end
  end

  # User6 is a worker who works on tues, thurs, sat, in the morning and afternoon
  User.create!([
    {
      fname: Faker::Name.first_name,
      lname: Faker::Name.last_name,
      email: Faker::Internet.email,
      password_digest: BCrypt::Password.create("password"),
      bio: "I work mornings and afternoons, tues, thurs and sat."
    }
  ])

  [2, 4, 6].each do |day_idx|
    [0, 1].each do |interval_idx|
      User.last.work_times.create!([
        {
          day: DAYS[day_idx],
          interval: INTERVALS[interval_idx]
        }
      ])
    end
  end

  # User7 is a worker who works only on sunday mornings
  User.create!([
    {
      fname: Faker::Name.first_name,
      lname: Faker::Name.last_name,
      email: Faker::Internet.email,
      password_digest: BCrypt::Password.create("password"),
      bio: "I work sunday morning. yep."
    }
  ])

  [0].each do |day_idx|
    [0].each do |interval_idx|
      User.last.work_times.create!([
        {
          day: DAYS[day_idx],
          interval: INTERVALS[interval_idx]
        }
      ])
    end
  end

#
# NOTE: Historical Reviews Population
#

# NOTE: User1's past reviewed tasks
  worker = User.find(3)
  User.find(1).created_tasks.create!([
    {
      title: "Lost dog",
      description: "Please find my dog. I lost him last week. He was roaming around the park then he chased an ice cream truck. I never saw him again.",
      location: "The park",
      datetime: (Time.now.utc - 7.days).change(hour: 0),
      worker: worker
    }
  ])
  Review.create!([
    {
      task: Task.last,
      is_positive: true,
      description: "#{worker.fname} found my dog! A+++ would hire again.",
      created_at: (Time.now.utc - 7.days).change(hour: 0)
    }
  ])

  worker = User.find(6)
  User.find(1).created_tasks.create!([
    {
      title: "Need some popsicles",
      description: "Please fetch me some popsicles. Any flavor is fine. Please drop by in the afternoon",
      location: "6200 Mission st.",
      datetime: (Time.now.utc - 3.days).change(hour: 12),
      worker: worker
    }
  ])
  Review.create!([
    {
      task: Task.last,
      is_positive: true,
      description: "#{worker.fname} was great! I wish he did not get generic store brand, but he was quick to deliver. A-",
      created_at: (Time.now.utc - 3.days).change(hour: 12)
    }
  ])

  worker = User.find(3)
  User.find(1).created_tasks.create!([
    {
      title: "Need more batteries",
      description: "I need 9 AA batteries. gimme",
      location: "gamestop",
      datetime: (Time.now.utc - 15.days).change(hour: 0),
      worker: worker
    }
  ])
  Review.create!([
    {
      task: Task.last,
      is_positive: true,
      description: "#{worker.fname} was super fast. Even got the rechargable batteries. what a professional.",
      created_at: (Time.now.utc - 15.days).change(hour: 0)
    }
  ])

  worker = User.find(3)
  User.find(1).created_tasks.create!([
    {
      title: "Walk my dog",
      description: "Need a dog walker. Must be good with dogs. no scary applicants please.",
      location: "dog park",
      datetime: (Time.now.utc - 1.days).change(hour: 0),
      worker: worker
    }
  ])
  Review.create!([
    {
      task: Task.last,
      is_positive: false,
      description: "Lost my dog. please don't EVER hire #{worker.fname}. I want a refund, and a new dog.",
      created_at: (Time.now.utc - 1.days).change(hour: 0)
    }
  ])

# NOTE: User2's past reviewed tasks
  worker = User.find(4)
  User.find(2).created_tasks.create!([
    {
      title: "Find some treasure",
      description: "Need someone to help me find some gold I buried a long time ago. Please bring your own net. We'll head out at night so bring a flashlight.",
      location: "The park",
      datetime: (Time.now.utc - 2.days).change(hour: 16),
      worker: worker
    }
  ])
  Review.create!([
    {
      task: Task.last,
      is_positive: true,
      description: "#{worker.fname} was no good. He ran out of power in the middle of the night so I had to call in reinforcements.",
      created_at: (Time.now.utc - 2.days).change(hour: 16)
    }
  ])

  worker = User.find(7)
  User.find(2).created_tasks.create!([
    {
      title: "Drive boat",
      description: "Need a good boat driver. Must provide boat. Will provide lunch. Heading out in the morning.",
      location: "The park",
      datetime: (Time.now.utc - 2.days).change(hour: 8),
      worker: worker
    }
  ])
  Review.create!([
    {
      task: Task.last,
      is_positive: true,
      description: "Great job! #{worker.fname} turned into a boat. Would hire again for boat related activites A++++.",
      created_at: (Time.now.utc - 2.days).change(hour: 8)
    }
  ])


  # generate 20 random workers
  


  User.create!([{
    fname: "guest",
    lname: "guest",
    email: "guest@guest.guest",
    password_digest: BCrypt::Password.create("password"),
    bio: "I am a guest user."
  }])
  # generate 20 random tasks for guest user, unassigned
  20.times do |x|
    random_description_arr = []
    rand(4..7).times { |x| random_description_arr.push(Faker::Hacker.say_something_smart)}
    random_description = random_description_arr.join(" ")
    random_address = "#{Faker::Address.street_address}, San Francisco, CA, #{Faker::Address.zip_code}"
    random_datetime = Faker::Date.between(1.days.from_now, 20.days.from_now).to_time.utc.change(hour: INTERVALS_TIMECODE.sample)

    User.last.created_tasks.create!([
      {
        title: random_title,
        description: random_description,
        location: random_address,
        datetime: random_datetime
      }
    ])
  end
end
