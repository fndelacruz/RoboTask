json.bio current_user.bio
json.work_times WorkTime.schedule_hash(User.find(current_user.id).work_times)
json.wage current_user.wage
