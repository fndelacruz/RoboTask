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

require 'test_helper'

class TimeSliceTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
