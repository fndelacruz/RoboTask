# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  bio             :text
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  fname           :string           not null
#  lname           :string           not null
#  is_robot        :boolean          not null
#  wage            :integer          default(0), not null
#  skill           :integer
#

class User < ActiveRecord::Base
  validates :password_digest, :session_token, presence: true
  validates :email, uniqueness: { message: "is already taken."}
  validate :email_valid
  validates :password, length: { minimum: 6, allow_nil: true }
  validate :fname_valid
  validate :lname_valid
  validate :is_robot_valid

  def fname_valid
    unless fname.length > 1
      errors.add(:First, "name is required.")
    end
  end

  def lname_valid
    unless lname.length >1
      errors.add(:Last, "name is required.")
    end
  end

  def is_robot_valid
    unless is_robot == true || is_robot == false
      errors.add(:Do, "you need robot help, or are you a robot?")
    end
  end

  attr_reader :password

  has_many(:created_tasks,
    class_name: "Task",
    foreign_key: :creator_id,
    primary_key: :id
  )

  has_many(:worked_tasks,
    class_name: "Task",
    foreign_key: :worker_id,
    primary_key: :id
  )

  has_many(:work_times)

  after_initialize :ensure_session_token!

  def self.find_by_credentials(email, password)
    @user = User.find_by_email(email)
    @user && @user.valid_password?(password) ? @user : nil
  end

  def self.workers
    User.joins(:time_slices).group(:id)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  def workable_tasks(tasks)
    schedule = WorkTime.schedule_hash(self.work_times)
    tasks.to_a.select { |task| task.is_workable?(schedule) && task[:is_open] == true }
  end

  def worked_tasks_in_progress
    worked_tasks.includes(:review).to_a.select {|task| task.review.nil?}
  end

  def worked_tasks_completed
    worked_tasks.includes(:review).to_a.select {|task| task.review.nil?}
  end


  def nickname
    "#{fname} #{lname[0]}."
  end

  def img_url
    if is_robot
      "https://robohash.org/#{self.id}?bgset=any"
    else
      "https://robohash.org/#{self.id}?set=set2&bgset=any"
    end
  end

  def stats
    if is_robot
      completed_worked_tasks = worked_tasks.joins(:review)
      good_tasks = completed_worked_tasks.where('is_positive = true')
      {
        total_tasks: completed_worked_tasks.count,
        approval_rating: (
          (good_tasks.count.to_f / completed_worked_tasks.count * 100).round(1)
        )
      }
    end
  end

  private

  def ensure_session_token!
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

  def email_valid
    if email
      unless email.match(/\w+@\w+(\.\w+)+/)
        errors.add(:Please, "enter a valid email address.")
      end
    else
      errors.add(:Email, "is required.")
    end
  end
end
