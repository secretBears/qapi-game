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
game = Game.create(finish: true, started: true)
game_running = Game.create(finish: false, started: true)
Game.create(finish: false)

## Add Users to Game
game.users << user1
game.users << user2
game_running.users << user1
game_running.users << user2

## Create 10 Questions + 4 answers (QAPI) and add them to game
(1..10).each do |i|
	q = Question.create(question: "Frage #{i}", game_id: game.id)
	random = rand(4) + 1
	(1..4).each do |j|
		qa = QapiAnswer.create(answer: "Answer #{i}#{j}", is_true: random==j)
		q.qapi_answers << qa
	end
end

## Create an answer for every user for every question
User.all.each do |user|
	(1..10).each do |i|
		random = rand(104)+1
		question = Question.find((i%10)+1)
		Answer.create(answer: "Answer #{random}", user_id: user.id, question_id: question.id)
	end
end
