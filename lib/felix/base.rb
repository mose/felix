module Felix
  class Base

    attr_reader :started_at

    def initialize
      Config.load
      @log = 'logs/felix.log'
      @pid = 'tmp/felix.pid'
    end

    def start
      fork {
        Process.setsid
        print "[\e[90mFelix\e[0m] Process daemonized with pid \e[1m%d\e[0m\n" % [ Process.pid ]
        File.open(@pid, "w") { |f| f.write(Process.pid.to_s) }
        %w(INT TERM KILL).each { |signal| trap(signal)  { stop } }
        stream = File.new(@log, 'a')
        stream.sync = true
        STDOUT.reopen(stream)
        STDERR.reopen(STDOUT)
        @started_at = Time.now
        while true do
          puts Time.now
          sleep 2
        end
      }
    end

    def stop
      pid_was = File.read(@pid).to_i
      print "[\e[90mFelix\e[0m] Killing process \e[1m%d\e[0m...\n" % [pid_was]
      Process.kill(:KILL, pid_was)
    end

    def restart
      stop
      start
    end

  end
end