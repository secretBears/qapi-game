
json.current_user do
	json.id current_user.id
	json.email current_user.email
	json.token current_user.authentication_token
end

