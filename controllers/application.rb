before do
  if api_call?    
    puts "its an api call"
    request.body.rewind
    body = request.body.read.to_s || ''
    unless body.empty?
      begin; 
        params.merge!(JSON.parse(body))
      rescue JSON::ParserError => e
        puts e.message
        puts e.backtrace
      end
    end
  else
    @layout = "layouts/#{logged_in? ? 'primary' : 'guest' }".to_sym
  end
end

get '/' do
  pass unless logged_in?
  
  erb :"spaces/index"
end

get '/' do
  erb :"static/greeting.md"
end

%w(/tutorial /testdrive).each { |uri|
  send("get", uri, auth: :user) do
    erb :"static/tutorial.md", layout: :"layouts/print"
  end
}

# Legacy support
get '/account' do
  @legacy = true
  erb :"/shared/_nav_account_links"
end

get '/help' do
  @legacy = true
  erb :"/shared/_nav_help_links"
end

get '/features' do erb :"static/features.md" end
get '/about' do erb :"static/about.md" end
get '/open-source' do erb :"static/open_source.md" end
  
user do
  current_user
end

cancan_space do
  @space
end