json.array!(@workable_tasks) do |task|
  json.id task.id
  json.title task.title
  json.location task.location
  json.description task.description
  json.creator do
    json.shortName task.creator.nickname
    json.image task.creator.img_url
  end
  json.datetime [task.date, task.interval, task.datetime_to_epoch_sec]
  json.lat task.lat
  json.lng task.lng
  json.wage task.wage
end
