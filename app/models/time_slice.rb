# == Schema Information
#
# Table name: time_slices
#
#  id           :integer          not null, primary key
#  time_start   :datetime         not null
#  time_end     :datetime         not null
#  timable_id   :integer          not null
#  timable_type :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class TimeSlice < ActiveRecord::Base
  validates :time_start, :time_end, :timable_id, :timable_type, presence:true

  # Note: eventually want a validation such that a Task may only have one
  # Time Slice. 

  belongs_to :timable, polymorphic: true
end
