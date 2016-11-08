require 'rails_helper'

describe EventLog, type: :model do
  it 'logging events' do
    expect { EventLog.info('title', 'body') }.to change { EventLog.count }.by(1)
    expect { EventLog.warn('title', 'body') }.to change { EventLog.count }.by(1)
    expect { EventLog.err('title', 'body') }.to change { EventLog.count }.by(1)
  end

  describe 'at_last_days' do
    before(:each) do
      10.times do |i|
        EventLog.create(severity: 'info', subject: "subject-#{i}", body: "body-#{i}")
        EventLog.create(severity: 'warn', subject: "subject-#{i}", body: "body-#{i}")
        EventLog.create(severity: 'error', subject: "subject-#{i}", body: "body-#{i}")
      end
      EventLog.all.each_with_index do |e, i|
        e.created_at = i.day.ago
        e.save!
      end
    end

    it 'should return events created since given days ago' do
      res = EventLog.at_last_days(50)
      expect(res.count).to be 33
      res = EventLog.at_last_days(25)
      expect(res.count).to be 25
      res = EventLog.at_last_days(25, 'info')
      expect(res.count).to be 25
      res = EventLog.at_last_days(25, 'warn')
      expect(res.count).to be 16
      res = EventLog.at_last_days(5, 'error')
      expect(res.count).to be 1
    end
  end
end
