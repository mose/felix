module Felix
  module Config
    extend self

    attr_reader :host, :port

    def self.load
      config = YAML.load_file(self.config_file)
      @host = config['host']
      @port = config['port']
    end

    def self.config_file
      configfile = File.expand_path("../../../config.yml",__FILE__)
      unless File.file? configfile
        default = File.expand_path("../../../config.default.yml",__FILE__)
        FileUtils.cp(default,configfile)
      end
      configfile
    end

  end
end