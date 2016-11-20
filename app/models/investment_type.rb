class InvestmentType < ApplicationRecord
  validates :name, presence: true
end
