# frozen_string_literal: true

module Api
  module V1
    class SchoolsController < ApplicationController
      def index
        results = ::Colleges::Client.call(:schools, params: index_params)
        render json: results
      end

      private

      def index_params
        {}.tap do |whitelist|
          whitelist[:'school.name'] = params[:'school.name'] if params[:'school.name'].present?
        end
      end
    end
  end
end
