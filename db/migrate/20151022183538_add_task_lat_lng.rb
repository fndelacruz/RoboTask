class AddTaskLatLng < ActiveRecord::Migration
  def change
    add_column(:tasks, :lat, :float, null: false)
    add_column(:tasks, :lng, :float, null: false)
  end
end
