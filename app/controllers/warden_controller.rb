# encoding: utf-8
class WardenController < ApplicationController
  skip_before_filter :verify_authenticity_token
  def index
    @warden  = !session[:warden_login_time].nil?
    @users = []
    if @warden
      @users = User.find :all
    end
  end

  def login
    if(params[:key] == '1470' && params[:password] = 'R0ys1ngh4m')
      session[:warden_login_time] = Time.now
    end
    redirect_to "/warden"
  end

  def addUser
    if !session[:warden_login_time].nil?
      user = User.new(params[:user])
      user.save!
    end
    redirect_to "/warden"
  end

  def deleteUser
    if !session[:warden_login_time].nil?
      user = User.find params[:uid]
      if user.nil?
        render :json => {:error => 'not find'}
      else
        user.destroy
        render :json => {:success => 'y'}
      end
    end
  end

  def updateUser
    if !session[:warden_login_time].nil?
      user = User.find params[:uid]
      if !user.nil?
        user.update_attributes(params[:user])
        user.save!
      end
    end
    redirect_to "/warden"
  end

  #def db_params
  #  params.require(:user).permit(:name, :password, :info1, :info2, :info3, :info4, :expiryDate)
  #end
end
