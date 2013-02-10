$LOAD_PATH << File.join(File.dirname(__FILE__), '..')

ENV['RACK_ENV'] = 'test'

# require 'sinatra/base'
require 'app'
require 'rspec'
require 'rack/test'
require 'rack/utils'

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
  # config.order = 'random'
  config.include Rack::Test::Methods

  def app
    Sinatra::Application
  end

end

module RSpec
  module Core
    module DSL
      alias_method :feature, :describe
    end
    class ExampleGroup
      class << self
        alias_method :scenario, :it
      end
    end
  end
end

def mockup_user_params
  @some_salt = PageHub::Helpers::salt
  @mockup_user_params = {
    name:     'Mysterious Mocker',
    email:    'very@mysterious.com',
    provider: 'pagehub',
    password:               User.encrypt(@some_salt),
    password_confirmation:  User.encrypt(@some_salt)
  }
end

def create_user(q = {}, cleanup = true)
  User.destroy if cleanup
  
  u = User.create(mockup_user_params.merge(q))
  s = u.spaces.first
  f = s.root_folder
  
  [ u, s, f ]
end

def mockup_user(q = {}, cleanup = true)
  @u, @s, @f = *create_user(q, cleanup)
  @user, @space, @root = @u, @s, @f
  
  @u.saved?
end

def mockup_another_user()
  @u2, @s2, @f2 = create_user({ email: "more@mysterious" }, false)
  
  @u2.saved?
end

def sign_in()
  raise RuntimeError.new('Must create a mockup user before signing in') unless @user
  rc = prc post '/sessions', { email: @user.email, password: @some_salt }
  rc.resp.status.should == 200
end

# resource mock
def rmock(resource, o = {})
  user, space = o[:user] || @u, o[:space] || @s
  salt = PageHub::Helpers.tiny_salt
  
  o[:q] ||= {}
  
  case resource
  when :folder
    p = {
      title: "Mock #{salt}",
      space: space,
      creator: user
    }.merge(o[:q])
    
    user.folders.create(p)
  when :page
    p = {
      title: "Mock Page #{salt}",
      folder: space.root_folder,
      creator: user
    }.merge(o[:q])
    
    user.pages.create(p)
  end
end

def invalid!(r)
  r.saved?.should be_false
  r
end

def valid!(r)
  r.saved?.should be_true
  r
end