class CreateQapiAnswers < ActiveRecord::Migration
  def change
    create_table :qapi_answers do |t|
      t.string :answer
      t.boolean :is_true
      t.integer :question_id

      t.timestamps
    end
  end
end
