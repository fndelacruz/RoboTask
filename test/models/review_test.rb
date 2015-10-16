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

require 'test_helper'

class ReviewTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
