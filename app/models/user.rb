class User < ActiveRecord::Base
  attr_accessible :name, :password, :info1, :info2, :info3, :info4, :expiryDate
  has_many :bds
  has_many :masters
  has_many :workers
end
