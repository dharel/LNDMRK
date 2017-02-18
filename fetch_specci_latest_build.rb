#!/usr/bin/env ruby
require 'date'
require 'time'
require 'active_support/all'
require 'English'
require 'optparse'

DEV = :dev
STG = :stg
PROD = :prod
DEFAULT_REMOTE = 'origin'

class PullHelper
  attr_writer :branch_list
  attr_reader :timestamped_members, :log

  def initialize(options = {})
    @print_log = options.delete(:log)
    @remote = options.delete(:remote) || DEFAULT_REMOTE
    fail 'please state which branch you what. run `./pull_specy_nightly_build.rb -h` for help.' if options.empty?
    @envs = options.keys
    log "pull_specy_nightly_build triggered #{Time.now}"
  end

  def pull
    prepare
    @envs.each do |e|
      log "fetching latest build for #{e}"
      target = latest_build_for e
      unless target
        puts "nothing to fetch for #{e}, master is the lastest build"
        next
      end
      `git fetch #{@remote} #{target}:#{target}`
      fail 'failed to fetch #{target}' unless $CHILD_STATUS.success?
      puts "fetched #{target}"
      puts 'Notice! this branch was created more then 24h ago, did specy fail to build last night?' if old_branch? target
    end
  end

  private

  def prepare
    fetch_remote_branches
    sort_list_by_time_stamp
  end

  def fetch_remote_branches
    log 'updating branches'
    `git remote update #{@remote} --prune`
    fail "Failed to update from remote '#{@remote}'" unless $CHILD_STATUS.success?
    branches_with_full_path = `git branch -r`.split
    fail 'Failed to read from repository' unless failed_to_fetch branches_with_full_path
    @branch_list = branches_with_full_path.map { |b| b.split('/').last }
  end

  def sort_list_by_time_stamp
    log 'sorting branches by timestamps'
    @timestamped_members = @branch_list.select { |s| s[/^\d{10}/] }
    @timestamped_members.sort!.reverse!
  end

  def latest_build_for(env)
    case env
    when DEV
      return newest_development
    when STG
      return newest_staging
    when PROD
      return newest_production
    else
      fail "'#{env}' is an invalid environment name"
    end
  end

  def newest_development
    return @timestamped_members.find { |s| s[/development/] }
  end

  def newest_staging
    return @timestamped_members.find { |s| s[/staging/] }
  end

  def newest_production
    return @timestamped_members.find { |s| s[/production/] }
  end

  def log(m)
    puts m.yellow if @print_log
  end

  def failed_to_fetch(branch_list)
    return branch_list && branch_list.size > 0
  end

  def old_branch?(branch_with_time_stamp)
    timestamp = branch_with_time_stamp.split('-')[0]
    year = timestamp[0..3]
    month = timestamp[4..5]
    day = timestamp[6..7]
    hour = timestamp[8..9]
    minute = timestamp[10..11]
    date_str = [[year, month, day].join('-'), [hour, minute].join(':')].join(' ')
    time = Time.parse date_str
    return time < 1.day.ago
  end
end

def print_error(e)
  puts e.to_s
end

def parse_options
  usage_details = 'this script will fetch the newest Specy nightly build for you project.'
  usage_examples = "Usage Example:\n./pull_specy_nightly_build.rb -d\n./pull_specy_nightly_build.rb -dsp"
  options = {}
  OptionParser.new do |opts|
    opts.banner = "#{usage_details}\n#{usage_examples}"
    opts.on('-d', 'pulls latest development build') { options[DEV] = true }
    opts.on('-s', 'pulls latest staging build') { options[STG] = true }
    opts.on('-p', 'pulls latest production build') { options[PROD] = true }
    opts.on('-r remote', 'search given remote instead of origin') { |r| options[:remote] = r }
    opts.on('-log', 'print full log') { options[:log] = true }
  end.parse!
  return options
end

def run
  ops = parse_options
  pm = PullHelper.new ops
  pm.pull
rescue => e
  print_error e
  raise e
end

run unless ENV['RAILS_ENV'] == 'test'
