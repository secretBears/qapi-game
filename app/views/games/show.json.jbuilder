
json.id @game.id
json.finish @game.finish
json.started @game.started
json.yourResult @game.result_as_string(current_user)
json.users @game.all_users, :id, :email
