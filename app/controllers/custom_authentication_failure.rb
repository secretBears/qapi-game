class CustomAuthenticationFailure < Devise::FailureApp 
	protected 

	def redirect_url 
		#render :json => {:info => "LOGIN FAILURE"}, :status => 400
		'/users'
	end 

end 