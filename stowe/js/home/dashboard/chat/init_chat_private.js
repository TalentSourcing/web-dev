'use strict';

const INIT_CHAT = "init_chat";
const NO_JSON_IN_STRING = "no json in string";

function initChat(host_email, user_email) {
    var request = {
        'host_email' : host_email,
        'user_email' : user_email
    };
    // send request to php
    var xmlhttp = new XMLHttpRequest();
    var response = null;
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		var json_str = extractJSONObject(xmlhttp.responseText);
		console.log(json_str);
		if (json_str != NO_JSON_IN_STRING) {
            		response = JSON.parse(json_str);
			if ('error' in response) {
		               	console.log(response.error);
		               	alert('Error: ' + response.error);
		        } else {
                		alert('Chat initializtion success!');
            		}
		}
        }
    };
    //xmlhttp.open("GET","http://localhost/init_chat_private.php?" + INIT_CHAT + "=" + str_rot13(JSON.stringify(request)), true);
    xmlhttp.open("GET","../../../../phpinit_chat_private.php?" + INIT_CHAT + "=" + str_rot13(JSON.stringify(request)), true);
    xmlhttp.send();
}

/**
 * Returns json embedded in a string
 * @param string {string}
 * @returns {string}
 */
function extractJSONObject (string) {
    var curly = string.indexOf('{');
    var bracket = string.indexOf('[');

    if (curly < 0 && bracket < 0) {
        return NO_JSON_IN_STRING;
    }
    if (curly < bracket || bracket < 0) {
        return string.substring(curly);
    }
    else if (bracket < curly || curly < 0) {
        return string.substring(bracket);
    }
}