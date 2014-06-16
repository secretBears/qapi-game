
json.id @user.id
json.email @user.email
json.gamesPlayed @user.games.count
json.gamesWon @user.num_of_games_won
json.sum @user.sum_of_right_and_wrong_answers

json.games do
	json.array! @user.games.each do |game|
		json.id game.id
		json.result game.result(@user)
	end
end
