require 'helper/game_result'

class Game < ActiveRecord::Base
	has_and_belongs_to_many :users
	has_many :questions

	def all_users
		User.includes(:games).where('games.id' => id)
	end

	def winners
		users = all_users
		if users.count == 1 || finish == false
			return Array.new
		end

		game_result = GameResult.new

		score = Hash.new
		users.each do |user|
			game_result.add(user, result(user)[:right])
		end

		return game_result.winner
	end

	def result_as_string(user)
		if(finish==false)
			return nil
		end
		all_winner = winners
		if(all_winner.count == 1 && all_winner[0].id == user.id)
			return "win"
		end
		if(all_winner.count > 1 && all_winner.detect{|w| w.id == user.id})
			return "drawn"
		end
		return "lose"
	end

	def result(user)
		right_questions_count = 0
		wrong_questions_count = 0
		questions.each do |question|
			if question.is_right?(user)
				right_questions_count += 1
			else
				wrong_questions_count +=1
			end
		end
		{:right => right_questions_count, :wrong => wrong_questions_count}
	end

	def update_player(params)
		searched_user = User.where(:email => params[:userEmail]).first
		if searched_user.nil?
			return false
		end

		if params[:add]
			exist = all_users.where(:id => searched_user.id).first
			if exist.nil?
				users << searched_user
			end
		else
			users.delete(searched_user.id)
		end
		return true
	end

	def get_question(param={})
		if param[:id].to_i >= 10
			check_if_all_users_finished()
			return "finished"
		end

		question = questions[param[:id].to_i]
		if question.nil?
			if add_question(param)
				question = questions.last
			end
		end
		question
	end

	def add_question(param={})
		if questions.count < 10
			req = Requester.send_request(param)
			puts "~~~~~~~~~~~~~~~~"
			puts req
			puts "~~~~~~~~~~~~~~~~"
			if(req.kind_of?(Array))
				req = req[0];
			end
			req = string_keys_to_symbols(req)
			if(req[:status].to_i > 200 || !req[:error].nil?)
				return nil
			end

			req[:question] = req[:question][-1,1] == "?" ? req[:question] : req[:question]+"?"
			question = Question.create(:question => req[:question])

			req[:answers].shuffle.each do |answer|
				answer = string_keys_to_symbols(answer)
				qa = QapiAnswer.create(:answer => answer[:answer], :is_true => answer[:isTrue])
				question.qapi_answers << qa
			end
			questions << question
		end
	end

	private

	def string_keys_to_symbols(string_hash)
		string_hash.inject({}){|memo,(k,v)| memo[k.to_sym] = v; memo}
	end

	def check_if_all_users_finished
		users = User.includes(:games).where('games.id' => id)

		question_ids = questions.map{ |q| q.id }
		user_ids = users.map{ |u| u.id }

		num_of_answers = Answer.of_questions_and_users(question_ids, user_ids).count

		finish = num_of_answers >= (questions.count * users.count)
		self.update(:finish => finish)
	end
end
