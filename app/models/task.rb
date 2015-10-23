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
#  lat         :float            not null
#  lng         :float            not null
#

class Task < ActiveRecord::Base
  validates :title, :description, :location, :creator_id, :lat, :lng, presence: true
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

  has_one(:review)

  def is_workable?(schedule)
    day = datetime.strftime("%a").upcase
    interval = WorkTime.interval_code(datetime.hour)
    if interval == "ANYTIME"
      schedule[day].values.any? { |bool| bool }
    else
      schedule[day][interval]
    end
  end

  def date
    datetime.strftime("%m/%d/%Y")
  end

  def interval
    WorkTime.interval_code(datetime.hour).capitalize
  end

  def in_bounds(bounds)
    real_bench_params = params["bench"]
    south_west_lat = real_bench_params["bounds"]["southWest"]["lat"].to_f
    north_east_lat = real_bench_params["bounds"]["northEast"]["lat"].to_f
    south_west_lng = real_bench_params["bounds"]["southWest"]["lng"].to_f
    north_east_lng = real_bench_params["bounds"]["northEast"]["lng"].to_f
    debugger
  end

  private

  def datetime_formatted
    return if datetime.nil?
    errors.add(:datetime, "not formatted!") unless [0, 8, 12, 16].include?(datetime.hour)
  end
end
