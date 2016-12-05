User.create({username: 'user@lndmrk.com'})

InvestmentType.create([
  { name: 'max_dividends' },
  { name: 'growth' },
  { name: 'max_dividends_growth' }
])
Asset.create(
  [
    { 
      name: 'The Belcher\'s', 
      gps: '22.287247, 114.140792',  
      address: '89 Pok Fu Lam Road, Pok Fu Lam/Western Mid-levels, Hong Kong', 
      property_type: 'Private,Retail', 
      market_type: 'Fringe', 
      investment_type: 'max_dividends', 
      rating: 'A+', 
      price: '10', 
      income: '20', 
      yield: '7.1', 
      image: '/images/001.png', 
      owned: '8', 
      value: '10551', 
      debt: '0', 
      gains: '15666'
    },
    { 
      name: 'The Shard, London',             
      gps: '51.506571, -0.088292',  
      address: '32 London Bridge St, London SE1 9SG, UK', 
      property_type: 'Private,Industrial', 
      market_type: 'Prime', 
      investment_type: 'max_dividends',          
      rating: 'B+', 
      price: '10', 
      income: '20', 
      yield: '9.7', 
      image: '/images/002.png', 
      owned: '2', 
      value: '10566', 
      debt: '0', 
      gains: '700'
    },
    { 
      name: 'columbia university Wien Hall', 
      gps: '40.806703, 40.806703',  
      address: ' 411 W. 116th Street  New York, NY 10027, USA', 
      property_type: 'Private', 
      market_type: 'Prime', 
      investment_type: 'growth',          
      rating: 'B', 
      price: '10', 
      income: '20', 
      yield: '1.3', 
      image: '/images/003.png', 
      owned: '13', 
      value: '7896' ,
      debt: '0', 
      gains: '9006'
    },
    { 
      name: 'World Tower, Sydney',           
      gps: '-33.877274, 151.206691',  
      address: 'World Square, 95 Liverpool St, Sydney NSW 2000, Australia', 
      property_type: 'Industrial,Commericial,Agriculture', 
      market_type: 'Fringe', 
      investment_type: 'max_dividends_growth',
      rating: 'C-', 
      price: '10', 
      income: '20', 
      yield: '5', 
      image: '/images/004.png', 
      owned: '3', 
      value: '8066' , 
      debt: '0', 
      gains: '4622'
    },
    { 
      name: 'Azrieli towers',                
      gps: '32.074739, 34.791060',  
      address: 'Derech Menachem Begin 132, Tel Aviv-Yafo',
      property_type: 'Agriculture,Residential', 
      market_type: 'Secondary', 
      investment_type: 'growth',          
      rating: 'C', 
      price: '10', 
      income: '20', 
      yield: '4.5', 
      image: '/images/005.png', 
      owned: '5', 
      value: '76065', 
      debt: '0',
      gains: '7055' 
    },
    { 
      name: 'Taipei 101, Taiwan',            
      gps: '25.033903, 121.564510', 
      address: 'Taipei 101, No. 7, Section 5, Xinyi Rd, Xinyi District, Taipei City, Taiwan 110', 
      property_type: 'Private,Residential', 
      market_type: 'Fringe', 
      investment_type: 'max_dividends',          
      rating: 'A', 
      price: '10', 
      income: '20', 
      yield: '8.12', 
      image: '/images/001.png', 
      owned: '7', 
      value: '16546', 
      debt: '0', 
      gains: '188800' 
    },
    { 
      name: 'Burj Khalifa, Dubai',          
      gps: '25.191282, 55.272391', 
      address: '1 Sheikh Mohammed bin Rashid Blvd - Dubai - United Arab Emirates', 
      property_type: 'Commericial,Agriculture', 
      market_type: 'Secondary', 
      investment_type: 'max_dividends',          
      rating: 'A-',
      price: '10', 
      income: '20', 
      yield: '1.32', 
      image: '/images/002.png', 
      owned: '5', 
      value: '79866', 
      debt: '0', 
      gains: '40654' 
    },
    { 
      name: 'Teigen Ranch',                  
      gps: '47.039211, -108.618091', 
      address: '12356 Montana 200 Teigen, MT 59084, USA', 
      property_type: 'Agriculture,Retail', 
      market_type: 'Prime', 
      investment_type: 'growth',          
      rating: 'B', 
      price: '10', 
      income: '20', 
      yield: '7.54', 
      image: '/images/003.png', 
      owned: '4', 
      value: '78910', 
      debt: '0', 
      gains: '4546' 
    },
    { 
      name: 'Ukraine farmland',              
      gps: '51.089270, 25.013760', 
      address: 'М19, Holoby, Volyns\'ka oblast, Ukraine, 45071', 
      property_type: 'Facilities', 
      market_type: 'Prime', 
      investment_type: 'max_dividends_growth', 
      rating: 'B-', 
      price: '10', 
      income: '20', 
      yield: '8.5', 
      image: '/images/004.png', 
      owned: '2', 
      value: '65899', 
      debt: '0', 
      gains: '120' 
    },
    { 
      name: 'Olympic Residence',            
      gps: '47.912518, 106.923647', 
      address: 'Olympic Residence, UNESCO Street', 
      property_type: 'Private', 
      market_type: 'Secondary', 
      investment_type: 'growth',          
      rating: 'c', 
      price: '10', 
      income: '20', 
      yield: '10.2', 
      image: '/images/005.png', 
      owned: '11', 
      value: '15800', 
      debt: '0', 
      gains: '57655' 
    }
  ]
)

Setting.create({key: 'Locale', value: 'en_us'})
