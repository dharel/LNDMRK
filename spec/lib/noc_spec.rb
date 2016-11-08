# require 'rails_helper'
require './lib/noc'
describe NOC, type: :helper do
  describe 'url' do
    after do
      ENV.store('NOC_URL', nil)
    end

    it 'should load url from ENV' do
      expect(NOC.url).to eq nil
      ENV.store('NOC_URL', 'some-url')
      expect(NOC.url).to eq 'some-url'
    end
  end

  describe 'check_config' do
    after do
      %w(NOC_URL NOC_TOKEN NOC_PROJECT_ID).each { |x| ENV.store(x, nil) }
    end

    it 'should return true when all NOC related env vars at set' do
      expect(NOC.check_config).to be(false)
      ENV.store('NOC_URL', 'some-url')
      expect(NOC.check_config).to be(false)
      ENV.store('NOC_TOKEN', 'token')
      expect(NOC.check_config).to be(false)
      ENV.store('NOC_PROJECT_ID', '123')
      expect(NOC.check_config).to be(true)
    end
  end

  describe 'API' do
    it 'should list NOC API endpoints' do
      expect(NOC::API::KEEP_ALIVE).to be_truthy
      expect(NOC::API::ALERT).to be_truthy
    end
  end
end
