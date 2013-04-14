module Felix
  class Base

    attr_reader :started_at

    def initialize
      Config.load
      @logfile = 'logs/felix.log'
      @pid = 'tmp/felix.pid'
      @server = Server.new
    end

    def start
      stop if File.exist? @pid
      fork do
        Process.setsid
        print "[\e[90mFelix\e[0m] Process daemonized with pid \e[1m%d\e[0m\n" % [Process.pid]
        File.open(@pid, 'w') { |f| f.write(Process.pid.to_s) }
        %w(INT TERM KILL).each { |signal| trap(signal)  { stop } }
        pipelog
        log 'Server started.'
        @started_at = Time.now
        @server.start
      end
    end

    def pipelog
      stream = File.new(@logfile, 'a')
      stream.sync = true
      STDOUT.reopen(stream)
      STDERR.reopen(STDOUT)
    end

    def stop
      pid_was = File.read(@pid).to_i
      print "[\e[90mFelix\e[0m] Killing process \e[1m%d\e[0m...\n" % [pid_was]
      Process.kill('KILL', pid_was)
      FileUtils.rm(@pid)
    end

    def restart
      stop
      start
    end

  end
end