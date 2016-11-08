require 'rails_helper'

VERSION = 'VERSION'

describe Setting, type: :model do
  after do
    DatabaseCleaner.clean_with(:truncation)
  end

  describe 'get_value' do
    it 'Check db access' do
      Setting.create!(key: VERSION, value: '1.0.0')
      expect(Setting::get_value(VERSION)).to be_truthy
    end

    it 'Check no exception if no key in db' do
      expect(Setting::get_value(VERSION)).to be_falsey
    end

    it 'Check no exception if no value in db' do
      Setting.create!(key: VERSION)
      expect(Setting::get_value(VERSION)).to be_falsey
    end
  end

  describe 'version' do
    it 'Check db access' do
      Setting.create!(key: VERSION, value: '1.0.0')
      expect(Setting::get_version).to be_truthy
    end

    it 'Check no exception if no key in db' do
      expect(Setting::get_version).to eq('0.0.0')
    end

    it 'Check no exception if no value in db' do
      Setting.create!(key: VERSION)
      expect(Setting::get_version).to eq('0.0.0')
    end
  end

  describe 'to_boolean' do
    it 'return false for for no value' do
      expect(Setting::to_boolean).to be_falsey
    end

    it 'return false for nil' do
      expect(Setting::to_boolean(nil)).to be_falsey
    end

    it 'return true for T' do
      expect(Setting::to_boolean('T')).to be_truthy
    end

    it 'return true for True' do
      expect(Setting::to_boolean('True')).to be_truthy
    end

    it 'return false for False' do
      expect(Setting::to_boolean('False')).to be_falsey
    end

    it 'return false for f' do
      expect(Setting::to_boolean('False')).to be_falsey
    end
  end
end
