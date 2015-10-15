class AddTaskDateTime < ActiveRecord::Migration
  def change
    add_column :tasks, :datetime, :datetime
  end
end
