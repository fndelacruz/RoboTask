class AddRobotsWageSkillCols < ActiveRecord::Migration
  def change
    add_column(:users, :wage, :integer, default: 0, null: false)
    add_column(:users, :skill, :integer)
  end
end
