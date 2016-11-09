#!/usr/bin/env ruby
require 'date'
require 'json'
require 'logger'
require 'ap'
require 'English'

class TestsRunner
  SUCC_STATUS = 0
  FAILED_STATUS = 1
  ERR_STATUS = -1
  PRESENTAGE_RGX = /\d{1,3}(\.)?\d{0,2}%/

  def run(test_name)
    json = {}
    case test_name
    when 'jslint'
      res = run_jslint
    when 'git'
      res = run_git
    when 'xit'
      res = run_xit
    when 'rubocop'
      res = run_rubocop
    when 'scss-lint'
      res = run_scss_lint
    when 'karma'
      res = run_karma
    when 'rspec'
      res = run_rspec
    else
      res = unimplamented test_name
    end
    json = { 'name' => test_name, 'status' => res[:status] }
    json[:measure] = res[:measure] unless res[:measure].nil?
    return json.to_json
  end

  private

  def run_jslint
    jslint_args = '--nomen --plusplus --newcap --vars --indent=2 --white'
    files = `find . -wholename "./app/assets/javascripts/*.js"`.split
    files |= `find . -wholename "./spec/javascripts/*.js"`.split
    error_count = 0
    files.each do |f|
      res = `jslint #{jslint_args} #{f}`
      if $CHILD_STATUS.exitstatus > 0
        error_count += 1
      end
    end
    if error_count == 0
      puts 'jslint Passed'.green
      return  { status: SUCC_STATUS }
    else
      puts 'jslint Faild'.red
      return { status: FAILED_STATUS }
    end
  rescue
    puts 'jslint Error'.red
    return { status: ERR_STATUS }
  end

  def run_xit
    files = `find . -wholename "./spec/*_spec.*"`.split
    error_count = 0
    files.each do |f|
      res =  `cat #{f} | grep 'xit '`
      if res.size > 0
        error_count += 1
        puts "xit at #{f}"
      end
    end
    if error_count == 0
      puts 'xit'.green
    else
      puts 'xit'.red
    end
    return { status: SUCC_STATUS, measure: error_count }
  rescue
    puts 'xit Error'.red
    return { status: ERR_STATUS }
  end

  def run_git
    benned_file_types = %w(orig LOCAL REMOTE BACKUP BASE)
    error_count = 0
    benned_file_types.each do |type|
      files = `find . -name '*.#{type}'`
      if files.size > 0
        error_count += 1
        puts "git garbage files found:\n #{files}"
      end
    end
    if error_count == 0
      puts 'git Passed'.green
      return { status: SUCC_STATUS }
    else
      puts 'git Failed'.red
      return { status: FAILED_STATUS }
    end
  rescue
    puts 'git Error'.red
    return { status: ERR_STATUS }
  end

  def run_karma
    karma_res = `karma start`
    if $CHILD_STATUS.success?
      puts 'Karma Passed'.green
      measure = karma_res.match PRESENTAGE_RGX || ERR_STATUS
      return { status: SUCC_STATUS, measure: measure }
    end
    return { status: SUCC_STATUS, measure: '0%' } if karma_res.include? 'Executed 0 of 0'
    puts karma_res
    puts 'karma Failed'.red
    return { status: FAILED_STATUS }
  rescue
    puts 'karma Error'.red
    return { status: ERR_STATUS }
  end

  def run_rspec
    `rake db:create`
    `rake db:migrate test`
    rspec_res = `COVERAGE=true  bundle exec rspec`
    if $CHILD_STATUS.success?
      puts 'rspec Passed'.green
      measure = rspec_res.match PRESENTAGE_RGX || ERR_STATUS
      return { status: SUCC_STATUS, measure: measure }
    end
    puts rspec_res
    puts 'rspec Failed'.red
    return { status: FAILED_STATUS }
  rescue
    return { status: ERR_STATUS }
  end

  def run_rubocop
    rubocop_res = `rubocop`
    if $CHILD_STATUS.success?
      puts 'rubocop Passed'.green
      return { status: SUCC_STATUS }
    end
    puts rubocop_res
    puts 'rubocop Failed'.red
    return { status: FAILED_STATUS }
  rescue
    return { status: ERR_STATUS }
  end

  def run_scss_lint
    scss_lint_res = `scss-lint app/assets/stylesheets`
    if $CHILD_STATUS.success?
      puts 'scss-lint Passed'.green
      return { status: SUCC_STATUS }
    end
    puts scss_lint_res
    puts 'scss-lint Failed'.red
    return { status: FAILED_STATUS }
  rescue
    return { status: ERR_STATUS }
  end

  def unimplamented(test_name)
    puts "TestsRunner - dont know how to run test '#{test_name}'".red
    return { status: ERR_STATUS }
  end
end

def print_result_in_specy_format(json)
  puts ['=' * 25, ' SPECY ', '=' * 25].join
  puts json
  puts ['=' * 25, ' SPECY ', '=' * 25].join
end

def run
  test_runner = TestsRunner.new
  test_results = []
  TEST_FOR.each do |t|
    puts "running #{t}".green
    test_results.push test_runner.run(t)
    puts '-' * 100
  end
  print_result_in_specy_format test_results
  test_results.each { |r| return TestsRunner::FAILED_STATUS unless r == TestsRunner::SUCC_STATUS }
  return TestsRunner::SUCC_STATUS
end

ALL_TESTS = %w(jslint rspec rubocop scss-lint xit git karma)
# choose which test you wanna run,
# avilable tests: jslint karma rspec rubocop scss-lint xit git
if ARGV.size > 0
  TEST_FOR = ARGV
else
  TEST_FOR = %w(git karma)
end

run
