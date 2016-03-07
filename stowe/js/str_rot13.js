  //  discuss at: http://phpjs.org/functions/str_rot13/
  // original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // improved by: Ates Goral (http://magnetiq.com)
  // improved by: Rafa? Kukawski (http://blog.kukawski.pl)
  // bugfixed by: Onno Marsman
  //   example 1: str_rot13('Kevin van Zonneveld');
  //   returns 1: 'Xriva ina Mbaariryq'
  //   example 2: str_rot13('Xriva ina Mbaariryq');
  //   returns 2: 'Kevin van Zonneveld'
  //   example 3: str_rot13(33);
  //   returns 3: '33'

/*
	Use this function to encode sensitive data in url.

	Only need to ensure this file is linked in corresponding HTML page. And this JS file should be 
	the FIRST JS file to be linked except for jQuery lib. 

	Example to encrypt/decrypt:
		On JS side, 
			str_rot13(JSON.stringify(request))
		On PHP side,
			$request = json_decode(str_rot13($_GET[INIT_CHAT]));
*/
function str_rot13(str) {
  return (str + '')
    .replace(/[a-z]/gi, function(s) {
      return String.fromCharCode(s.charCodeAt(0) + (s.toLowerCase() < 'n' ? 13 : -13));
    });
}
