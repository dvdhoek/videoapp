
class RoomsController < ApplicationController

require 'opentok'


def index
	@api_key = "45592332"
	@opentok = OpenTok::OpenTok.new(@api_key, 'ce4771d7c91a3f2e773ae76b1d6d9f6db5301e5e')
	@session = @opentok.create_session

	@session_id = @session.session_id
	@token = @opentok.generate_token(@session_id)
end

end
