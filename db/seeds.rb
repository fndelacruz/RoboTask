# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

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
# User2

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
    creator_id: newest_user_id
  }
])

# User3

User.create([
  {
    email: "user3",
    password_digest: BCrypt::Password.create("password"),
    bio: "user3 bio"
  }
])
