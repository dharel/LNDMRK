require './lib/noc'

desc 'This task is called by the Heroku scheduler add-on'
task send_keep_alive: :environment do
  Rails.logger.info 'send_keep_alive...'
  NOC.send(NOC::API::KEEP_ALIVE)
  Rails.logger.info 'done.'
end
