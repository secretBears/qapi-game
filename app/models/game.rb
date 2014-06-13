class Game < ActiveRecord::Base
	has_and_belongs_to_many :users
	has_many :questions

	def all_users
		User.includes(:games).where('games.id' => id)
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

	def start
		# TODO: get Questions + answers from QAPI
	end
end
