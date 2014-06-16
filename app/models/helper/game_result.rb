

class GameResult

	def initialize
		@list = Array.new
	end

	def add(user, score)
		result = {:user => user, :score => score}
		@list << result
	end

	def winner
		winners = Array.new
		winning_score = highest_score
		@list.each do |result|
			if result[:score] == winning_score
				winners << result[:user]
			end
		end
		winners
	end

	private

	def highest_score
		score = 0
		@list.each do |result|
			if result[:score] > score
				score = result[:score]
			end
		end
		score
	end

end