require 'rails_helper'
require 'spec_helper'
feature "all users" do

  scenario "can view site splash page" do
    visit root_path
    expect(page).to have_content "Connecting clients who need robots to robots who need money."
  end

  scenario "upon login, do not see splash page" do
    visit root_path
    click_button "Guest Robot Login"
    expect(page).not_to have_content "Connecting clients who need robots to robots who need money."
  end


end
