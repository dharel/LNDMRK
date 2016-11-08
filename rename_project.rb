#!/usr/bin/env ruby

@paths = [
  'Rakefile',
  'spec/rails_helper.rb',
  'config/application.rb',
  'config/environment.rb',
  'config/routes.rb',
  'config/environments/development.rb',
  'config/environments/production.rb',
  'config/environments/test.rb',
  'config/initializers/secret_token.rb',
  'config/initializers/session_store.rb'
]
@session_store = 'config/initializers/session_store.rb'

def underscore(str)
  return str.gsub(/::/, '/')
    .gsub(/([A-Z]+)([A-Z][a-z])/, '\1_\2')
    .gsub(/([a-z\d])([A-Z])/, '\1_\2')
    .tr('-', '_')
    .downcase
end

def replace_in_files(new_project_name)
  @paths.each do |p|
    text = File.read p
    changed_text = text.gsub(/TddTemplate/, new_project_name)
    File.open(p, 'w') { |f| f << changed_text }
  end

  text = File.read @session_store
  changed_text = text.gsub(/tdd_template/, underscore(new_project_name))
  File.open(@session_store, 'w') { |f| f << changed_text }
  puts 'Done!'
end

def run
  replace_in_files ARGV[0]
end

if ARGV[0]
  run
else
  puts 'You need to enter the project name as arg, for example ./rename_project NewProjectName'
end
