# == Schema Information
#
# Table name: reviews
#
#  id          :integer          not null, primary key
#  task_id     :integer          not null
#  is_positive :boolean          not null
#  description :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Review < ActiveRecord::Base
  validates :task_id, :description, presence: true
  validates :is_positive, inclusion: [true, false]

  belongs_to(:task)

  def date
    created_at.strftime("%m/%d/%Y")
  end

end
