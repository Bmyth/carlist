# encoding: utf-8
class NexusController < ApplicationController
  #protect_from_forgery :except => [:login]
  def index
    if !session[:user_id].nil?
      redirect_to "/console"
    end
  end

  def login
    user = User.where(:name => params[:name], :password => params[:password]).first
    if user.nil?
      flash[:error_message] = "账户密码错误"
      redirect_to "/"
    else
      session[:user_id] = user.id
      redirect_to "/console"
    end
  end

  def logout
    session[:user_id] = nil
    redirect_to "/"
  end

  def console
    if session[:user_id].nil?
      redirect_to "/"
    else
      @user = User.find (session[:user_id])
      @bds = Bd.find_all_by_user_id(@user.id)
      @bds.sort! { |a,b| b.created_at <=> a.created_at }
    end

  end

  def addBD
    if session[:user_id].nil?
      render :json => {:error => 'no user'}
    end

    bd = Bd.new(params[:bd])
    bd.user_id = session[:user_id]
    bd.fillDate = Date.today
    bd.save!
    render :json => bd
  end

  def updateBD
    if session[:user_id].nil?
      render :json => {:error => 'no user'}
    end

    bd = Bd.find params[:id]
    if bd.nil?
      render :json => {:error => 'not find'}
    else
      bd.update_attributes(params[:bd])
      bd.save!
      render :json => bd
    end
  end

  def getBD
    if session[:user_id].nil?
      render :json => {:error => 'no user'}
    end

    bd = Bd.find params[:bd_id]
    if bd.nil?
      render :json => {:error => 'not find'}
    else
      render :json => bd
    end
  end

  def deleteBD
    if session[:user_id].nil?
      render :json => {:error => 'no user'}
    end

    bd = Bd.find params[:bd_id]
    if bd.nil?
      render :json => {:error => 'not find'}
    else
      bd.destroy
      render :json => {:success => 'y'}
    end
  end

  def masterCheck
    if session[:user_id].nil?
      render :json => {:error => 'no user'}
    end

    bd = Bd.find params[:bd_id]
    if bd.nil?
      render :json => {:error => 'not find'}
    else
      bd.masterChecked = true
      bd.save!
      render :json => {success: 'yes'}
    end
  end

  def masterUncheck
    if session[:user_id].nil?
      render :json => {:error => 'no user'}
    end

    bd = Bd.find params[:bd_id]
    if bd.nil?
      render :json => {:error => 'not find'}
    else
      bd.masterChecked = false
      bd.save!
      render :json => {success: 'yes'}
    end
  end

  def workerCheck
    if session[:user_id].nil?
      render :json => {:error => 'no user'}
    end

    bd = Bd.find params[:bd_id]
    if bd.nil?
      render :json => {:error => 'not find'}
    else
      bd.workerChecked = true
      bd.save!
      render :json => {success: 'yes'}
    end
  end

  def workerUncheck
    if session[:user_id].nil?
      render :json => {:error => 'no user'}
    end

    bd = Bd.find params[:bd_id]
    if bd.nil?
      render :json => {:error => 'not find'}
    else
      bd.workerChecked = false
      bd.save!
      render :json => {success: 'yes'}
    end
  end

  def setting
    if session[:user_id].nil?
      redirect_to "/"
    end

    @user = User.find (session[:user_id])
    if @user.nil?
      redirect_to "/"
    end
  end

  def addMaster
    if session[:user_id].nil?
      redirect_to "/"
    end

    user = User.find (session[:user_id])
    if user.nil?
      render :json => {error: 'yes'}
    end

    master = Master.create!
    master.user_id = session[:user_id]
    master.name = params[:name]
    master.save!
    render :json => {success: 'yes', mid: master.id}
  end

  def deleteMaster
    if session[:user_id].nil?
      redirect_to "/"
    end

    user = User.find (session[:user_id])
    if user.nil?
      render :json => {error: 'yes'}
    end

    master = Master.find(params[:mid])
    if master.nil?
      render :json => {:error => 'not find'}
    else
      master.destroy
      render :json => {:success => 'y'}
    end
  end

  def addWorker
    if session[:user_id].nil?
      redirect_to "/"
    end

    user = User.find (session[:user_id])
    if user.nil?
      render :json => {error: 'yes'}
    end

    worker = Worker.create!
    worker.user_id = session[:user_id]
    worker.name = params[:name]
    worker.save!
    render :json => {success: 'yes', wid: worker.id}
  end

  def deleteWorker
    if session[:user_id].nil?
      redirect_to "/"
    end

    user = User.find (session[:user_id])
    if user.nil?
      render :json => {error: 'yes'}
    end

    worker = Worker.find(params[:wid])
    if worker.nil?
      render :json => {:error => 'not find'}
    else
      worker.destroy
      render :json => {:success => 'y'}
    end
  end

  def db_params
    params.require(:bd).permit(:number, :applicantName, :applicantPhone, :bdType, :bySubType, :catalog, :carInfo1, :carInfo2, :carInfo3, :carInfo4, :carInfo, :plate, :endDate, :worker, :master, :workerChecked, :masterChecked, :feeA, :rateAin, :rateAout, :feeB, :rateBin, :rateBout, :otherInfo)
  end
end
