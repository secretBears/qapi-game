
json.array! (@games) do |game|
	json.id game.id
	json.finish game.finish
end