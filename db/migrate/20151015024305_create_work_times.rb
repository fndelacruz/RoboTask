class CreateWorkTimes < ActiveRecord::Migration
  def change
    create_table :work_times do |t|
      t.string :day, null: false
      t.string :interval, null: false
      t.integer :user_id, null: false, indexed: true

      t.timestamps null: false
    end
  end
end
