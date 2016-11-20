
InvestmentType.create([
  { name: 'income' },
  { name: 'income & growth' },
  { name: 'growth' }
])

Asset.create(
  [
    { name: 'azrieli towers, tlv',  investment_type: 'income',          risk: 'b', price: '10', income: '20', yield: '7.1', image: '/images/001.png', owned: '8', value: '10551', debt: '0', gains: '15666'},
    { name: 'trump towers, nyc',    investment_type: 'income',          risk: 'c', price: '10', income: '20', yield: '7.1', image: '/images/002.png', owned: '2', value: '10566', debt: '0', gains: '700'},
    { name: 'land for investment',  investment_type: 'growth',          risk: 'd', price: '10', income: '20', yield: '7.1', image: '/images/003.png', owned: '13', value: '7896' , debt: '0', gains: '9006'},
    { name: 'ramat aviv mall, tlv', investment_type: 'income & growth', risk: 'b', price: '10', income: '20', yield: '7.1', image: '/images/004.png', owned: '3', value: '8066' , debt: '0', gains: '4622'},
    { name: 'land for investment',  investment_type: 'growth',          risk: 'b', price: '10', income: '20', yield: '7.1', image: '/images/005.png', owned: '5', value: '76065', debt: '0',gains: '7055' },
    { name: 'azrieli towers, tlv',  investment_type: 'income',          risk: 'b', price: '10', income: '20', yield: '7.1', image: '/images/001.png', owned: '7', value: '16546', debt: '0', gains: '188800' },
    { name: 'trump towers, nyc',    investment_type: 'income',          risk: 'c', price: '10', income: '20', yield: '7.1', image: '/images/002.png', owned: '5', value: '79866', debt: '0', gains: '40654' },
    { name: 'land for investment',  investment_type: 'growth',          risk: 'd', price: '10', income: '20', yield: '7.1', image: '/images/003.png', owned: '4', value: '78910', debt: '0', gains: '4546' },
    { name: 'ramat aviv mall, tlv', investment_type: 'income & growth', risk: 'b', price: '10', income: '20', yield: '7.1', image: '/images/004.png', owned: '2', value: '65899', debt: '0', gains: '120' },
    { name: 'land for investment',  investment_type: 'growth',          risk: 'b', price: '10', income: '20', yield: '7.1', image: '/images/005.png', owned: '11', value: '15800', debt: '0', gains: '57655' }
  ]
)

Setting.create({key: 'Locale', value: 'en_us'})
