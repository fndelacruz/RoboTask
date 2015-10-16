class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.integer :task_id, null: false, indexed: true
      t.boolean :is_positive, null: false
      t.text :description, null: false

      t.timestamps null: false
    end
  end
end
