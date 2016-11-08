class Setting < ApplicationRecord

  def self.get_value(key)
    setting = Setting.find_by_key(key)
    return (setting.nil? ? nil : setting.value)
  end

  def self.get_version
    version = Setting.get_value('VERSION')
    return version.nil? ? '0.0.0' : version
  end

  def self.to_boolean(val = nil)
    return false if val.nil?
    return true if (val =~ /^(true|t)$/i) == 0
    return false
  end
end
