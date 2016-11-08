require './lib/noc'
require './app/models/application_record'
require './app/models/event_log'

desc 'This task is called by the Heroku scheduler add-on'
task scan_events_log: :environment do
  Rails.logger.info 'scan_events_log...'
  days = 1
  events = EventLog.at_last_days(days)
  unless events.blank?
    message = "The following errors occurred in the last #{days} days:\n"
    events.each do |event|
      message += "#{event.created_at} - #{event.subject} - #{event.body}\n"
    end

    NOC.send_alert(message, NOC::API::SEVERITY_CRITICAL)
  end

  Rails.logger.info 'done.'
end
