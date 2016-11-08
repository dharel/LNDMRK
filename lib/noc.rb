module NOC
  require 'uri'
  require 'net/http'
  module API
    KEEP_ALIVE = 'ping'.freeze
    ALERT = 'alerts/create'.freeze

    SEVERITY_CRITICAL = 4
    SEVERITY_HIGH     = 3
    SEVERITY_MEDIUM   = 2
    SEVERITY_LOW      = 1
  end

  module_function

  def check_config
    errors = []
    errors.push 'NOC: missing NOC_URL env var' unless url
    errors.push 'NOC: missing NOC_TOKEN env var' unless token
    errors.push 'NOC: missing NOC_PROJECT_ID env var' unless project_id
    errors.each { |e| Rails.logger.warn e }
    return errors.empty?
  end

  def url
    ENV['NOC_URL']
  end

  def token
    ENV['NOC_TOKEN']
  end

  def project_id
    ENV['NOC_PROJECT_ID']
  end

  def send_alert(alert, severity, application = Rails.application.class.parent_name, name = Rails.application.class.parent_name)
    send(NOC::API::ALERT, description: alert,
                          severity: severity,
                          application: application,
                          name: name)
  end

  def send(api_action, body = {})
    response = build_request(api_action, body)
    Rails.logger.info(response.read_body)
  rescue StandardError => e
    Rails.logger.error "EXCEPTION: #{e.message}" unless Rails.env.test?
    Rails.logger.error(e.backtrace) unless Rails.env.test?
  end

  def build_request(api_action, body = {})
    url = URI("#{NOC.url}/#{api_action}")
    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = !NOC.url.include?('http:')
    request = Net::HTTP::Post.new(url)
    request['content-type'] = 'application/json'
    request['token'] = NOC.token
    request['cache-control'] = 'no-cache'
    body[:project_id] = NOC.project_id
    request.body = body.to_json
    http.request(request)
  end
end
