
json.id @question.id
json.question @question.question
json.answers do
	json.array! @question.qapi_answers do |answer|
		json.id answer.id
		json.answer answer.answer
	end
end
