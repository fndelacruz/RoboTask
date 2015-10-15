# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# User1 is a task creator
DAYS = %w(SUN MON TUE WED THU FRI SAT)
INTERVALS = %w(MORNING AFTERNOON EVENING)

User.create([
  {
    email: "user1",
    password_digest: BCrypt::Password.create("password"),
    bio: "user1 bio"
  }
])

User.last.created_tasks.create([
  {
    title: "Need more catfood",
    description: "Please deliver some cat food to me, in 2 days anytime. I prefer salmon.",
    location: "555 Cat Lane",
    datetime: (Time.now + 2.days).change(hour: 0)
  },
  {
    title: "Need baloons",
    description: "I need some balloons tomorrow morning. need quickly!",
    location: "task2 location",
    datetime: (Time.now + 1.days).change(hour: 8)
  }
])

# User2 is a task creator
User.create([
  {
    email: "user2",
    password_digest: BCrypt::Password.create("password"),
    bio: "user2 bio"
  }
])
User.last.created_tasks.create([
  {
    title: "Lost Dog",
    description: "Please help my find my dog, sometime next week in the afternoon. I lost him in the park.",
    location: "532 Candy St.",
    datetime: Time.now + 5.days
  }
])

# User3 is a worker who works on weekdays, anytime
User.create([
  {
    email: "user3",
    password_digest: BCrypt::Password.create("password"),
    bio: "I like to work on the weekdays, anytime."
  }
])

(1..5).each do |day_idx|
  (0..2).each do |interval_idx|
    User.last.work_times.create([
      {
        day: DAYS[day_idx],
        interval: INTERVALS[interval_idx]
      }
    ])
  end
end

# User4 is a worker who works on weekends, anytime
User.create([
  {
    email: "user4",
    password_digest: BCrypt::Password.create("password"),
    bio: "I like to work on the weekends, anytime."
  }
])

[0, 6].each do |day_idx|
  (0..2).each do |interval_idx|
    User.last.work_times.create([
      {
        day: DAYS[day_idx],
        interval: INTERVALS[interval_idx]
      }
    ])
  end
end
