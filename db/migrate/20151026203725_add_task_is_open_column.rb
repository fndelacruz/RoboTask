class AddTaskIsOpenColumn < ActiveRecord::Migration
  def change
    add_column(:tasks, :is_open, :boolean, default: false, null: false)
  end
end
