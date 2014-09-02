class Bd < ActiveRecord::Base
  attr_accessible :applicantName, :bdType, :number, :plate, :master, :masterChecked, :worker, :workerChecked, :feeA, :rateAin, :rateAout, :feeB, :rateBin, :rateBout, :endDate, :otherInfo
end