export const context = {
  soapApis: [
    {
      label: 'Weather by City Name',
      url: 'http://www.webservicex.net/globalweather.asmx?WSDL',
      SOAPAction: 'http://www.webservicex.net/globalweather.asmx'
    },
    {
      label: 'Currency Converter',
      url: 'http://currencyconverter.kowabunga.net/converter.asmx?WSDL',
      SOAPAction: 'http://webservices.cloanto.com/currencyserver/convertCurrency'
    },
    {
      label: 'Global Weather',
      url: 'http://wsf.cdyne.com/WeatherWS/Weather.asmx?WSDL',
      SOAPAction: 'http://ws.cdyne.com/WeatherWS/GetCityForecastByZIP'
    },
    {
      label: 'Stock Quote',
      url: 'http://www.webservicex.net/stockquote.asmx?WSDL',
      SOAPAction: 'http://www.webserviceX.NET/GetQuote'
    },
    {
      label: 'Country Info',
      url: 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL',
      SOAPAction: 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso'
    },
    {
      label: 'Calculator',
      url: 'http://www.dneonline.com/calculator.asmx?WSDL',
      SOAPAction: 'http://tempuri.org/Add'
    },
    {
      label: 'Number Conversion',
      url: 'http://www.dataaccess.com/webservicesserver/NumberConversion.wso?WSDL',
      SOAPAction: 'http://www.dataaccess.com/webservicesserver/NumberConversion.wso'
    },
    {
      label: 'Zip Code Information',
      url: 'http://www.webservicex.net/uszip.asmx?WSDL',
      SOAPAction: 'http://www.webservicex.net/uszip.asmx'
    },
    {
      label: 'Holiday Service',
      url: 'http://www.holidaywebservice.com/Holidays/US/Dates/USHolidayDates.asmx?WSDL',
      SOAPAction: 'http://www.holidaywebservice.com/Holidays/US/Dates/USHolidayDates.asmx'
    },
    {
      label: 'NDFD XML',
      url: 'http://graphical.weather.gov/xml/SOAP_server/ndfdXMLserver.php?wsdl',
      SOAPAction: 'http://www.weather.gov/forecasts/xml/DWMLgen/wsdl/ndfdXML.wsdl'
    }
  ]
};
