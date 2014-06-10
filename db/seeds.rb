# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


## Create Users
user1 = User.create(email: "test@qapi.at", password: "12345678")
user2 = User.create(email: "test2@qapi.at", password: "12345678")

## Create Game
game = Game.create(finish: true)
game_running = Game.create(finish: false)
Game.create(finish: false)

## Add Users to Game
game.users << user1
game.users << user2
game_running.users << user1
game_running.users << user2

## Create 10 Questions and add them to game
(1..10).each do |i|
	q = Question.create(question: "Frage #{i}", answer: "true", game_id: game.id)
end

## Create an answer for every user for every question
(1..20).each do |i|
	question = Question.find((i%10)+1)
	user = User.find((i%2)+1)
	Answer.create(answer: "false", user_id: user.id, question_id: question.id)
end
