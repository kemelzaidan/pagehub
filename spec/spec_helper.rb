$LOAD_PATH << File.join(File.dirname(__FILE__), '..')

ENV['RACK_ENV'] = 'test'

# require 'sinatra/base'
require 'app'
require 'rspec'
require 'rack/test'
require 'rack/utils'
require 'capybara/rspec'
require 'capybara/webkit'

# This file was generated by the `rspec --init` command. Conventionally, all
# specs live under a `spec` directory, which RSpec adds to the `$LOAD_PATH`.
# Require this file using `require "spec_helper"` to ensure that it is only
# loaded once.
#
# See http://rubydoc.info/gems/rspec-core/RSpec/Core/Configuration
RSpec.configure do |config|
  # config.treat_symbols_as_metadata_keys_with_true_values = true
  config.run_all_when_everything_filtered = true
  config.filter_run :focus => true

  # Run specs in random order to surface order dependencies. If you find an
  # order dependency and want to debug it, you can fix the order by providing
  # the seed, which is printed after each run.
  #     --seed 1234
  config.order = 'random'
  
  # include Rack::Test::Methods
  config.include Rack::Test::Methods
  Capybara.app = Sinatra::Application
  # Capybara.automatic_reload = false
  Capybara.default_driver    = :webkit
  Capybara.javascript_driver = :webkit
  
  def app
    Sinatra::Application
  end
  
  # use this for stubbing methods to be used in the instance scope
  # @example usage
  #   app_instance.stub(:puts)
  #   app_instance.should_receive(:puts).with('hello world')
  #   
  #   # somewhere in a route
  #   app.get('/') { puts "hello world" }
  #   get '/' # => true
  def app_instance
    Sinatra::Application.any_instance
  end
  
  config.append_before(:each) do
    header "Accept", "application/json"
    # header "Content-Type", "application/json"
  end
  
  app.set :dump_errors, true
  app.set :raise_errors, true  
  app.set :show_exceptions , false  
end

Dir["./spec/helpers/**/*.rb"].sort.each { |f| require f }
Dir["./spec/support/**/*.rb"].sort.each { |f| require f }

def some_salt
  PageHub::Helpers.tiny_salt
end

def sign_out
end

def sign_in(u = @u)
  raise 'Must create a mockup user before signing in' unless u
 
  authorize u.email, Fixtures::UserFixture.password
end