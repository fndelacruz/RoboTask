class AddTaskWageCol < ActiveRecord::Migration
  def change
    add_column(:tasks, :wage, :integer)
  end
end
