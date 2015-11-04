require 'rails_helper'

RSpec.describe User, type: :model do
  describe "associations" do
    it { should have_many(:created_tasks) }
    it { should have_many(:worked_tasks) }
    it { should have_many(:work_times) }
  end
end
