class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.integer :owner_id, null: false, indexed: true
      t.integer :sender_id, null: false, indexed: true
      t.integer :receiver_id, null: false, indexed: true
      t.integer :task_id, null: false, indexed: true
      t.text :message, null: false
      t.boolean :is_read, null: false, default: false

      t.timestamps null: false
    end
  end
end
