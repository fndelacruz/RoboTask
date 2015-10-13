class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.string :location, null: false
      t.integer :creator_id, null: false, indexed: true
      t.integer :worker_id, indexed: true

      t.timestamps null: false
    end
  end
end
