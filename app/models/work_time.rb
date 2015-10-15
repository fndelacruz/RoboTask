# == Schema Information
#
# Table name: work_times
#
#  id         :integer          not null, primary key
#  day        :string           not null
#  interval   :string           not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class WorkTime < ActiveRecord::Base
  validates :day, :interval, :user_id, presence: true
  validate :valid_day, :valid_interval

  DAYS = %w(SUN MON TUE WED THU FRI SAT)
  INTERVALS = %w(MORNING AFTERNOON EVENING)

  belongs_to(:user)
  private

  def valid_day
    errors.add(:day, "bad day") unless DAYS.include?(day)
  end

  def valid_interval
    errors.add(:interval, "bad interval") unless INTERVALS.include?(interval)
  end
end
