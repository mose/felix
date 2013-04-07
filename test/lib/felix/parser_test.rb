require_relative "../../test_helper"

require "felix/parser"

describe Felix::Parser do 

  it "can parse a message" do
    msg = '{ "author":"someone", "message":"this is a message"}'
    parsed = Felix::Parser.read(msg)
    parsed[:author].must_equal "someone"
  end
  
  it "can dump an object to json" do
    object = { who: 'someone', message: 'another'}
    encoded = Felix::Parser.write(object)
    encoded.must_equal '{"who":"someone","message":"another"}'
  end
  
end