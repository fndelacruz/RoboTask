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

class Message < ActiveRecord::Base
  validates :owner_id, :sender_id, :receiver_id, :task_id, :message, presence: true
  validates :is_read, inclusion: { in: [true, false]}

  belongs_to(:owner,
    class_name: "User",
    foreign_key: :owner_id,
    primary_key: :id
  )

  belongs_to(:sender,
    class_name: "User",
    foreign_key: :sender_id,
    primary_key: :id
  )

  belongs_to(:receiver,
    class_name: "User",
    foreign_key: :receiver_id,
    primary_key: :id
  )

  belongs_to(:task)

end
