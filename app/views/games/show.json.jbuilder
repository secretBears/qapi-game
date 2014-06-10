
json.id @game.id
json.finish @game.finish
json.started @game.started
json.users @game.all_users, :id, :email
