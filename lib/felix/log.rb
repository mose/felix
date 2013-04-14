LOG_FORMAT = '%s - %s' unless defined?(LOG_FORMAT)
DATE_FORMAT = '%Y-%m-%dT%H:%M:%S%z' unless defined?(DATE_FORMAT) # W3C format

module Kernel
  def puts(text = '')
    text  = LOG_FORMAT % [Time.now.strftime(DATE_FORMAT), text.to_s]
    text += "\n" unless text[-1] == ?\n
    print text; $stdout.flush
    text
  end
  alias :log :puts
end