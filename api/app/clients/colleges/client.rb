# frozen_string_literal: true

module Colleges
  class Client
    BASE_URL = "https://api.data.gov/ed/collegescorecard/"

    PATHS = {
      schools: "v1/schools.json",
    }

    class << self
      def call(path, method: :get, params: {})
        new(path, method: method, params: params).call
      end
    end

    def initialize(path, method: :get, params: {})
      @path = path
      @method = method
      @params = params
    end

    def call
      connection.send(@method, PATHS[@path], params).body
    end

    private

    def connection
      @connection ||= Faraday.new(url: BASE_URL) do |conn|
        conn.request :json
        conn.response :json, content_type: /\bjson$/
        conn.adapter :net_http
      end
    end

    def params
      {
        api_key: ENV["COLLEGES_CORE_CARD_KEY"],
        # 'school.name': "This is lu testing",
      }.merge(@params)
    end
  end
end
