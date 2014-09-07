class Bd < ActiveRecord::Base
  attr_accessible :applicantName, :applicantInfo1, :applicantInfo2, :bdType, :number, :plate, :carInfo, :master, :masterChecked, :worker, :workerChecked, :feeA, :rateAin, :rateAout, :tax, :feeB, :rateBin, :rateBout, :endDate, :otherInfo
end