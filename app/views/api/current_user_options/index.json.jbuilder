json.image current_user.img_url
json.shortName current_user.nickname
if current_user.is_robot
  json.isRobot true
else
  json.isRobot false
end
