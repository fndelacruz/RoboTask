json.array!(@workable_tasks) do |task|
  json.task do
    json.id task.id
    json.location task.location
    json.creator task.creator.nickname
    json.datetime [task.date, task.interval]
  end
end
