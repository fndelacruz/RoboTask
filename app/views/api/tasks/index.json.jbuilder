json.array!(@created_tasks) do |task|
  json.id task.id
  json.title task.title
  json.description task.description
  json.location task.location
  json.created_at task.created_at.strftime('%m/%d/%Y')

  if task.worker != nil
    json.worker_shortname "#{task.worker.fname} #{task.worker.lname[0]}."
    json.worker_id task.worker.id
    json.workTimeDate task.datetime.to_date
    json.workTimeInterval WorkTime.interval_code(task.datetime.hour).capitalize
  end

  if task.review != nil
    json.review do
      json.description task.review.description
      json.is_positive task.review.is_positive
      json.datetime task.review.created_at.strftime('%m/%d/%Y')
    end
    json.is_complete true
  else
    json.is_complete false
  end
end
