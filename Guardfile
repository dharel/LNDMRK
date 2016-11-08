# More info at https://github.com/guard/guard#readme
require 'colorize'

group :specs, halt_on_fail: true do
  guard :rspec, cmd: 'bundle exec rspec' do
    watch('spec/spec_helper.rb')                        { 'spec' }
    watch('config/routes.rb')                           { 'spec/routing' }
    watch('app/controllers/application_controller.rb')  { 'spec/controllers' }
    watch(%r{^spec/.+_spec\.rb$})
    watch(%r{^app/(.+)\.rb$})                           { |m| "spec/#{m[1]}_spec.rb" }
    watch(%r{^app/(.*)(\.erb|\.haml|\.slim)$})          { |m| "spec/#{m[1]}#{m[2]}_spec.rb" }
    watch(%r{^lib/(.+)(\.rb|\.rake)$})                  { |m| "spec/lib/#{m[1]}_spec.rb" }
    watch(%r{^app/controllers/(.+)_(controller)\.rb$})  { |m| ["spec/routing/#{m[1]}_routing_spec.rb", "spec/#{m[2]}s/#{m[1]}_#{m[2]}_spec.rb", "spec/acceptance/#{m[1]}_spec.rb"] }
  end

  guard :shell do
    watch(%r{.+\.rb$}) do |m|
      res = `rubocop #{m[0]}`
      if !res.include? 'no offenses detected'
        puts `rubocop #{m[0]}`.red if res.include? 'E:'
        puts `rubocop #{m[0]}`.yellow if res.include? 'C:'
        puts `rubocop #{m[0]}`.yellow if res.include? 'W:'
      end
    end
  end
end

guard :shell do

  watch(/assets\/javascripts\/(.*)\.js$/) do
    puts `npm test`
  end

  watch(/spec\/javascripts\/(.*)\.js$/) do
    puts `npm test`
  end

  watch %r{^app/(.+)\.rb$} do |m|
    if `ruby -c #{m[0]}|grep 'Syntax OK'`.length == 0
      n "#{m[0]} is incorrect", 'Ruby Syntax', :failed
      `ruby -c #{m[0]}`
    end
  end

  watch %r{^lib/tasks/(.+)\.rake$} do |m|
    if `ruby -c #{m[0]}|grep 'Syntax OK'`.length == 0
      n "#{m[0]} is incorrect", 'Ruby Syntax', :failed
      `ruby -c #{m[0]}`
    end
  end

  watch %r{^app/(.+)\.rb$} do |m|
    if `fgrep "awesome_print" #{m[0]}`.length > 0
      n "#{m[0]} includes awesome_print", 'Ruby Syntax', :failed
      print "remove awesome_print from #{m[0]}".yellow
    end
  end

  watch %r{^spec/(.+)\.rb$} do |m|
    if `fgrep "xit " #{m[0]}`.length > 0
      n "#{m[0]} disabled test", 'RSpec', :failed
      print "\nfound xit: enable test in #{m[0]}".yellow
    end
  end

  watch %r{^spec/javascripts/(.+)\.js$} do |m|
    if `fgrep "xit(" #{m[0]}`.length > 0
      n "#{m[0]} disabled test", 'Jasmine', :failed
      print "\nfound xit: enable test in #{m[0]}".yellow
    end
  end

  watch %r{^app/(.+)\.rb$} do |m|
    if `fgrep "debugger" #{m[0]}`.length > 0
      n "#{m[0]} includes debugger", 'Ruby Syntax', :failed
      print "remove debugger from #{m[0]}".yellow
    end
  end

  watch(%r{^(.+)\.(orig|LOCAL|REMOTE|BACKUP|BASE)}) do |m|
    n "Remove #{m[0]}", 'Git Merge', :failed
    print "Remove #{m[0]}".red
  end

  watch(%r{^app/assets/javascripts/(.+)\.js$}) do |m|
    args = '--nomen --plusplus --newcap --vars --indent=2'
    if `jslint #{args} #{m[0]}|grep 'is OK.'`.length == 0
      n "#{m[0]} is incorrect", 'JavaScript Syntax', :failed
      puts `jslint #{args} #{m[0]}`.yellow
    end
  end

  watch(%r{^spec/javascripts/(.*)\.js$}) do |m|
    args = '--nomen --plusplus --newcap --vars --indent=2'
    if `jslint #{args} #{m[0]}|grep 'is OK.'`.length == 0
      n "#{m[0]} is incorrect", 'JavaScript Syntax', :failed
      puts `jslint #{args} #{m[0]}`.yellow
    end
  end

=begin
  watch(%r{^app/assets/(.*)\.(.*)css$}) do |m|
    if `scss-lint #{m[0]}`.length != 0
      n "#{m[0]} is incorrect", 'css Syntax', :failed
      `scss-lint #{m[0]}`.yellow
    end
  end
=end

end
