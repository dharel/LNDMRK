
InvestmentType.create([
  { name: 'income' },
  { name: 'income & growth' },
  { name: 'growth' }
])

Asset.create(
  [
    { name: 'azrieli towers, tlv',  gps: '22.285556,114.133611', address: 'Ramat aviv mall', property_type: 'Private,Retail', market_type: 'Fringe', investment_type: 'income',          rating: 'A+', price: '10', income: '20', yield: '7.1', image: '/images/001.png', owned: '8', value: '10551', debt: '0', gains: '15666'},
    { name: 'trump towers, nyc',    gps: '40.806873,-73.959672', address: 'TRump Tower new york', property_type: 'Private,Industrial', market_type: 'Prime', investment_type: 'income',          rating: 'B+', price: '10', income: '20', yield: '9.7', image: '/images/002.png', owned: '2', value: '10566', debt: '0', gains: '700'},
    { name: 'land for investment',  gps: '60.104,29.968', address: 'Azrieli Tel aviv', property_type: 'Private', market_type: 'Prime', investment_type: 'growth',          rating: 'B', price: '10', income: '20', yield: '1.3', image: '/images/003.png', owned: '13', value: '7896' , debt: '0', gains: '9006'},
    { name: 'ramat aviv mall, tlv', gps: '47.912712,106.923687', address: 'Ramat aviv mall', property_type: 'Industrial,Commericial,Agriculture', market_type: 'Fringe', investment_type: 'income & growth', rating: 'C-', price: '10', income: '20', yield: '5', image: '/images/004.png', owned: '3', value: '8066' , debt: '0', gains: '4622'},
    { name: 'land for investment',  gps: '47.037675,-108.609431', address: 'Ramat aviv mall', property_type: 'Agriculture,Residential', market_type: 'Secondary', investment_type: 'growth',          rating: 'C', price: '10', income: '20', yield: '4.5', image: '/images/005.png', owned: '5', value: '76065', debt: '0',gains: '7055' },
    { name: 'azrieli towers, tlv',  gps: '34.065411, -83.984702', address: 'Ramat aviv mall', property_type: 'Private,Residential', market_type: 'Fringe', investment_type: 'income',          rating: 'A', price: '10', income: '20', yield: '8.12', image: '/images/001.png', owned: '7', value: '16546', debt: '0', gains: '188800' },
    { name: 'trump towers, nyc',    gps: '-26.139167, 28.246111', address: 'Ramat aviv mall', property_type: 'Commericial,Agriculture', market_type: 'Secondary', investment_type: 'income',          rating: 'A-', price: '10', income: '20', yield: '1.32', image: '/images/002.png', owned: '5', value: '79866', debt: '0', gains: '40654' },
    { name: 'land for investment',  gps: '45.335333, -107.018833', address: 'Ramat aviv mall', property_type: 'Agriculture,Retail', market_type: 'Prime', investment_type: 'growth',          rating: 'B', price: '10', income: '20', yield: '7.54', image: '/images/003.png', owned: '4', value: '78910', debt: '0', gains: '4546' },
    { name: 'ramat aviv mall, tlv', gps: '31.236667, 121.502778', address: 'Ramat aviv mall', property_type: 'Facilities', market_type: 'Prime', investment_type: 'income & growth', rating: 'B-', price: '10', income: '20', yield: '8.5', image: '/images/004.png', owned: '2', value: '65899', debt: '0', gains: '120' },
    { name: 'land for investment',  gps: '40.751700, -73.975300', address: 'Ramat aviv mall', property_type: 'Private', market_type: 'Secondary', investment_type: 'growth',          rating: 'c', price: '10', income: '20', yield: '10.2', image: '/images/005.png', owned: '11', value: '15800', debt: '0', gains: '57655' }
  ]
)

Setting.create({key: 'Locale', value: 'en_us'})
