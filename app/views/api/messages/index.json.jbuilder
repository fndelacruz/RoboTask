json.array!(@messages) do |message|
  json.id message.id
  json.owner_id message.owner_id
  json.sender message.sender.nickname
  json.sender_id message.sender.id
  json.receiver message.receiver.nickname
  json.receiver_id message.receiver.id
  json.message message.message
  json.isRead message.is_read
  json.created_at message.created_at.to_i

  json.task do
    debugger if message.task.nil?
    json.creator message.task.creator.nickname
    json.creator_id message.task.creator.id
    json.worker message.task.worker.nickname
    json.worker_id message.task.worker.id
    json.title message.task.title
    json.description message.task.description
    json.location message.task.location
    json.datetime [message.task.date, message.task.interval, message.task.datetime_to_epoch_sec]
    json.lat message.task.lat
    json.lng message.task.lng
  end
end


# json.task do
#   json.creator message.task.creator.nickname
#   json.creator_id message.task.creator.id
#   json.worker message.task.worker.nickname
#   json.worker_id message.task.worker.id
#   json.title message.task.title
#   json.description message.task.description
#   json.location message.task.location
#   json.datetime [message.task.date, message.task.interval, message.task.datetime_to_epoch_sec]
#   json.lat message.task.lat
#   json.lng message.task.lng
#   json.array!(@messages) do |message|
#     json.id = message.id
#     json.sender = message.sender.nickname
#     json.sender_id = message.sender.id
#     json.receiver = message.receiver.nickname
#     json.receiver_id = message.receiver.id
#     json.message = message.message
#     json.isRead = message.is_read
#     json.created_at = message.created_at.to_i
#   end
# end
