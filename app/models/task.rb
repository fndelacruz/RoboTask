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
#  datetime    :datetime
#

class Task < ActiveRecord::Base
  validates :title, :description, :location, :creator_id, presence: true
  validate :datetime_formatted

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

  def to_builder
    Jbuilder.new do |task|
      task.title title
      task.description description
      company.president president.to_builder
    end
  end

  private

  def datetime_formatted
    return if datetime.nil?
    errors.add(:datetime, "not formatted!") unless [0, 8, 12, 16].include?(datetime.hour)
  end
end
