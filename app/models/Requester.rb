class Requester
	require 'net/http'
	
	def self.send_request(param = {})
		url = 'http://qapi.herokuapp.com/api/'
		url += param[:lat].to_s
		url += '/'
		url += param[:lon].to_s
		url += '?token=42beedb22b46732fc57c88a6b31424a0&_='
		url += (Time.now.to_f * 1000.0).to_s

		puts "~~~~~~~~~~~~~~"
		puts url
		puts "~~~~~~~~~~~~~~"

		uri = URI(url)
		req = Net::HTTP.get(uri)
		JSON.parse(req)
	end

end