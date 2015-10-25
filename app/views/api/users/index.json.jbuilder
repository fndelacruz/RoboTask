json.array!(@workers) do |worker|
  json.id worker.id
  json.shortName worker.nickname
  json.bio worker.bio
  json.image worker.img_url
  json.created_at worker.created_at.strftime('%m/%d/%Y')
  json.stats worker.stats
  json.wage worker.wage
end
