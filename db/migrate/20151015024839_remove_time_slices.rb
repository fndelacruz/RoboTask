class RemoveTimeSlices < ActiveRecord::Migration
  def change
    drop_table :time_slices
  end
end
