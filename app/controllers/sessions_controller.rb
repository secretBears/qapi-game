class SessionsController
  protect_from_forgery with: :null_session

  def create
    warden.authenticate!(:scope => resource_name, :recall => "#{controller_path}#failure")
    #render :status => 200, :json => { :success => true, :info => "Logged in", :user => current_user }
    @user = current_user
    render 'create'
  end

  def destroy
    warden.authenticate!(:scope => resource_name, :recall => "#{controller_path}#failure")
    current_user.remove_authentication_token
    sign_out
    render :status => 200, :json => { :success => true, :info => "Logged out", :csrfParam => request_forgery_protection_token, :csrfToken => form_authenticity_token }
  end

  def options
    # this will send an empty request to the clien with 200 status code (OK, can proceed)
    render :status => 200, :text => ''
  end

  def failure
    render :status => 401, :json => { :success => false, :info => "Login Credentials Failed" }
  end

  def show_current_user
    warden.authenticate!(:scope => resource_name, :recall => "#{controller_path}#failure")
    render :status => 200, :json => { :success => true, :info => "Current User", :user => current_user }
  end
end
