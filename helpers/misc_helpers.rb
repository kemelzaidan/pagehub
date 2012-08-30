module PageHub
  module Helpers
    module Preferences
      # mapping of displayable font names to actual CSS font-family names
      FontMap = { 
        "Proxima Nova" => "ProximaNova-Light",
        "Ubuntu" => "UbuntuRegular",
        "Ubuntu Mono" => "UbuntuMonoRegular",
        "Monospace" => "monospace, Courier New, courier, Mono",
        "Arial" => "Arial",
        "Verdana" => "Verdana",
        "Helvetica Neue" => "Helvetica Neue"
      }
    end

    def md(content)
      content.to_s.to_markdown
    end

    # Loads the user's preferences merging them with the defaults
    # for any that were not overridden.
    #
    # Side-effects:
    # => @preferences will be overridden with the current user's settings
    def preferences(user = nil)
      user ||= current_user

      if !user
        return settings.default_preferences
      end
      
      @preferences ||= JSON.parse(user.settings || "{}")
      defaults = settings.default_preferences.dup
      defaults.deep_merge(@preferences)
    end

    def pretty_time(datetime)
      datetime.strftime("%D")
    end

    def pluralize(number, word)
      number == 1 ? "#{number} #{word}" : "#{number} #{word}s"
    end

    Vowels = ['a','o','u','i','e']
    def vowelize(word)
      Vowels.include? word[0] ? "an #{word}" : "a #{word}"
    end
  end
end

helpers do
  include PageHub::Helpers
end