class Asset < ApplicationRecord
  validates :name, presence: true

  def short_data
    res = {
      id: id,
      name: name,
      investment_type: investment_type,
      risk: risk,
      price: price,
      income: income,
      yeild: yeild,
      image: image
    }

    return res
  end
end
