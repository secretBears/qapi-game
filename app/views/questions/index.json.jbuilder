
json.array! (@questions) do |question|
	json.id question.id
	json.question question.question
	json.answer question.answer
	json.isRight question.is_right?(current_user)
	json.createdAt question.created_at
	json.updatedAt question.updated_at
end
