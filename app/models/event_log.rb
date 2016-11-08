##################################################################################
# EventLog a db table that keeps track of important events that happens in the system. For example:
# 1. An execptoin is raise at due to a user AJAX request
# 2. A scheduled worker job started/ended
# 3. Any other event that is significant to the system.
#
##################################################################################
class EventLog < ApplicationRecord
  enum severity: { info: 0, warning: 1, error: 2 }

  def self.info(subject, body)
    create_event('info', subject, body)
  end

  def self.warn(subject, body)
    create_event('warn', subject, body)
  end

  def self.err(subject, body)
    create_event('error', subject, body)
  end

  def self.at_last_days(num_of, severity = 'error')
    i = EventLog.severities[severity]
    EventLog.where('severity >= ?', i).where(created_at: num_of.days.ago..Time.now)
  end

  def self.create_event(severity, subject, body)
    EventLog.create(severity: severity, subject: subject, body: body)
  end
end
