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
end
