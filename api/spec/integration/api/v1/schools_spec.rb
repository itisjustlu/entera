# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::SchoolsController, type: :request do
  describe "#index" do
    let(:result) do
      {
        results: [
          { school: { name: 'Test' } }
        ]
      }
    end

    before do
      allow(::Colleges::Client).to receive(:call).and_return(result)
    end

    it 'succeed' do
      get '/api/v1/schools'
      expect(response).to have_http_status(:ok)
    end

    it 'calls client' do
      expect(::Colleges::Client).to receive(:call).with(:schools, params: {})
      get '/api/v1/schools'
    end

    it 'returns proper data' do
      get '/api/v1/schools'
      expect(JSON.parse(response.body)).to eq({ "results" => [{ "school" => { "name" => "Test" } }] })
    end

    context 'when school.name param is present' do
      it 'whitelists school.name' do
        expect(::Colleges::Client).to receive(:call).with(:schools, params: { :'school.name' => 'Test' })
        get '/api/v1/schools', params: { 'school.name' => 'Test' }
      end
    end
  end
end
