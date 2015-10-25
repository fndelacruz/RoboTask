class AddColUsersIsRobot < ActiveRecord::Migration
  def change
    add_column(:users, :is_robot, :boolean, null: false)
  end
end
