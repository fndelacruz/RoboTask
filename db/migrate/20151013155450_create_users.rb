class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email, null: false, indexed: true, unique: true
      t.string :password_digest, null: false
      t.string :session_token, null: false, indexed: true, unique: true
      t.text :bio

      t.timestamps null: false
    end
  end
end
