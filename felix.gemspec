# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'felix/version'

Gem::Specification.new do |spec|
  spec.name          = "felix"
  spec.version       = Felix::VERSION
  spec.authors       = ["mose"]
  spec.email         = ["mose@mose.com"]
  spec.description   = %q{Felix the chat is, well, a chat. Based on eventmachine and websockets.}
  spec.summary       = %q{Felix is a chat based on eventmachine and websockets.}
  spec.homepage      = "https://github.com/mose/felix"
  spec.license       = "MIT"

  spec.files         = `git ls-files`.split($/)
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_dependency "eventmachine"
  spec.add_dependency "em-websocket"
  spec.add_dependency "eventmachine"

  spec.add_development_dependency "bundler", "~> 1.3"
  spec.add_development_dependency "rake"
  spec.add_development_dependency "minitest"
end
