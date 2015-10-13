# == Schema Information
#
# Table name: tasks
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  description :text             not null
#  location    :string           not null
#  creator_id  :integer          not null
#  worker_id   :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Task < ActiveRecord::Base
end
