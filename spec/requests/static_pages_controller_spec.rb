require 'rails_helper'

describe 'Static pages' do
  describe 'Home page' do
    it "should have the content 'TDD template'" do
      visit '/'
      expect(page).to have_content('TDD template')
    end
  end
end
