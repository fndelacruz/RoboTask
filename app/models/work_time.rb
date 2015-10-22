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
  INTERVAL_CODE = {
    0 => "ANYTIME",
    8 => "MORNING",
    12 => "AFTERNOON",
    16 => "EVENING",
  }

  belongs_to(:user)

  def self.interval_code(key)
    INTERVAL_CODE[key]
  end

  def self.intervals
    INTERVALS
  end

  def self.days
    DAYS
  end

  # NOTE: I considered making schedule_hash an instance method of user. However,
  # I believe this will necessarily make a query to fetch those work_times every
  # time is run. Having schedule_hash here implies a joins/includes association
  # was already created, hence why work_times is provided here and NOT just a user?
  def self.schedule_hash(work_times)
    schedule = {}
    DAYS.each do |day|
      schedule[day] = {
        "MORNING" => false,
        "AFTERNOON" => false,
        "EVENING" => false
      }
    end
    work_times.each { |wt| schedule[wt.day][wt.interval] = true }
    schedule
  end

  private

  def valid_day
    errors.add(:day, "bad day") unless DAYS.include?(day)
  end

  def valid_interval
    errors.add(:interval, "bad interval") unless INTERVALS.include?(interval)
  end
end
