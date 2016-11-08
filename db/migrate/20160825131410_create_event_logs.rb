class CreateEventLogs < ActiveRecord::Migration[5.0]
  def change
    create_table :event_logs do |t|
      t.integer :severity, null: false
      t.string :subject, null: false
      t.string :body, null: false
      t.timestamps null: false
    end
  end
end
