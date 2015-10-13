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
  validates :title, :description, :location, :creator_id, presence: true

  belongs_to(:creator,
    class_name: "User",
    foreign_key: :creator_id,
    primary_key: :id
  )

  belongs_to(:worker,
    class_name: "User",
    foreign_key: :worker_id,
    primary_key: :id
  )

  has_many(:time_slices, as: :timable)
end
