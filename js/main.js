'use strict'

function init() {

    let primaryColor = '';
    let lat;
    let lon;
    let mapGenerated = false;

    document.getElementById('searchSubmit').addEventListener('click', () => {

        let citySearch = document.getElementById('searchCity').value;
        let countrySearch = document.getElementById('searchCountry').value;

        if (citySearch == '') {
            location.href = `index.html?error=404`;
        } else if (countrySearch == '') {
            location.href = `index.html?city=${citySearch}`;
        } else {
            location.href = `index.html?city=${citySearch}&country=${countrySearch}`;
        }

    });

    function getData() {

        function getQueryVariable(variable) {
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0] == variable) {
                    return pair[1];
                }
            }
            return (undefined);
        }

        let city = getQueryVariable('city');
        let country = getQueryVariable('country');
        let error = getQueryVariable('error');

        if (city == undefined && country == undefined) {
            document.documentElement.style.setProperty('--c-primary', '#23AD3A');
            document.getElementById('noVars').classList.remove('dis-none');
            document.getElementById('main').classList.add('dis-none');
            if (error == '404') {
                let divContent = document.getElementById('noVars').innerHTML
                document.getElementById('noVars').innerHTML = '<div id="error404">Error 404 - Location Not Found</div>' + divContent
            }
        } else if (country == undefined) {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=17384ab1509349c5d55f3eb667c2850a`)
                .then((response) => {
                    return response.json();
                })
                .then((jsonData) => {
                    updateData(jsonData);
                    generateSvg(jsonData);
                })
        } else {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&appid=17384ab1509349c5d55f3eb667c2850a`)
                .then((response) => {
                    return response.json();
                })
                .then((jsonData) => {
                    updateData(jsonData);
                    generateSvg(jsonData);
                })
        }

        //source https://gist.github.com/keeguon/2310008
        let countriesArray = [{
                name: 'Afghanistan',
                code: 'AF'
            },
            {
                name: 'Åland Islands',
                code: 'AX'
            },
            {
                name: 'Albania',
                code: 'AL'
            },
            {
                name: 'Algeria',
                code: 'DZ'
            },
            {
                name: 'American Samoa',
                code: 'AS'
            },
            {
                name: 'AndorrA',
                code: 'AD'
            },
            {
                name: 'Angola',
                code: 'AO'
            },
            {
                name: 'Anguilla',
                code: 'AI'
            },
            {
                name: 'Antarctica',
                code: 'AQ'
            },
            {
                name: 'Antigua and Barbuda',
                code: 'AG'
            },
            {
                name: 'Argentina',
                code: 'AR'
            },
            {
                name: 'Armenia',
                code: 'AM'
            },
            {
                name: 'Aruba',
                code: 'AW'
            },
            {
                name: 'Australia',
                code: 'AU'
            },
            {
                name: 'Austria',
                code: 'AT'
            },
            {
                name: 'Azerbaijan',
                code: 'AZ'
            },
            {
                name: 'Bahamas',
                code: 'BS'
            },
            {
                name: 'Bahrain',
                code: 'BH'
            },
            {
                name: 'Bangladesh',
                code: 'BD'
            },
            {
                name: 'Barbados',
                code: 'BB'
            },
            {
                name: 'Belarus',
                code: 'BY'
            },
            {
                name: 'Belgium',
                code: 'BE'
            },
            {
                name: 'Belize',
                code: 'BZ'
            },
            {
                name: 'Benin',
                code: 'BJ'
            },
            {
                name: 'Bermuda',
                code: 'BM'
            },
            {
                name: 'Bhutan',
                code: 'BT'
            },
            {
                name: 'Bolivia',
                code: 'BO'
            },
            {
                name: 'Bosnia and Herzegovina',
                code: 'BA'
            },
            {
                name: 'Botswana',
                code: 'BW'
            },
            {
                name: 'Bouvet Island',
                code: 'BV'
            },
            {
                name: 'Brazil',
                code: 'BR'
            },
            {
                name: 'British Indian Ocean Territory',
                code: 'IO'
            },
            {
                name: 'Brunei Darussalam',
                code: 'BN'
            },
            {
                name: 'Bulgaria',
                code: 'BG'
            },
            {
                name: 'Burkina Faso',
                code: 'BF'
            },
            {
                name: 'Burundi',
                code: 'BI'
            },
            {
                name: 'Cambodia',
                code: 'KH'
            },
            {
                name: 'Cameroon',
                code: 'CM'
            },
            {
                name: 'Canada',
                code: 'CA'
            },
            {
                name: 'Cape Verde',
                code: 'CV'
            },
            {
                name: 'Cayman Islands',
                code: 'KY'
            },
            {
                name: 'Central African Republic',
                code: 'CF'
            },
            {
                name: 'Chad',
                code: 'TD'
            },
            {
                name: 'Chile',
                code: 'CL'
            },
            {
                name: 'China',
                code: 'CN'
            },
            {
                name: 'Christmas Island',
                code: 'CX'
            },
            {
                name: 'Cocos (Keeling) Islands',
                code: 'CC'
            },
            {
                name: 'Colombia',
                code: 'CO'
            },
            {
                name: 'Comoros',
                code: 'KM'
            },
            {
                name: 'Congo',
                code: 'CG'
            },
            {
                name: 'Congo, The Democratic Republic of the',
                code: 'CD'
            },
            {
                name: 'Cook Islands',
                code: 'CK'
            },
            {
                name: 'Costa Rica',
                code: 'CR'
            },
            {
                name: 'Cote D\'Ivoire',
                code: 'CI'
            },
            {
                name: 'Croatia',
                code: 'HR'
            },
            {
                name: 'Cuba',
                code: 'CU'
            },
            {
                name: 'Cyprus',
                code: 'CY'
            },
            {
                name: 'Czech Republic',
                code: 'CZ'
            },
            {
                name: 'Denmark',
                code: 'DK'
            },
            {
                name: 'Djibouti',
                code: 'DJ'
            },
            {
                name: 'Dominica',
                code: 'DM'
            },
            {
                name: 'Dominican Republic',
                code: 'DO'
            },
            {
                name: 'Ecuador',
                code: 'EC'
            },
            {
                name: 'Egypt',
                code: 'EG'
            },
            {
                name: 'El Salvador',
                code: 'SV'
            },
            {
                name: 'Equatorial Guinea',
                code: 'GQ'
            },
            {
                name: 'Eritrea',
                code: 'ER'
            },
            {
                name: 'Estonia',
                code: 'EE'
            },
            {
                name: 'Ethiopia',
                code: 'ET'
            },
            {
                name: 'Falkland Islands (Malvinas)',
                code: 'FK'
            },
            {
                name: 'Faroe Islands',
                code: 'FO'
            },
            {
                name: 'Fiji',
                code: 'FJ'
            },
            {
                name: 'Finland',
                code: 'FI'
            },
            {
                name: 'France',
                code: 'FR'
            },
            {
                name: 'French Guiana',
                code: 'GF'
            },
            {
                name: 'French Polynesia',
                code: 'PF'
            },
            {
                name: 'French Southern Territories',
                code: 'TF'
            },
            {
                name: 'Gabon',
                code: 'GA'
            },
            {
                name: 'Gambia',
                code: 'GM'
            },
            {
                name: 'Georgia',
                code: 'GE'
            },
            {
                name: 'Germany',
                code: 'DE'
            },
            {
                name: 'Ghana',
                code: 'GH'
            },
            {
                name: 'Gibraltar',
                code: 'GI'
            },
            {
                name: 'Greece',
                code: 'GR'
            },
            {
                name: 'Greenland',
                code: 'GL'
            },
            {
                name: 'Grenada',
                code: 'GD'
            },
            {
                name: 'Guadeloupe',
                code: 'GP'
            },
            {
                name: 'Guam',
                code: 'GU'
            },
            {
                name: 'Guatemala',
                code: 'GT'
            },
            {
                name: 'Guernsey',
                code: 'GG'
            },
            {
                name: 'Guinea',
                code: 'GN'
            },
            {
                name: 'Guinea-Bissau',
                code: 'GW'
            },
            {
                name: 'Guyana',
                code: 'GY'
            },
            {
                name: 'Haiti',
                code: 'HT'
            },
            {
                name: 'Heard Island and Mcdonald Islands',
                code: 'HM'
            },
            {
                name: 'Holy See (Vatican City State)',
                code: 'VA'
            },
            {
                name: 'Honduras',
                code: 'HN'
            },
            {
                name: 'Hong Kong',
                code: 'HK'
            },
            {
                name: 'Hungary',
                code: 'HU'
            },
            {
                name: 'Iceland',
                code: 'IS'
            },
            {
                name: 'India',
                code: 'IN'
            },
            {
                name: 'Indonesia',
                code: 'ID'
            },
            {
                name: 'Iran, Islamic Republic Of',
                code: 'IR'
            },
            {
                name: 'Iraq',
                code: 'IQ'
            },
            {
                name: 'Ireland',
                code: 'IE'
            },
            {
                name: 'Isle of Man',
                code: 'IM'
            },
            {
                name: 'Israel',
                code: 'IL'
            },
            {
                name: 'Italy',
                code: 'IT'
            },
            {
                name: 'Jamaica',
                code: 'JM'
            },
            {
                name: 'Japan',
                code: 'JP'
            },
            {
                name: 'Jersey',
                code: 'JE'
            },
            {
                name: 'Jordan',
                code: 'JO'
            },
            {
                name: 'Kazakhstan',
                code: 'KZ'
            },
            {
                name: 'Kenya',
                code: 'KE'
            },
            {
                name: 'Kiribati',
                code: 'KI'
            },
            {
                name: 'Korea, Democratic People\'S Republic of',
                code: 'KP'
            },
            {
                name: 'Korea, Republic of',
                code: 'KR'
            },
            {
                name: 'Kuwait',
                code: 'KW'
            },
            {
                name: 'Kyrgyzstan',
                code: 'KG'
            },
            {
                name: 'Lao People\'S Democratic Republic',
                code: 'LA'
            },
            {
                name: 'Latvia',
                code: 'LV'
            },
            {
                name: 'Lebanon',
                code: 'LB'
            },
            {
                name: 'Lesotho',
                code: 'LS'
            },
            {
                name: 'Liberia',
                code: 'LR'
            },
            {
                name: 'Libyan Arab Jamahiriya',
                code: 'LY'
            },
            {
                name: 'Liechtenstein',
                code: 'LI'
            },
            {
                name: 'Lithuania',
                code: 'LT'
            },
            {
                name: 'Luxembourg',
                code: 'LU'
            },
            {
                name: 'Macao',
                code: 'MO'
            },
            {
                name: 'Macedonia, The Former Yugoslav Republic of',
                code: 'MK'
            },
            {
                name: 'Madagascar',
                code: 'MG'
            },
            {
                name: 'Malawi',
                code: 'MW'
            },
            {
                name: 'Malaysia',
                code: 'MY'
            },
            {
                name: 'Maldives',
                code: 'MV'
            },
            {
                name: 'Mali',
                code: 'ML'
            },
            {
                name: 'Malta',
                code: 'MT'
            },
            {
                name: 'Marshall Islands',
                code: 'MH'
            },
            {
                name: 'Martinique',
                code: 'MQ'
            },
            {
                name: 'Mauritania',
                code: 'MR'
            },
            {
                name: 'Mauritius',
                code: 'MU'
            },
            {
                name: 'Mayotte',
                code: 'YT'
            },
            {
                name: 'Mexico',
                code: 'MX'
            },
            {
                name: 'Micronesia, Federated States of',
                code: 'FM'
            },
            {
                name: 'Moldova, Republic of',
                code: 'MD'
            },
            {
                name: 'Monaco',
                code: 'MC'
            },
            {
                name: 'Mongolia',
                code: 'MN'
            },
            {
                name: 'Montserrat',
                code: 'MS'
            },
            {
                name: 'Morocco',
                code: 'MA'
            },
            {
                name: 'Mozambique',
                code: 'MZ'
            },
            {
                name: 'Myanmar',
                code: 'MM'
            },
            {
                name: 'Namibia',
                code: 'NA'
            },
            {
                name: 'Nauru',
                code: 'NR'
            },
            {
                name: 'Nepal',
                code: 'NP'
            },
            {
                name: 'Netherlands',
                code: 'NL'
            },
            {
                name: 'Netherlands Antilles',
                code: 'AN'
            },
            {
                name: 'New Caledonia',
                code: 'NC'
            },
            {
                name: 'New Zealand',
                code: 'NZ'
            },
            {
                name: 'Nicaragua',
                code: 'NI'
            },
            {
                name: 'Niger',
                code: 'NE'
            },
            {
                name: 'Nigeria',
                code: 'NG'
            },
            {
                name: 'Niue',
                code: 'NU'
            },
            {
                name: 'Norfolk Island',
                code: 'NF'
            },
            {
                name: 'Northern Mariana Islands',
                code: 'MP'
            },
            {
                name: 'Norway',
                code: 'NO'
            },
            {
                name: 'Oman',
                code: 'OM'
            },
            {
                name: 'Pakistan',
                code: 'PK'
            },
            {
                name: 'Palau',
                code: 'PW'
            },
            {
                name: 'Palestinian Territory, Occupied',
                code: 'PS'
            },
            {
                name: 'Panama',
                code: 'PA'
            },
            {
                name: 'Papua New Guinea',
                code: 'PG'
            },
            {
                name: 'Paraguay',
                code: 'PY'
            },
            {
                name: 'Peru',
                code: 'PE'
            },
            {
                name: 'Philippines',
                code: 'PH'
            },
            {
                name: 'Pitcairn',
                code: 'PN'
            },
            {
                name: 'Poland',
                code: 'PL'
            },
            {
                name: 'Portugal',
                code: 'PT'
            },
            {
                name: 'Puerto Rico',
                code: 'PR'
            },
            {
                name: 'Qatar',
                code: 'QA'
            },
            {
                name: 'Reunion',
                code: 'RE'
            },
            {
                name: 'Romania',
                code: 'RO'
            },
            {
                name: 'Russian Federation',
                code: 'RU'
            },
            {
                name: 'RWANDA',
                code: 'RW'
            },
            {
                name: 'Saint Helena',
                code: 'SH'
            },
            {
                name: 'Saint Kitts and Nevis',
                code: 'KN'
            },
            {
                name: 'Saint Lucia',
                code: 'LC'
            },
            {
                name: 'Saint Pierre and Miquelon',
                code: 'PM'
            },
            {
                name: 'Saint Vincent and the Grenadines',
                code: 'VC'
            },
            {
                name: 'Samoa',
                code: 'WS'
            },
            {
                name: 'San Marino',
                code: 'SM'
            },
            {
                name: 'Sao Tome and Principe',
                code: 'ST'
            },
            {
                name: 'Saudi Arabia',
                code: 'SA'
            },
            {
                name: 'Senegal',
                code: 'SN'
            },
            {
                name: 'Serbia and Montenegro',
                code: 'CS'
            },
            {
                name: 'Seychelles',
                code: 'SC'
            },
            {
                name: 'Sierra Leone',
                code: 'SL'
            },
            {
                name: 'Singapore',
                code: 'SG'
            },
            {
                name: 'Slovakia',
                code: 'SK'
            },
            {
                name: 'Slovenia',
                code: 'SI'
            },
            {
                name: 'Solomon Islands',
                code: 'SB'
            },
            {
                name: 'Somalia',
                code: 'SO'
            },
            {
                name: 'South Africa',
                code: 'ZA'
            },
            {
                name: 'South Georgia and the South Sandwich Islands',
                code: 'GS'
            },
            {
                name: 'Spain',
                code: 'ES'
            },
            {
                name: 'Sri Lanka',
                code: 'LK'
            },
            {
                name: 'Sudan',
                code: 'SD'
            },
            {
                name: 'Suriname',
                code: 'SR'
            },
            {
                name: 'Svalbard and Jan Mayen',
                code: 'SJ'
            },
            {
                name: 'Swaziland',
                code: 'SZ'
            },
            {
                name: 'Sweden',
                code: 'SE'
            },
            {
                name: 'Switzerland',
                code: 'CH'
            },
            {
                name: 'Syrian Arab Republic',
                code: 'SY'
            },
            {
                name: 'Taiwan, Province of China',
                code: 'TW'
            },
            {
                name: 'Tajikistan',
                code: 'TJ'
            },
            {
                name: 'Tanzania, United Republic of',
                code: 'TZ'
            },
            {
                name: 'Thailand',
                code: 'TH'
            },
            {
                name: 'Timor-Leste',
                code: 'TL'
            },
            {
                name: 'Togo',
                code: 'TG'
            },
            {
                name: 'Tokelau',
                code: 'TK'
            },
            {
                name: 'Tonga',
                code: 'TO'
            },
            {
                name: 'Trinidad and Tobago',
                code: 'TT'
            },
            {
                name: 'Tunisia',
                code: 'TN'
            },
            {
                name: 'Turkey',
                code: 'TR'
            },
            {
                name: 'Turkmenistan',
                code: 'TM'
            },
            {
                name: 'Turks and Caicos Islands',
                code: 'TC'
            },
            {
                name: 'Tuvalu',
                code: 'TV'
            },
            {
                name: 'Uganda',
                code: 'UG'
            },
            {
                name: 'Ukraine',
                code: 'UA'
            },
            {
                name: 'United Arab Emirates',
                code: 'AE'
            },
            {
                name: 'United Kingdom',
                code: 'GB'
            },
            {
                name: 'United States',
                code: 'US'
            },
            {
                name: 'United States Minor Outlying Islands',
                code: 'UM'
            },
            {
                name: 'Uruguay',
                code: 'UY'
            },
            {
                name: 'Uzbekistan',
                code: 'UZ'
            },
            {
                name: 'Vanuatu',
                code: 'VU'
            },
            {
                name: 'Venezuela',
                code: 'VE'
            },
            {
                name: 'Viet Nam',
                code: 'VN'
            },
            {
                name: 'Virgin Islands, British',
                code: 'VG'
            },
            {
                name: 'Virgin Islands, U.S.',
                code: 'VI'
            },
            {
                name: 'Wallis and Futuna',
                code: 'WF'
            },
            {
                name: 'Western Sahara',
                code: 'EH'
            },
            {
                name: 'Yemen',
                code: 'YE'
            },
            {
                name: 'Zambia',
                code: 'ZM'
            },
            {
                name: 'Zimbabwe',
                code: 'ZW'
            }
        ];

        let populateCountrySelect = '<option value="">select a country</option>';

        for (let i = 0; i < countriesArray.length; i++) {
            populateCountrySelect += `<option value="${countriesArray[i].code}">${countriesArray[i].code}</option>`
        }

        document.getElementById('searchCountry').innerHTML = populateCountrySelect;
    }

    getData();




    function updateData(jsonData) {

        if (jsonData.cod === '404') {
            location.href = `index.html?error=404`;
        }

        lat = jsonData.city.coord.lat;
        lon = jsonData.city.coord.lon;

        let weatherIconData = '<img src="images/icons/';
        weatherIconData += `${jsonData.list[0].weather[0].icon}.svg"><p>${jsonData.list[0].weather[0].main.toLowerCase()}</p>`;
        document.getElementById('weatherIcon').innerHTML = weatherIconData;

        let temperatureDataC = Math.round(jsonData.list[0].main.temp);
        let temperatureDataF = Math.round(temperatureDataC * 9 / 5 + 32);
        document.getElementById('temperature').innerHTML = `${temperatureDataC}°C / ${temperatureDataF}°F`;

        let temperatureDataMinC = Math.round(jsonData.list[0].main.temp_min);
        let temperatureDataMinF = Math.round(temperatureDataMinC * 9 / 5 + 32);
        let temperatureDataMaxC = Math.round(jsonData.list[0].main.temp_max);
        let temperatureDataMaxF = Math.round(temperatureDataMaxC * 9 / 5 + 32);
        document.getElementById('temperatureMinMax').innerHTML = `min: ${temperatureDataMinC}°C / ${temperatureDataMinF}°F max: ${temperatureDataMaxC}°C / ${temperatureDataMaxF}°F`

        let windSpeedKmh = Math.round(jsonData.list[0].wind.speed * 3.6);
        let windSpeedMph = Math.round(windSpeedKmh / 1.6);
        let windDirection = Math.round(jsonData.list[0].wind.deg);
        let windDirectionSimple;
        if (windDirection > 337.5 || windDirection < 22.5) {
            windDirectionSimple = 'N';
        } else if (windDirection > 22.5 && windDirection < 67.5) {
            windDirectionSimple = 'NE';
        } else if (windDirection > 67.5 && windDirection < 112.5) {
            windDirectionSimple = 'E';
        } else if (windDirection > 112.5 && windDirection < 157.5) {
            windDirectionSimple = 'SE';
        } else if (windDirection > 157.5 && windDirection < 202.5) {
            windDirectionSimple = 'S';
        } else if (windDirection > 202.5 && windDirection < 247.5) {
            windDirectionSimple = 'SW';
        } else if (windDirection > 247.5 && windDirection < 292.5) {
            windDirectionSimple = 'W';
        } else if (windDirection > 292.5 && windDirection < 337.5) {
            windDirectionSimple = 'NW';
        }

        document.getElementById('wind').innerHTML = `${windDirectionSimple} ${windSpeedKmh} km/h /  ${windSpeedMph} mp/h`;
        document.getElementById('pressure').innerHTML = `${Math.round(jsonData.list[0].main.pressure)} hPa`;
        document.getElementById('humidity').innerHTML = `${Math.round(jsonData.list[0].main.humidity)}%`;
        document.getElementById('dateGen').innerHTML = `forecast for: ${jsonData.list[0].dt_txt} UTC`;
        document.getElementById('location').innerHTML = `${jsonData.city.name} / <span> ${jsonData.city.country} </span>`;

        if (temperatureDataC < 23) {
            document.documentElement.style.setProperty('--c-primary', '#0080FF');
            primaryColor = '#0080FF';
        } else if (temperatureDataC >= 23 && temperatureDataC < 27) {
            document.documentElement.style.setProperty('--c-primary', '#23AD3A');
            primaryColor = '#23AD3A';
        } else {
            document.documentElement.style.setProperty('--c-primary', '#FF6600');
            primaryColor = '#FF6600';
        }
    }

    function generateSvg(jsonData) {
        let generateData = [];
        let maxGraphWidth = 1224;
        let maxGraphHeight = 70;
        let maxTemp;
        let minTemp;

        for (let i = 0; i < jsonData.list.length; i++) {
            if (jsonData.list[i].dt_txt.includes('00:00:00') || jsonData.list[i].dt_txt.includes('12:00:00')) {
                let pushToArray = {
                    'temp': Math.round(jsonData.list[i].main.temp),
                    'weather': jsonData.list[i].weather[0].main,
                    'time': jsonData.list[i].dt_txt
                };
                generateData.push(pushToArray);
            }
        }

        function tempDifference() {
            let lowestTemp = generateData[0].temp;
            let highestTemp = generateData[0].temp;

            for (let i = 1; i < generateData.length; i++) {

                if (generateData[i].temp < lowestTemp) {
                    lowestTemp = generateData[i].temp;
                } else if (generateData[i].temp > highestTemp) {
                    highestTemp = generateData[i].temp;
                }

                minTemp = lowestTemp;
                maxTemp = highestTemp;
            }
        }

        tempDifference();

        let xUnit = maxGraphWidth / (generateData.length - 1);
        let yUnit = maxGraphHeight / (maxTemp - minTemp);

        let weatherDateHour0;
        if (generateData[0].time.substring(11, 13) == '12') {
            weatherDateHour0 = 'D';
        } else {
            weatherDateHour0 = 'N';
        }

        let svgContent = 'M 48,' + ((maxTemp - generateData[0].temp) * yUnit + 52) + ' L ';
        let svgText = `
    <text x="48" y="16" text-anchor="middle" font-size="18px" fill="#464646"> ${generateData[0].time.substring(8, 10)}.${generateData[0].time.substring(5, 7)} ${weatherDateHour0} </text>
    <text x="48" y="38" text-anchor="middle" font-size="18px" fill="#464646"> ${generateData[0].weather} </text>
    <text x="48" y="156" text-anchor="middle" font-size="18px" fill="#464646"> ${generateData[0].temp}°C </text>
    <text x="48" y="180" text-anchor="middle" font-size="18px" fill="#464646"> ${Math.round(generateData[0].temp * 9 / 5 + 32)}°F </text>
    `;

        for (let i = 1; i < generateData.length; i++) {
            let yPos = (maxTemp - generateData[i].temp) * yUnit + 52;
            let xPos = i * xUnit + 48;
            svgContent += xPos + ',' + yPos + ' ';
            let weatherDateDay = generateData[i].time.substring(8, 10);
            let weatherDateMonth = generateData[i].time.substring(5, 7);
            let weatherDateHour;
            if (generateData[i].time.substring(11, 13) == '12') {
                weatherDateHour = 'D';
            } else {
                weatherDateHour = 'N';
            }
            svgText += `
            <text x="${xPos}" y="16" text-anchor="middle" font-size="18px" fill="#464646"> ${weatherDateDay}.${weatherDateMonth} ${weatherDateHour} </text>
            <text x="${xPos}" y="38" text-anchor="middle" font-size="18px" fill="#464646"> ${generateData[i].weather} </text>
            <text x="${xPos}" y="156" text-anchor="middle" font-size="18px" fill="#464646"> ${generateData[i].temp}°C </text>
            <text x="${xPos}" y="180" text-anchor="middle" font-size="18px" fill="#464646"> ${Math.round(generateData[i].temp * 9 / 5 + 32)}°F </text>
            `;
        }

        document.getElementById('svgData').innerHTML = `${svgText}<path fill="${primaryColor}" fill-opacity="0.2" id="graphFill"></path><path fill="none" stroke-width="3" stroke="${primaryColor}" id="graphStroke"></path>`

        document.getElementById('graphStroke').setAttribute('d', svgContent);
        let svgContentFill = svgContent + 1272 + ' ' + 132 + ' ' + 48 + ' ' + 132;
        document.getElementById('graphFill').setAttribute('d', svgContentFill);

    }

    document.getElementById('mapButton').addEventListener('click', () => {
        if (mapGenerated == false) {
            generateMap(lon, lat);
            document.getElementById('mapFullscreen').style = 'display: initial;';

            document.getElementById('closeMap').addEventListener('click', () => {
                document.getElementById('mapFullscreen').style = 'display: none;';
            })
        } else {
            document.getElementById('mapFullscreen').style = 'display: initial;';
        }
    })

    



    function generateMap(lon, lat) {

        // long2tile and lat2tile source: https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Lon..2Flat._to_tile_numbers_2
        function long2tile(lon, zoom) {
            return (Math.floor((lon + 180) / 360 * Math.pow(2, zoom)));
        }

        function lat2tile(lat, zoom) {
            return (Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom)));
        }

        let tilesList = [];
        let originX = long2tile(lon, 7);
        let originY = lat2tile(lat, 7)

        tilesList.push({
            'x': originX - 1,
            'y': originY - 1
        });
        tilesList.push({
            'x': originX,
            'y': originY - 1
        });
        tilesList.push({
            'x': originX + 1,
            'y': originY - 1
        });

        tilesList.push({
            'x': originX - 1,
            'y': originY
        });
        tilesList.push({
            'x': originX,
            'y': originY
        });
        tilesList.push({
            'x': originX + 1,
            'y': originY
        });

        tilesList.push({
            'x': originX - 1,
            'y': originY + 1
        });
        tilesList.push({
            'x': originX,
            'y': originY + 1
        });
        tilesList.push({
            'x': originX + 1,
            'y': originY + 1
        });

        for (let i = 0; i < tilesList.length; i++) {
            document.getElementById('map').innerHTML += `<img src="https://tile.openweathermap.org/map/precipitation_new/7/${tilesList[i].x}/${tilesList[i].y}.png?appid=17384ab1509349c5d55f3eb667c2850a" id="MapGenerated${i}">`;
            document.getElementById(`MapGenerated${i}`).style.background = `url('http://sat.owm.io/sql/7/${tilesList[i].x}/${tilesList[i].y}?&appid=17384ab1509349c5d55f3eb667c2850a&overzoom=true&op=truecolor&from=cloudless&order=best')`;
        }

        mapGenerated = true;

    }

}

init();