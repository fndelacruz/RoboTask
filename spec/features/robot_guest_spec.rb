require 'rails_helper'
require 'spec_helper'
feature "robot guest users can" do

  # scenario "view site splash page" do
  #   visit root_path
  #   expect(page).to have_content "Connecting clients who need robots to robots who need money."
  # end

  # scenario "login and logout as guest robot" do
  #   visit root_path
  #   click_button "Guest Robot Login"
  #   expect(page).to have_content "Welcome to RoboTask, Robot G.!"
  #   click_on "My Account"
  #   click_on "Log Out"
  #   expect(page).to have_content "Connecting clients who need robots to robots who need money."
  # end

  scenario "signup for open tasks and view them in 'My Tasks'" do
    visit root_path
    click_button "Guest Robot Login"
    click_on "Open Task Search"
    task_description = page.first(".task-description").text
    first(".workable-task-item").click_on "Work this task!"
    click_on "Confirm"
    sleep(5)
    click_on "My Tasks"
    click_on "Active:"
    expect(page).to have_content task_description
  end

end
