json.array!(@created_tasks) do |task|
  json.id task.id
  json.title task.title
  json.description task.description
  json.location task.location

  if task.worker != nil
    json.worker do
      json.shortName task.worker.nickname
      json.id task.worker.id
      json.image task.worker.img_url
    end
    # debugger
    json.datetime [task.date, task.interval, task.datetime_to_epoch_sec]
    json.wage task.worker.wage
  end

  if task.review != nil
    json.review do
      json.description task.review.description
      json.is_positive task.review.is_positive
      json.datetime task.review.date
    end
  end
end
