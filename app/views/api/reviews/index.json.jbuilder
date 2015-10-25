json.array!(@reviews) do |review|
  json.id review.id
  json.created_at review.created_at.strftime('%m/%d/%Y')
  json.isGood review.is_positive
  json.description review.description
  json.reviewer do
    json.shortName "#{review.task.creator.fname} #{review.task.creator.lname[0]}."
    json.image review.task.creator.img_url
  end
end
