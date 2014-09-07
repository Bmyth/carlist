class Bd < ActiveRecord::Base
  attr_accessible :applicantName, :applicantPhone, :applicantInfo1, :applicantInfo2, :bdType, :bdSubType, :catalog, :number, :plate, :carInfo, :carInfo1, :carInfo2, :carInfo3, :carInfo4, :master, :masterChecked, :worker, :workerChecked, :feeA, :rateAin, :rateAout, :tax, :feeB, :rateBin, :rateBout, :endDate, :otherInfo
end