class AddFinishToGames < ActiveRecord::Migration
  def change
  	add_column :games, :finish, :boolean
  end
end
