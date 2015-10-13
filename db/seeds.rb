# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# User1 is a task creator
User.create([
  {
    email: "user1",
    password_digest: BCrypt::Password.create("password"),
    bio: "user1 bio"
  }
])

User.last.created_tasks.create([
  {
    title: "task1 title",
    description: "task1 description",
    location: "task1 location",
  },
  {
    title: "task2 title",
    description: "task2 description",
    location: "task2 location",
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
    title: "task3 title",
    description: "task3 description",
    location: "task3 location",
  }
])
User.last.created_tasks.first.time_slices.create([
  {
    time_start: Time.now,
    time_end: Time.now + 8.hours
  }
])

# User3 is a worker
User.create([
  {
    email: "user3",
    password_digest: BCrypt::Password.create("password"),
    bio: "user3 bio"
  }
])

User.last.time_slices.create([
  {
    time_start: Time.now,
    time_end: Time.now + 8.hours
  },
  {
    time_start: Time.now + 1.day,
    time_end: Time.now + 1.day + 8.hours
  }
])

# User4 is a worker
User.create([
  {
    email: "user4",
    password_digest: BCrypt::Password.create("password"),
    bio: "user4 bio"
  }
])

User.last.time_slices.create([
  {
    time_start: Time.now,
    time_end: Time.now + 4.hours
  },
  {
    time_start: Time.now + 2.day,
    time_end: Time.now + 2.day + 8.hours
  }
])
