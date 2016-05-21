class Rooms < ActiveRecord::Migration
  def change
  	create_table :users do |t|
  		t.string :session_id
  		t.string :token
  	end
  end
end
