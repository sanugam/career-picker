/**
 * All countries (for "Where are you based?") and for each country either
 * states (if the country has states) or cities (if it doesn't).
 * Keys in LOCATIONS_BY_COUNTRY are country name lowercase; alias keys (e.g. "usa") point to same data.
 */
(function(global) {
  var usesATAR = function(name) { return name === "Australia" || name === "Other"; };

  var COUNTRIES = [
    "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan",
    "Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi",
    "Cabo Verde","Cambodia","Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica","Côte d'Ivoire","Croatia","Cuba","Cyprus","Czech Republic",
    "Democratic Republic of the Congo","Denmark","Djibouti","Dominica","Dominican Republic",
    "Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia",
    "Fiji","Finland","France",
    "Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana",
    "Haiti","Honduras","Hungary",
    "Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy",
    "Jamaica","Japan","Jordan",
    "Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan",
    "Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg",
    "Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar",
    "Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway",
    "Oman",
    "Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal",
    "Qatar",
    "Romania","Russia","Rwanda",
    "Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","São Tomé and Príncipe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria",
    "Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu",
    "Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan",
    "Vanuatu","Vatican City","Venezuela","Vietnam",
    "Yemen",
    "Zambia","Zimbabwe"
  ];

  // Build COUNTRY_LIST with id and usesATAR
  var COUNTRY_LIST = COUNTRIES.map(function(c, i) {
    return { id: "c-" + i, name: c, usesATAR: usesATAR(c) };
  });
  // Add common aliases so "USA" and "UK" appear in search
  COUNTRY_LIST.push({ id: "usa-alt", name: "USA", usesATAR: false });
  COUNTRY_LIST.push({ id: "uk-alt", name: "UK", usesATAR: false });
  COUNTRY_LIST.push({ id: "hk", name: "Hong Kong", usesATAR: false });
  COUNTRY_LIST.push({ id: "macau", name: "Macau", usesATAR: false });
  COUNTRY_LIST.push({ id: "ivory-coast", name: "Ivory Coast", usesATAR: false });
  COUNTRY_LIST.push({ id: "other", name: "Other", usesATAR: true });

  // States (or provinces/regions) for countries that have them; otherwise cities.
  // type: "states" | "cities", list: string[]
  var LOCATIONS_BY_COUNTRY = {
    "australia": { type: "states", list: ["Australian Capital Territory","New South Wales","Northern Territory","Queensland","South Australia","Tasmania","Victoria","Western Australia"] },
    "united states": { type: "states", list: ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming","District of Columbia"] },
    "usa": { type: "states", list: ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming","District of Columbia"] },
    "canada": { type: "states", list: ["Alberta","British Columbia","Manitoba","New Brunswick","Newfoundland and Labrador","Northwest Territories","Nova Scotia","Nunavut","Ontario","Prince Edward Island","Quebec","Saskatchewan","Yukon"] },
    "united kingdom": { type: "states", list: ["England","Scotland","Wales","Northern Ireland"] },
    "uk": { type: "states", list: ["England","Scotland","Wales","Northern Ireland"] },
    "india": { type: "states", list: ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Andaman and Nicobar Islands","Chandigarh","Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry"] },
    "south africa": { type: "states", list: ["Eastern Cape","Free State","Gauteng","KwaZulu-Natal","Limpopo","Mpumalanga","Northern Cape","North West","Western Cape"] },
    "brazil": { type: "states", list: ["Acre","Alagoas","Amapá","Amazonas","Bahia","Ceará","Distrito Federal","Espírito Santo","Goiás","Maranhão","Mato Grosso","Mato Grosso do Sul","Minas Gerais","Pará","Paraíba","Paraná","Pernambuco","Piauí","Rio de Janeiro","Rio Grande do Norte","Rio Grande do Sul","Rondônia","Roraima","Santa Catarina","São Paulo","Sergipe","Tocantins"] },
    "mexico": { type: "states", list: ["Aguascalientes","Baja California","Baja California Sur","Campeche","Chiapas","Chihuahua","Coahuila","Colima","Durango","Guanajuato","Guerrero","Hidalgo","Jalisco","México","Mexico City","Michoacán","Morelos","Nayarit","Nuevo León","Oaxaca","Puebla","Querétaro","Quintana Roo","San Luis Potosí","Sinaloa","Sonora","Tabasco","Tamaulipas","Tlaxcala","Veracruz","Yucatán","Zacatecas"] },
    "germany": { type: "states", list: ["Baden-Württemberg","Bavaria","Berlin","Brandenburg","Bremen","Hamburg","Hesse","Lower Saxony","Mecklenburg-Vorpommern","North Rhine-Westphalia","Rhineland-Palatinate","Saarland","Saxony","Saxony-Anhalt","Schleswig-Holstein","Thuringia"] },
    "china": { type: "states", list: ["Anhui","Beijing","Chongqing","Fujian","Gansu","Guangdong","Guangxi","Guizhou","Hainan","Hebei","Heilongjiang","Henan","Hubei","Hunan","Jiangsu","Jiangxi","Jilin","Liaoning","Inner Mongolia","Ningxia","Qinghai","Shaanxi","Shandong","Shanghai","Shanxi","Sichuan","Tianjin","Xinjiang","Tibet","Yunnan","Zhejiang","Hong Kong","Macau"] },
    "japan": { type: "states", list: ["Aichi","Akita","Aomori","Chiba","Ehime","Fukui","Fukuoka","Fukushima","Gifu","Gunma","Hiroshima","Hokkaido","Hyogo","Ibaraki","Ishikawa","Iwate","Kagawa","Kagoshima","Kanagawa","Kochi","Kumamoto","Kyoto","Mie","Miyagi","Miyazaki","Nagano","Nagasaki","Nara","Niigata","Oita","Okayama","Okinawa","Osaka","Saga","Saitama","Shiga","Shimane","Shizuoka","Tochigi","Tokushima","Tokyo","Tottori","Toyama","Wakayama","Yamagata","Yamaguchi","Yamanashi"] },
    "nigeria": { type: "states", list: ["Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"] },
    "pakistan": { type: "states", list: ["Balochistan","Gilgit-Baltistan","Islamabad","Khyber Pakhtunkhwa","Punjab","Sindh"] },
    "indonesia": { type: "states", list: ["Aceh","Bali","Banten","Bengkulu","Gorontalo","Jakarta","Jambi","West Java","Central Java","East Java","Kalimantan","South Kalimantan","Central Kalimantan","East Kalimantan","North Kalimantan","West Kalimantan","Lampung","Maluku","North Maluku","North Sulawesi","Central Sulawesi","South Sulawesi","Southeast Sulawesi","West Sulawesi","North Sumatra","South Sumatra","West Sumatra","Riau","Riau Islands","Papua","West Papua","Yogyakarta"] },
    "malaysia": { type: "states", list: ["Johor","Kedah","Kelantan","Malacca","Negeri Sembilan","Pahang","Penang","Perak","Perlis","Sabah","Sarawak","Selangor","Terengganu","Kuala Lumpur","Labuan","Putrajaya"] },
    "argentina": { type: "states", list: ["Buenos Aires","Buenos Aires City","Catamarca","Chaco","Chubut","Córdoba","Corrientes","Entre Ríos","Formosa","Jujuy","La Pampa","La Rioja","Mendoza","Misiones","Neuquén","Río Negro","Salta","San Juan","San Luis","Santa Cruz","Santa Fe","Santiago del Estero","Tierra del Fuego","Tucumán"] },
    "italy": { type: "states", list: ["Abruzzo","Aosta Valley","Apulia","Basilicata","Calabria","Campania","Emilia-Romagna","Friuli-Venezia Giulia","Lazio","Liguria","Lombardy","Marche","Molise","Piedmont","Sardinia","Sicily","Trentino-Alto Adige","Tuscany","Umbria","Veneto"] },
    "spain": { type: "states", list: ["Andalusia","Aragon","Asturias","Balearic Islands","Basque Country","Canary Islands","Cantabria","Castile and León","Castilla-La Mancha","Catalonia","Extremadura","Galicia","La Rioja","Madrid","Murcia","Navarre","Valencian Community"] },
    "france": { type: "states", list: ["Auvergne-Rhône-Alpes","Bourgogne-Franche-Comté","Brittany","Centre-Val de Loire","Corsica","Grand Est","Hauts-de-France","Île-de-France","Normandy","Nouvelle-Aquitaine","Occitanie","Pays de la Loire","Provence-Alpes-Côte d'Azur"] },
    "russia": { type: "states", list: ["Adygea","Altai","Altai Krai","Amur","Arkhangelsk","Astrakhan","Bashkortostan","Belgorod","Bryansk","Buryatia","Chechnya","Chelyabinsk","Chukotka","Chuvashia","Dagestan","Ingushetia","Irkutsk","Ivanovo","Jewish Autonomous Oblast","Kabardino-Balkaria","Kaliningrad","Kaluga","Kamchatka","Karachay-Cherkessia","Karelia","Kemerovo","Khabarovsk","Khakassia","Khanty-Mansia","Kirov","Komi","Kostroma","Krasnodar","Krasnoyarsk","Kurgan","Kursk","Leningrad","Lipetsk","Magadan","Mari El","Mordovia","Moscow","Moscow Oblast","Murmansk","Nenets","Nizhny Novgorod","North Ossetia","Novgorod","Novosibirsk","Omsk","Orenburg","Oryol","Penza","Perm","Primorsky","Pskov","Rostov","Ryazan","Sakha","Sakhalin","Samara","Saratov","Smolensk","Stavropol","Sverdlovsk","Tambov","Tatarstan","Tomsk","Tula","Tver","Tyumen","Udmurtia","Ulyanovsk","Vladimir","Volgograd","Vologda","Voronezh","Yaroslavl","Zabaykalsky"] },
    "vietnam": { type: "states", list: ["An Giang","Bà Rịa–Vũng Tàu","Bắc Giang","Bắc Kạn","Bạc Liêu","Bắc Ninh","Bến Tre","Bình Định","Bình Dương","Bình Phước","Bình Thuận","Cà Mau","Cần Thơ","Cao Bằng","Đà Nẵng","Đắk Lắk","Đắk Nông","Điện Biên","Đồng Nai","Đồng Tháp","Gia Lai","Hà Giang","Hà Nam","Hà Nội","Hà Tĩnh","Hải Dương","Hải Phòng","Hậu Giang","Hòa Bình","Hưng Yên","Khánh Hòa","Kiên Giang","Kon Tum","Lai Châu","Lâm Đồng","Lạng Sơn","Lào Cai","Long An","Nam Định","Nghệ An","Ninh Bình","Ninh Thuận","Phú Thọ","Quảng Bình","Quảng Nam","Quảng Ngãi","Quảng Ninh","Quảng Trị","Sóc Trăng","Sơn La","Tây Ninh","Thái Bình","Thái Nguyên","Thanh Hóa","Thừa Thiên Huế","Tiền Giang","TP. Hồ Chí Minh","Trà Vinh","Tuyên Quang","Vĩnh Long","Vĩnh Phúc","Yên Bái"] },
    "thailand": { type: "states", list: ["Amnat Charoen","Ang Thong","Bangkok","Bueng Kan","Buriram","Chachoengsao","Chai Nat","Chaiyaphum","Chanthaburi","Chiang Mai","Chiang Rai","Chonburi","Chumphon","Kalasin","Kamphaeng Phet","Kanchanaburi","Khon Kaen","Krabi","Lampang","Lamphun","Loei","Lopburi","Mae Hong Son","Maha Sarakham","Mukdahan","Nakhon Nayok","Nakhon Pathom","Nakhon Phanom","Nakhon Ratchasima","Nakhon Sawan","Nakhon Si Thammarat","Nan","Narathiwat","Nong Bua Lamphu","Nong Khai","Nonthaburi","Pathum Thani","Pattani","Phang Nga","Phatthalung","Phayao","Phetchabun","Phetchaburi","Phichit","Phitsanulok","Phra Nakhon Si Ayutthaya","Phrae","Phuket","Prachinburi","Prachuap Khiri Khan","Ranong","Ratchaburi","Rayong","Roi Et","Sa Kaeo","Sakon Nakhon","Samut Prakan","Samut Sakhon","Samut Songkhram","Saraburi","Satun","Si Sa Ket","Sing Buri","Songkhla","Sukhothai","Suphan Buri","Surat Thani","Surin","Tak","Trang","Trat","Ubon Ratchathani","Udon Thani","Uthai Thani","Uttaradit","Yala","Yasothon"] },
    "philippines": { type: "states", list: ["Abra","Agusan del Norte","Agusan del Sur","Aklan","Albay","Antique","Apayao","Aurora","Basilan","Bataan","Batanes","Batangas","Benguet","Biliran","Bohol","Bukidnon","Bulacan","Cagayan","Camarines Norte","Camarines Sur","Camiguin","Capiz","Catanduanes","Cavite","Cebu","Cotabato","Davao de Oro","Davao del Norte","Davao del Sur","Davao Occidental","Davao Oriental","Dinagat Islands","Eastern Samar","Guimaras","Ifugao","Ilocos Norte","Ilocos Sur","Iloilo","Isabela","Kalinga","La Union","Laguna","Lanao del Norte","Lanao del Sur","Leyte","Maguindanao","Marinduque","Masbate","Metro Manila","Misamis Occidental","Misamis Oriental","Mountain Province","Negros Occidental","Negros Oriental","Northern Samar","Nueva Ecija","Nueva Vizcaya","Occidental Mindoro","Oriental Mindoro","Palawan","Pampanga","Pangasinan","Quezon","Quirino","Rizal","Romblon","Samar","Sarangani","Siquijor","Sorsogon","South Cotabato","Southern Leyte","Sultan Kudarat","Sulu","Surigao del Norte","Surigao del Sur","Tarlac","Tawi-Tawi","Zambales","Zamboanga del Norte","Zamboanga del Sur","Zamboanga Sibugay"] },
    "colombia": { type: "states", list: ["Amazonas","Antioquia","Arauca","Atlántico","Bogotá D.C.","Bolívar","Boyacá","Caldas","Caquetá","Casanare","Cauca","Cesar","Chocó","Córdoba","Cundinamarca","Guainía","Guaviare","Huila","La Guajira","Magdalena","Meta","Nariño","Norte de Santander","Putumayo","Quindío","Risaralda","San Andrés y Providencia","Santander","Sucre","Tolima","Valle del Cauca","Vaupés","Vichada"] },
    "egypt": { type: "states", list: ["Alexandria","Aswan","Asyut","Beheira","Beni Suef","Cairo","Dakahlia","Damietta","Faiyum","Gharbia","Giza","Ismailia","Kafr El Sheikh","Luxor","Matrouh","Minya","Monufia","New Valley","North Sinai","Port Said","Qalyubia","Qena","Red Sea","Sharqia","Sohag","South Sinai","Suez"] },
    "turkey": { type: "states", list: ["Adana","Adıyaman","Afyonkarahisar","Ağrı","Aksaray","Amasya","Ankara","Antalya","Ardahan","Artvin","Aydın","Balıkesir","Bartın","Batman","Bayburt","Bilecik","Bingöl","Bitlis","Bolu","Burdur","Bursa","Çanakkale","Çankırı","Çorum","Denizli","Diyarbakır","Düzce","Edirne","Elazığ","Erzincan","Erzurum","Eskişehir","Gaziantep","Giresun","Gümüşhane","Hakkari","Hatay","Iğdır","Isparta","Istanbul","İzmir","Kahramanmaraş","Karabük","Karaman","Kars","Kastamonu","Kayseri","Kırıkkale","Kırklareli","Kırşehir","Kilis","Kocaeli","Konya","Kütahya","Malatya","Manisa","Mardin","Mersin","Muğla","Muş","Nevşehir","Niğde","Ordu","Osmaniye","Rize","Sakarya","Samsun","Siirt","Sinop","Sivas","Şanlıurfa","Şırnak","Tekirdağ","Tokat","Trabzon","Tunceli","Uşak","Van","Yalova","Yozgat","Zonguldak"] },
    "iran": { type: "states", list: ["Alborz","Ardabil","Bushehr","Chaharmahal and Bakhtiari","East Azerbaijan","Fars","Gilan","Golestan","Hamadan","Hormozgan","Ilam","Isfahan","Kerman","Kermanshah","Khuzestan","Kohgiluyeh and Boyer-Ahmad","Kurdistan","Lorestan","Markazi","Mazandaran","North Khorasan","Qazvin","Qom","Razavi Khorasan","Semnan","Sistan and Baluchestan","South Khorasan","Tehran","West Azerbaijan","Yazd","Zanjan"] },
    "kenya": { type: "states", list: ["Baringo","Bomet","Bungoma","Busia","Elgeyo-Marakwet","Embu","Garissa","Homa Bay","Isiolo","Kajiado","Kakamega","Kericho","Kiambu","Kilifi","Kirinyaga","Kisii","Kisumu","Kitui","Kwale","Laikipia","Lamu","Machakos","Makueni","Mandera","Marsabit","Meru","Migori","Mombasa","Murang'a","Nairobi","Nakuru","Nandi","Narok","Nyamira","Nyandarua","Nyeri","Samburu","Siaya","Taita-Taveta","Tana River","Tharaka-Nithi","Trans Nzoia","Turkana","Uasin Gishu","Vihiga","Wajir","West Pokot"] },
    "ethiopia": { type: "states", list: ["Addis Ababa","Afar","Amhara","Benishangul-Gumuz","Dire Dawa","Gambela","Harari","Oromia","Somali","South West Ethiopia","Southern Nations, Nationalities, and Peoples","Tigray"] },
    "morocco": { type: "states", list: ["Tanger-Tétouan-Al Hoceïma","Oriental","Fès-Meknès","Rabat-Salé-Kénitra","Béni Mellal-Khénifra","Casablanca-Settat","Marrakesh-Safi","Drâa-Tafilalet","Souss-Massa","Guelmim-Oued Noun","Laâyoune-Sakia El Hamra","Dakhla-Oued Ed-Dahab"] },
    "tanzania": { type: "states", list: ["Arusha","Dar es Salaam","Dodoma","Geita","Iringa","Kagera","Katavi","Kigoma","Kilimanjaro","Lindi","Manyara","Mara","Mbeya","Morogoro","Mtwara","Mwanza","Njombe","Pemba North","Pemba South","Pwani","Rukwa","Ruvuma","Shinyanga","Simiyu","Singida","Songwe","Tabora","Tanga","Zanzibar North","Zanzibar South","Zanzibar West"] },
    "uganda": { type: "states", list: ["Abim","Adjumani","Agago","Alebtong","Amolatar","Amudat","Amuria","Amuru","Apac","Arua","Budaka","Bududa","Bugiri","Bugweri","Buhweju","Buikwe","Bukedea","Bukomansimbi","Bukwo","Bulambuli","Buliisa","Bundibugyo","Bunyangabu","Bushenyi","Busia","Butaleja","Butambala","Butebo","Buvuma","Buyende","Dokolo","Gomba","Gulu","Hoima","Ibanda","Iganga","Isingiro","Jinja","Kaabong","Kabale","Kabarole","Kaberamaido","Kagadi","Kakumiro","Kalangala","Kaliro","Kalungu","Kampala","Kamuli","Kamwenge","Kanungu","Kapchorwa","Kapelebyong","Karenga","Kasese","Katakwi","Kayunga","Kibaale","Kiboga","Kibuku","Kiruhura","Kiryandongo","Kisoro","Kitgum","Koboko","Kole","Kotido","Kumi","Kween","Kyankwanzi","Kyegegwa","Kyenjojo","Kyotera","Lamwo","Lira","Luuka","Luwero","Lwengo","Lyantonde","Manafwa","Maracha","Masaka","Masindi","Mayuge","Mbale","Mbarara","Mitooma","Mityana","Moroto","Moyo","Mpigi","Mubende","Mukono","Nakapiripirit","Nakaseke","Nakasongola","Namayingo","Namisindwa","Namutumba","Napak","Nebbi","Ngora","Ntoroko","Ntungamo","Nwoya","Omoro","Otuke","Oyam","Pader","Pakwach","Pallisa","Pader","Rakai","Rubanda","Rubirizi","Rukiga","Rukungiri","Sembabule","Serere","Sheema","Sironko","Soroti","Tororo","Wakiso","Yumbe","Zombo"] },
    "ghana": { type: "states", list: ["Ahafo","Ashanti","Bono","Bono East","Central","Eastern","Greater Accra","North East","Northern","Oti","Savannah","Upper East","Upper West","Volta","Western","Western North"] },
    "peru": { type: "states", list: ["Amazonas","Áncash","Apurímac","Arequipa","Ayacucho","Cajamarca","Callao","Cusco","Huancavelica","Huánuco","Ica","Junín","La Libertad","Lambayeque","Lima","Loreto","Madre de Dios","Moquegua","Pasco","Piura","Puno","San Martín","Tacna","Tumbes","Ucayali"] },
    "chile": { type: "states", list: ["Arica y Parinacota","Tarapacá","Antofagasta","Atacama","Coquimbo","Valparaíso","Metropolitana","Libertador General Bernardo O'Higgins","Maule","Ñuble","Biobío","La Araucanía","Los Ríos","Los Lagos","Aysén","Magallanes"] },
    "ecuador": { type: "states", list: ["Azuay","Bolívar","Cañar","Carchi","Chimborazo","Cotopaxi","El Oro","Esmeraldas","Galápagos","Guayas","Imbabura","Loja","Los Ríos","Manabí","Morona Santiago","Napo","Orellana","Pastaza","Pichincha","Santa Elena","Santo Domingo de los Tsáchilas","Sucumbíos","Tungurahua","Zamora-Chinchipe"] },
    "venezuela": { type: "states", list: ["Amazonas","Anzoátegui","Apure","Aragua","Barinas","Bolívar","Carabobo","Cojedes","Delta Amacuro","Falcón","Federal Dependencies","Guárico","La Guaira","Lara","Mérida","Miranda","Monagas","Nueva Esparta","Portuguesa","Sucre","Táchira","Trujillo","Yaracuy","Zulia"] },
    "poland": { type: "states", list: ["Greater Poland","Kuyavian-Pomeranian","Lesser Poland","Łódź","Lower Silesian","Lublin","Lubusz","Masovian","Opole","Podkarpackie","Podlaskie","Pomeranian","Silesian","Świętokrzyskie","Warmian-Masurian","West Pomeranian"] },
    "ukraine": { type: "states", list: ["Cherkasy","Chernihiv","Chernivtsi","Dnipropetrovsk","Donetsk","Ivano-Frankivsk","Kharkiv","Kherson","Khmelnytskyi","Kyiv","Kirovohrad","Luhansk","Lviv","Mykolaiv","Odessa","Poltava","Rivne","Sumy","Ternopil","Vinnytsia","Volyn","Zakarpattia","Zaporizhzhia","Zhytomyr"] },
    "south korea": { type: "states", list: ["Busan","North Chungcheong","South Chungcheong","Daegu","Daejeon","Gangwon","Gwangju","Gyeonggi","North Gyeongsang","South Gyeongsang","Incheon","Jeju","North Jeolla","South Jeolla","Sejong","Seoul","Ulsan"] },
    "netherlands": { type: "states", list: ["Drenthe","Flevoland","Friesland","Gelderland","Groningen","Limburg","North Brabant","North Holland","Overijssel","South Holland","Utrecht","Zeeland"] },
    "belgium": { type: "states", list: ["Antwerp","Brussels","East Flanders","Flemish Brabant","Hainaut","Liège","Limburg","Luxembourg","Namur","Walloon Brabant","West Flanders"] },
    "switzerland": { type: "states", list: ["Aargau","Appenzell Ausserrhoden","Appenzell Innerrhoden","Basel-Landschaft","Basel-Stadt","Bern","Fribourg","Geneva","Glarus","Graubünden","Jura","Lucerne","Neuchâtel","Nidwalden","Obwalden","Schaffhausen","Schwyz","Solothurn","St. Gallen","Thurgau","Ticino","Uri","Valais","Vaud","Zug","Zürich"] },
    "austria": { type: "states", list: ["Burgenland","Carinthia","Lower Austria","Salzburg","Styria","Tyrol","Upper Austria","Vienna","Vorarlberg"] },
    "greece": { type: "states", list: ["Attica","Central Greece","Central Macedonia","Crete","East Macedonia and Thrace","Epirus","Ionian Islands","North Aegean","Peloponnese","South Aegean","Thessaly","West Greece","West Macedonia"] },
    "portugal": { type: "states", list: ["Aveiro","Beja","Braga","Bragança","Castelo Branco","Coimbra","Évora","Faro","Guarda","Leiria","Lisbon","Portalegre","Porto","Santarém","Setúbal","Viana do Castelo","Vila Real","Viseu","Azores","Madeira"] },
    "sweden": { type: "states", list: ["Blekinge","Dalarna","Gävleborg","Gotland","Halland","Jämtland","Jönköping","Kalmar","Kronoberg","Norrbotten","Örebro","Östergötland","Skåne","Södermanland","Stockholm","Uppsala","Värmland","Västerbotten","Västernorrland","Västmanland","Västra Götaland"] },
    "norway": { type: "states", list: ["Agder","Innlandet","Møre og Romsdal","Nordland","Oslo","Rogaland","Vestfold og Telemark","Troms og Finnmark","Trøndelag","Vestland","Viken"] },
    "denmark": { type: "states", list: ["Capital Region","Central Denmark","North Denmark","Zealand","Southern Denmark"] },
    "finland": { type: "states", list: ["Åland","Central Finland","Central Ostrobothnia","Finland Proper","Kainuu","Kanta-Häme","Kymenlaakso","Lapland","North Ostrobothnia","North Savo","North Karelia","Northern Ostrobothnia","Ostrobothnia","Pirkanmaa","Satakunta","South Karelia","South Ostrobothnia","South Savo","Southern Ostrobothnia","Tavastia Proper","Uusimaa"] },
    "new zealand": { type: "states", list: ["Auckland","Bay of Plenty","Canterbury","Gisborne","Hawke's Bay","Manawatū-Whanganui","Marlborough","Northland","Otago","Southland","Taranaki","Tasman","Waikato","Wellington","West Coast"] },
    "bangladesh": { type: "states", list: ["Barisal","Chittagong","Dhaka","Khulna","Mymensingh","Rajshahi","Rangpur","Sylhet"] },
    "iraq": { type: "states", list: ["Al Anbar","Basra","Dhi Qar","Babil","Baghdad","Diyala","Karbala","Maysan","Muthanna","Najaf","Nineveh","Qadisiyyah","Saladin","Wasit","Erbil","Dohuk","Sulaymaniyah"] },
    "saudi arabia": { type: "states", list: ["Al Bahah","Al Jawf","Northern Borders","Eastern Province","Ha'il","Madinah","Makkah","Najran","Qassim","Riyadh","Tabuk"] },
    "united arab emirates": { type: "states", list: ["Abu Dhabi","Ajman","Dubai","Fujairah","Ras Al Khaimah","Sharjah","Umm Al Quwain"] },
    "kazakhstan": { type: "states", list: ["Akmola","Aktobe","Almaty","Atyrau","Baikonur","East Kazakhstan","Jambyl","Karaganda","Kostanay","Kyzylorda","Mangystau","North Kazakhstan","Pavlodar","Turkistan","West Kazakhstan","Astana","Almaty City","Shymkent"] },
    "uzbekistan": { type: "states", list: ["Andijan","Bukhara","Fergana","Jizzakh","Karakalpakstan","Kashkadarya","Khorezm","Namangan","Navoiy","Samarkand","Surkhandarya","Syrdarya","Tashkent","Tashkent City"] },
    "myanmar": { type: "states", list: ["Ayeyarwady","Bago","Chin","Kachin","Kayah","Kayin","Magway","Mandalay","Mon","Naypyidaw","Rakhine","Sagaing","Shan","Tanintharyi","Yangon"] },
    "sri lanka": { type: "states", list: ["Central","Eastern","North Central","Northern","North Western","Sabaragamuwa","Southern","Uva","Western"] },
    "nepal": { type: "states", list: ["Province No. 1","Province No. 2","Bagmati","Gandaki","Karnali","Lumbini","Sudurpashchim"] },
    "democratic republic of the congo": { type: "states", list: ["Bas-Uélé","Équateur","Haut-Katanga","Haut-Lomami","Haut-Uélé","Ituri","Kasaï","Kasaï Oriental","Kasaï-Central","Kinshasa","Kongo Central","Kwango","Kwilu","Lomami","Lualaba","Mai-Ndombe","Maniema","Mongala","North Kivu","Nord-Ubangi","Sankuru","South Kivu","Sud-Ubangi","Tanganyika","Tshopo","Tshuapa"] },
    "sudan": { type: "states", list: ["Kassala","Khartoum","North Darfur","North Kordofan","Northern","Red Sea","River Nile","Sennar","South Darfur","South Kordofan","West Darfur","West Kordofan","White Nile","Blue Nile","Central Darfur","East Darfur"] },
    "algeria": { type: "states", list: ["Adrar","Chlef","Laghouat","Oum El Bouaghi","Batna","Béjaïa","Biskra","Béchar","Blida","Bouira","Tamanrasset","Tébessa","Tlemcen","Tiaret","Tizi Ouzou","Algiers","Djelfa","Jijel","Sétif","Saïda","Skikda","Sidi Bel Abbès","Annaba","Guelma","Constantine","Médéa","Mostaganem","M'Sila","Mascara","Ouargla","Oran","El Bayadh","Illizi","Bordj Bou Arréridj","Boumerdès","El Tarf","Tindouf","Tissemsilt","El Oued","Khenchela","Souk Ahras","Tipasa","Mila","Aïn Defla","Naâma","Aïn Témouchent","Ghardaïa","Relizane"] },
    "libya": { type: "states", list: ["Al Wahat","Benghazi","Derna","Ghat","Jabal al Akhdar","Jabal al Gharbi","Jafara","Kufra","Marj","Misrata","Murqub","Nalut","Nuqat al Khams","Sabha","Sirte","Tripoli","Wadi al Hayaa","Wadi al Shatii","Zawiya"] },
    "yemen": { type: "states", list: ["Aden","Amran","Abyan","Ad Dali","Al Bayda","Al Hudaydah","Al Jawf","Al Mahrah","Al Mahwit","Amanat Al Asimah","Dhamar","Hadhramaut","Hajjah","Ibb","Lahij","Ma'rib","Raymah","Saada","Sana'a","Taiz","Socotra"] },
    "syria": { type: "states", list: ["Aleppo","Damascus","Daraa","Deir ez-Zor","Hama","Homs","Idlib","Latakia","Quneitra","Raqqa","Rif Dimashq","Tartus"] },
    "mozambique": { type: "states", list: ["Cabo Delgado","Gaza","Inhambane","Manica","Maputo","Maputo City","Nampula","Niassa","Sofala","Tete","Zambezia"] },
    "zambia": { type: "states", list: ["Central","Copperbelt","Eastern","Luapula","Lusaka","Muchinga","Northern","Northwestern","Southern","Western"] },
    "zimbabwe": { type: "states", list: ["Bulawayo","Harare","Manicaland","Mashonaland Central","Mashonaland East","Mashonaland West","Masvingo","Matabeleland North","Matabeleland South","Midlands"] },
    "cameroon": { type: "states", list: ["Adamawa","Centre","East","Far North","Littoral","North","Northwest","South","Southwest","West"] },
    "ivory coast": { type: "states", list: ["Abidjan","Bas-Sassandra","Comoé","Denguélé","Gôh-Djiboua","Lacs","Lagunes","Montagnes","Sassandra-Marahoué","Savanes","Vallée du Bandama","Worodougou","Zanzan"] },
    "côte d'ivoire": { type: "states", list: ["Abidjan","Bas-Sassandra","Comoé","Denguélé","Gôh-Djiboua","Lacs","Lagunes","Montagnes","Sassandra-Marahoué","Savanes","Vallée du Bandama","Worodougou","Zanzan"] }
  };

  // Countries that don't have states: use cities
  var cityCountries = {
    "singapore": { type: "cities", list: ["Singapore","Jurong East","Woodlands","Tampines","Hougang","Yishun","Changi","Sentosa","Bukit Timah","Orchard","Marina Bay"] },
    "hong kong": { type: "cities", list: ["Hong Kong Island","Kowloon","New Territories","Central","Tsim Sha Tsui","Mong Kok","Sha Tin","Tuen Mun","Yuen Long","Kwai Tsing"] },
    "macau": { type: "cities", list: ["Macau Peninsula","Taipa","Coloane","Cotai"] },
    "malta": { type: "cities", list: ["Valletta","Sliema","St. Julian's","Victoria","Mosta","Birkirkara","Qormi","Żabbar","Naxxar","Mdina"] },
    "luxembourg": { type: "cities", list: ["Luxembourg City","Esch-sur-Alzette","Differdange","Dudelange","Ettelbruck","Diekirch","Wiltz","Grevenmacher","Remich","Vianden"] },
    "monaco": { type: "cities", list: ["Monaco-Ville","Monte Carlo","La Condamine","Fontvieille"] },
    "andorra": { type: "cities", list: ["Andorra la Vella","Escaldes-Engordany","Encamp","Sant Julià de Lòria","La Massana","Ordino","Canillo"] },
    "liechtenstein": { type: "cities", list: ["Vaduz","Schaan","Balzers","Triesen","Eschen","Mauren","Triesenberg","Ruggell","Gamprin","Schellenberg","Planken"] },
    "san marino": { type: "cities", list: ["San Marino City","Borgo Maggiore","Serravalle","Domagnano","Fiorentino","Acquaviva","Chiesanuova","Montegiardino","Faetano"] },
    "vatican city": { type: "cities", list: ["Vatican City"] },
    "cyprus": { type: "cities", list: ["Nicosia","Limassol","Larnaca","Famagusta","Paphos","Kyrenia","Protaras","Ayia Napa","Polis"] },
    "iceland": { type: "cities", list: ["Reykjavík","Kópavogur","Hafnarfjörður","Akureyri","Garðabær","Mosfellsbær","Árborg","Selfoss","Ísafjörður","Húsavík"] },
    "bahrain": { type: "cities", list: ["Manama","Muharraq","Riffa","Hamad Town","A'ali","Isa Town","Sitra","Budaiya","Jidhafs","Al Muharraq"] },
    "qatar": { type: "cities", list: ["Doha","Al Rayyan","Al Wakrah","Al Khor","Umm Salal","Madinat ash Shamal","Dukhan"] },
    "kuwait": { type: "cities", list: ["Kuwait City","Hawalli","Farwaniya","Ahmadi","Jahra","Mubarak Al-Kabeer"] },
    "oman": { type: "cities", list: ["Muscat","Salalah","Sohar","Nizwa","Sur","Ibri","Barka","Rustaq","Saham","Buraimi"] },
    "maldives": { type: "cities", list: ["Malé","Addu City","Fuvahmulah","Kulhudhuffushi","Thinadhoo","Hithadhoo","Vilimalé","Hulhumalé"] },
    "brunei": { type: "cities", list: ["Bandar Seri Begawan","Kuala Belait","Seria","Tutong","Bangar","Sukang"] },
    "mauritius": { type: "cities", list: ["Port Louis","Beau Bassin-Rose Hill","Vacoas-Phoenix","Curepipe","Quatre Bornes","Triolet","Goodlands","Centre de Flacq","Mahébourg","Saint Pierre"] },
    "seychelles": { type: "cities", list: ["Victoria","Anse Boileau","Beau Vallon","Cascade","Takamaka","Grand Anse","La Digue","Praslin"] },
    "bahamas": { type: "cities", list: ["Nassau","Freeport","West End","Coopers Town","Marsh Harbour","Freetown","Spanish Wells","Clarence Town"] },
    "barbados": { type: "cities", list: ["Bridgetown","Speightstown","Oistins","Holetown","Bathsheba","Six Cross Roads"] },
    "belize": { type: "cities", list: ["Belize City","Belmopan","San Ignacio","Orange Walk","Dangriga","Corozal","Punta Gorda","Benque Viejo"] },
    "jamaica": { type: "cities", list: ["Kingston","Montego Bay","Spanish Town","Portmore","Mandeville","Ocho Rios","Negril","Savanna-la-Mar","Port Antonio","Morant Bay"] },
    "trinidad and tobago": { type: "cities", list: ["Port of Spain","San Fernando","Chaguanas","Arima","Point Fortin","Tunapuna","Scarborough","Sangre Grande"] },
    "panama": { type: "cities", list: ["Panama City","Colón","David","La Chorrera","Santiago","Chitré","Aguadulce","Penonomé","Almirante","Bocas del Toro"] },
    "costa rica": { type: "cities", list: ["San José","Limón","Alajuela","Heredia","Cartago","Puntarenas","Liberia","Quesada","San Isidro","Curridabat"] },
    "nicaragua": { type: "cities", list: ["Managua","León","Masaya","Granada","Chinandega","Estelí","Matagalpa","Jinotega","Bluefields","Juigalpa"] },
    "el salvador": { type: "cities", list: ["San Salvador","Santa Ana","San Miguel","Mejicanos","Soyapango","Santa Tecla","Apopa","Delgado","Sonsonate","San Martín"] },
    "honduras": { type: "cities", list: ["Tegucigalpa","San Pedro Sula","La Ceiba","Choloma","El Progreso","Choluteca","Comayagua","Siguatepeque","La Lima","Danlí"] },
    "guatemala": { type: "cities", list: ["Guatemala City","Mixco","Villa Nueva","Quetzaltenango","San Juan Sacatepéquez","Escuintla","Villa Canales","Chinautla","Amatitlán","Chimaltenango"] },
    "cuba": { type: "cities", list: ["Havana","Santiago de Cuba","Camagüey","Holguín","Guantánamo","Santa Clara","Las Tunas","Bayamo","Cienfuegos","Pinar del Río"] },
    "dominican republic": { type: "cities", list: ["Santo Domingo","Santiago","Santo Domingo Este","Santo Domingo Norte","San Pedro de Macorís","La Romana","San Cristóbal","San Felipe","Puerto Plata","La Vega"] },
    "haiti": { type: "cities", list: ["Port-au-Prince","Cap-Haïtien","Gonaïves","Saint-Marc","Les Cayes","Petion-Ville","Verrettes","Jacmel","Delmas","Port-de-Paix"] },
    "puerto rico": { type: "cities", list: ["San Juan","Bayamón","Carolina","Ponce","Caguas","Guaynabo","Mayagüez","Trujillo Alto","Arecibo","Fajardo"] },
    "albania": { type: "cities", list: ["Tirana","Durrës","Vlorë","Elbasan","Shkodër","Fier","Korçë","Berat","Lushnjë","Kavajë"] },
    "north macedonia": { type: "cities", list: ["Skopje","Bitola","Kumanovo","Prilep","Ohrid","Strumica","Tetovo","Veles","Štip","Kočani"] },
    "bosnia and herzegovina": { type: "cities", list: ["Sarajevo","Banja Luka","Tuzla","Zenica","Mostar","Bihać","Brčko","Prijedor","Doboj","Široki Brijeg"] },
    "croatia": { type: "cities", list: ["Zagreb","Split","Rijeka","Osijek","Zadar","Pula","Slavonski Brod","Karlovac","Varaždin","Šibenik"] },
    "slovenia": { type: "cities", list: ["Ljubljana","Maribor","Celje","Kranj","Velenje","Koper","Novo Mesto","Ptuj","Trbovlje","Kamnik"] },
    "slovakia": { type: "cities", list: ["Bratislava","Košice","Prešov","Žilina","Nitra","Banská Bystrica","Martin","Trenčín","Poprad","Prievidza"] },
    "estonia": { type: "cities", list: ["Tallinn","Tartu","Narva","Pärnu","Kohtla-Järve","Viljandi","Rakvere","Maardu","Sillamäe","Kuressaare"] },
    "latvia": { type: "cities", list: ["Riga","Daugavpils","Liepāja","Jelgava","Jūrmala","Ventspils","Rēzekne","Valmiera","Ogre","Jēkabpils"] },
    "lithuania": { type: "cities", list: ["Vilnius","Kaunas","Klaipėda","Šiauliai","Panevėžys","Alytus","Marijampolė","Mažeikiai","Jonava","Utena"] },
    "ireland": { type: "cities", list: ["Dublin","Cork","Limerick","Galway","Waterford","Drogheda","Dundalk","Swords","Bray","Navan"] },
    "israel": { type: "cities", list: ["Jerusalem","Tel Aviv","Haifa","Rishon LeZion","Petah Tikva","Netanya","Ashdod","Be'er Sheva","Holon","Bnei Brak"] },
    "lebanon": { type: "cities", list: ["Beirut","Tripoli","Sidon","Tyre","Nabatieh","Jounieh","Zahle","Baalbek","Byblos","Batroun"] },
    "jordan": { type: "cities", list: ["Amman","Zarqa","Irbid","Russeifa","Al Quwaysimah","Wadi as-Sir","Tila al-Ali","Aqaba","Madaba","As-Salt"] },
    "palestine": { type: "cities", list: ["Gaza","Hebron","Nablus","Ramallah","Jenin","Bethlehem","Jericho","Tulkarm","Qalqilya","Tubas"] },
    "georgia": { type: "cities", list: ["Tbilisi","Batumi","Kutaisi","Rustavi","Gori","Zugdidi","Poti","Sukhumi","Samtredia","Senaki"] },
    "armenia": { type: "cities", list: ["Yerevan","Gyumri","Vanadzor","Vagharshapat","Abovyan","Kapan","Hrazdan","Armavir","Artashat","Gavar"] },
    "azerbaijan": { type: "cities", list: ["Baku","Ganja","Sumqayit","Mingachevir","Lankaran","Nakhchivan","Shirvan","Shaki","Yevlakh","Khirdalan"] },
    "mongolia": { type: "cities", list: ["Ulaanbaatar","Erdenet","Darkhan","Choibalsan","Mörön","Nalaikh","Khovd","Ölgii","Ulaangom","Baganuur"] },
    "laos": { type: "cities", list: ["Vientiane","Pakse","Savannakhet","Luang Prabang","Thakhek","Xam Neua","Phonsavan","Vang Vieng","Muang Xay","Saravan"] },
    "cambodia": { type: "cities", list: ["Phnom Penh","Battambang","Siem Reap","Sihanoukville","Prey Veng","Kampong Cham","Kampot","Pursat","Kratie","Kampong Thom"] },
    "botswana": { type: "cities", list: ["Gaborone","Francistown","Molepolole","Maun","Serowe","Selibe Phikwe","Tlokweng","Kanye","Palapye","Mochudi"] },
    "namibia": { type: "cities", list: ["Windhoek","Walvis Bay","Swakopmund","Rundu","Otjiwarongo","Oshakati","Grootfontein","Katima Mulilo","Keetmanshoop","Tsumeb"] },
    "lesotho": { type: "cities", list: ["Maseru","Teyateyaneng","Mafeteng","Hlotse","Mohale's Hoek","Maputsoe","Qacha's Nek","Quthing","Butha-Buthe","Mokhotlong"] },
    "eswatini": { type: "cities", list: ["Mbabane","Manzini","Lobamba","Siteki","Nhlangano","Piggs Peak","Mankayane","Big Bend","Mhlume","Kwaluseni"] },
    "madagascar": { type: "cities", list: ["Antananarivo","Toamasina","Antsirabe","Fianarantsoa","Mahajanga","Toliara","Antsiranana","Ambovombe","Amparafaravola","Moramanga"] },
    "rwanda": { type: "cities", list: ["Kigali","Butare","Gitarama","Gisenyi","Byumba","Cyangugu","Nyanza","Kibungo","Gikongoro","Ruhengeri"] },
    "liberia": { type: "cities", list: ["Monrovia","Gbarnga","Buchanan","Ganta","Kakata","Bensonville","Harper","Voinjama","Zwedru","Robertsport"] },
    "sierra leone": { type: "cities", list: ["Freetown","Bo","Kenema","Makeni","Koidu","Lunsar","Port Loko","Pandebu","Kabala","Waterloo"] },
    "senegal": { type: "cities", list: ["Dakar","Touba","Thiès","Rufisque","Kaolack","Ziguinchor","Saint-Louis","Mbour","Diourbel","Louga"] },
    "tunisia": { type: "cities", list: ["Tunis","Sfax","Sousse","Kairouan","Bizerte","Gabès","Ariana","Gafsa","Monastir","Béja"] }
  };

  // Merge city-only into LOCATIONS (city list overrides when both exist for same country)
  Object.keys(cityCountries).forEach(function(k) {
    LOCATIONS_BY_COUNTRY[k] = cityCountries[k];
  });

  global.COUNTRY_LIST = COUNTRY_LIST;
  global.LOCATIONS_BY_COUNTRY = LOCATIONS_BY_COUNTRY;
})(typeof window !== "undefined" ? window : this);
