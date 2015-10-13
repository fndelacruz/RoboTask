class CreateTimeSlices < ActiveRecord::Migration
  def change
    create_table :time_slices do |t|
      t.datetime :time_start, null: false
      t.datetime :time_end, null: false
      t.integer :timable_id, null: false, indexed: true
      t.string :timable_type, null: false

      t.timestamps null: false
    end
  end
end
