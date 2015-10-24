# == Schema Information
#
# Table name: messages
#
#  id          :integer          not null, primary key
#  owner_id    :integer          not null
#  sender_id   :integer          not null
#  receiver_id :integer          not null
#  task_id     :integer          not null
#  message     :text             not null
#  is_read     :boolean          default(FALSE), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'test_helper'

class MessageTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
