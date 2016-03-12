'use strict';

const DASHBOARD_KEY = 'dashboard';
const IND_CHAT_LIST = 'ind_chat_list';
const GROUP_CHAT_LIST ='group_chat_list';
const GET_INDV_MSG = 'get_indv_msg';
const GET_GROUP_MSG = 'get_group_msg';
const SEND_INDV_MSG = 'send_indv_msg';
const SEND_GROUP_MSG = 'send_group_msg';
const GET_CHAT_ID = 'get_chat_id';

var user_email;
var user_name = 'Naina Raut';

$(document).ready(function (){
	
	var dashboard = JSON.parse(sessionStorage.getItem(DASHBOARD_KEY));
	user_email = dashboard.user_email;
	$("#sender").text(user_name);
	
   //display individual chat list	
	displayIndividual(user_email);
	
	//adjust the scroll bar
	adjustScroll();
	
	//get continuous messages
	setInterval(function(){  
	
		if(sessionStorage.getItem('IndvData') !== null || sessionStorage.getItem('GroupData') !== null)
		{
			var IndvData = JSON.parse(sessionStorage.getItem('IndvData'));
			var GroupData = JSON.parse(sessionStorage.getItem('GroupData'));

			if(IndvData.receiverEmail != null){
				getIndvMessages(IndvData.receiverEmail+","+IndvData.receiverName);	
			}
			else if(GroupData.group_id != null){
				getGrpMessages(GroupData.group_id+","+GroupData.group_name);
			}
		}
	}, 2000);
});

function adjustScroll(){	
			$(".chat").animate({ scrollTop: $(document).height() }, "fast");
  			return false;
		}

function displayIndividual(user_email)
{
   	var userData = {'user_email':user_email};
   	var xmlhttp = new XMLHttpRequest();
	var response = null;

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			console.log(xmlhttp.responseText);
			var json_str = extractJSONObject(xmlhttp.responseText);
			console.log("getchatList: " + json_str);
			response = JSON.parse(json_str);
			if ('error' in response) {
				console.log("geteditgroupFields: " + response.error);
			}
			else {
				generateHtml(response);
				displayGroups(user_email);
			}
		}
	};

	xmlhttp.open("GET","../../../../php/Chat_test_php.php?" + IND_CHAT_LIST + "=" + JSON.stringify(userData), true);
	xmlhttp.send();
}

function displayGroups(user_email)
{
	var userData = {'user_email':user_email};
    var xmlhttp = new XMLHttpRequest();
	var response = null;

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			console.log(xmlhttp.responseText);
			var json_str = extractJSONObject(xmlhttp.responseText);
			console.log("getchatList: " + json_str);
			response = JSON.parse(json_str);
			if ('error' in response) {
				console.log("geteditgroupFields: " + response.error);
			}
			else {
				generateHtml2(response);
			}
		}
	};

	xmlhttp.open("GET","../../../../php/Chat_test_php.php?" + GROUP_CHAT_LIST + "=" + JSON.stringify(userData), true);
	xmlhttp.send();
}

//individual chat list
function generateHtml(chatList)
{
	$(document).ready(function() {
		
		 if (chatList === null) {
            console.log('No chat list to display for ind');
            // TODO print message to list
            return null;
        }
		
		var listData = $("#listData");
		 chatList.forEach(function(member){
			 var person = "<li class='names' onclick=\"(IndvOnClick('"+member.user_email +","+member.first_name+" "+member.last_name+"'))\">"+
							"<div id='listPic'><img src='"+member.profile_img+"' width='20%' height='10%'></div>"+
							"<div id='listName'>"+member.first_name+" "+member.last_name+"</div>"+
						  "</li>";
			 listData.append(person);
		 });
	});
}

//group chat list
function generateHtml2(chatList)
{
	$(document).ready(function() {
		
		 if (chatList === null) {
            console.log('No chat list to display for group');
            // TODO print message to list
            return null;
        }
		
		var listData = $("#listData");
		
		var groupTitle = "<li id='groupTitle'>Groups</li>";
		listData.append(groupTitle);
		
		chatList.forEach(function(group){
			 var person = "<li class='names' onclick=\"(groupOnClick('"+group.group_id+","+group.group_name+"'))\">"+
							"<div id='listPic'><img src='"+group.group_img+"' width='20%' height='10%'></div>"+
							"<div id='listName'>"+group.group_name+"</div>"+
						  "</li>";
			 listData.append(person);
		 });
		
	});
}

function IndvOnClick(receiverData)
{
	getChatId();
	getIndvMessages(receiverData);
	//adjust the scroll bar to bottom
	adjustScroll();
}

function getChatId()
{
	var chat_id = {'action':'chat_id'};
	var xmlhttp = new XMLHttpRequest();
	var response = null;

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			console.log(xmlhttp.responseText);
			var json_str = extractJSONObject(xmlhttp.responseText);
			console.log("getChatId: " + json_str);
			response = JSON.parse(json_str);
			if ('error' in response) {
				console.log("getChatId: " + response.error);
			}
			else {
				console.log('success in getChatId');
				var ChatData = {'chat_id':response.chat_id};
				sessionStorage.setItem('ChatData', JSON.stringify(ChatData));
			}
		}
	};

	xmlhttp.open("GET","../../../../php/Chat_test_php.php?" + GET_CHAT_ID + "=" + JSON.stringify(chat_id), true);
	xmlhttp.send();
}

//get messages for individuals
function getIndvMessages(receiverData)
{
	var arr = receiverData.split(",");
	var receiverEmail = arr[0];
	var receiverName = arr[1];
	var userData = {'sender_email': user_email,'receiver_email':receiverEmail};
	var xmlhttp = new XMLHttpRequest();
	var response = null;
	var IndvData;
	var GroupData;
	
	//save the currect receiver in the session object and remove the group id
	IndvData = {
            'receiverEmail' : receiverEmail,
            'receiverName' : receiverName
        };
	
	GroupData = {
		'group_id' : null,
		'group_name':null
	};
	
	sessionStorage.setItem('IndvData', JSON.stringify(IndvData));
	sessionStorage.setItem('GroupData', JSON.stringify(GroupData));
	

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			console.log(xmlhttp.responseText);
			var json_str = extractJSONObject(xmlhttp.responseText);
			console.log("getIndvMessages: " + json_str);
			response = JSON.parse(json_str);
			if ('error' in response) {
				console.log("getIndvMessages: " + response.error);
				//remove previous messages
				$(".messages").empty();
			}
			else {
				generateHtml3(response,receiverName);
			}
		}
	};

	xmlhttp.open("GET","../../../../php/Chat_test_php.php?" + GET_INDV_MSG + "=" + JSON.stringify(userData), true);
	xmlhttp.send();
}

function groupOnClick(groupData)
{
	getChatId();
	getGrpMessages(groupData);
	//adjust the scroll bar to bottom
	adjustScroll();
}

//get Group Messages
function getGrpMessages(groupData)
{
	var arr = groupData.split(",");
	var group_id = arr[0];
	var group_name = arr[1];
	var userData = {'sender_email': user_email,'group_id':group_id};
	var xmlhttp = new XMLHttpRequest();
	var response = null;
	
	//save the currect receiver in the session object and remove the group id
	var IndvData = {
            'receiverEmail' : null,
            'receiverName' : null
        };
	
	var GroupData = {
		'group_id' : group_id,
		'group_name':group_name
	};
	
	sessionStorage.setItem('IndvData', JSON.stringify(IndvData));
	sessionStorage.setItem('GroupData', JSON.stringify(GroupData));

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			console.log(xmlhttp.responseText);
			var json_str = extractJSONObject(xmlhttp.responseText);
			console.log("getGrpMessages: " + json_str);
			response = JSON.parse(json_str);
			if ('error' in response) {
				console.log("getGrpMessages: " + response.error);
				//remove previous messages
				$(".messages").empty();
			}
			else {
				generateHtml4(response,group_name);
			}
		}
	};

	xmlhttp.open("GET","../../../../php/Chat_test_php.php?" + GET_GROUP_MSG + "=" + JSON.stringify(userData), true);
	xmlhttp.send();
}

//display the chat messages for individual
function generateHtml3(msg,receiverName){
	$(document).ready(function() {
		
		//remove previous messages
		$(".messages").empty();
		
		 if (msg === null) {
            console.log('No messages to display for individual');
            // TODO print message to list
            return null;
        }
		
		var messages = $(".messages");
		msg.forEach(function(indv){
			if(indv.user_email == user_email){
				var msg = "<div id='m2'>"+
								"<div id='m2-1'>"+
									"<p>"+indv.text_line+"<b> :"+user_name+"</b></p>"+
								"</div>"+
							"</div>";
			}
			else{
					var msg = "<div id='m1'>"+
						   			"<div id='m1-1'>"+
							   			"<p><b>"+receiverName+": </b>"+indv.text_line+"</p>"+
						   			"</div>"+
								"</div>";
				}
			messages.append(msg);
		});
	});
}

//display the chat messages for individual
function generateHtml4(msg,receiverName){
	$(document).ready(function() {
		
		//remove the previous messages
		$(".messages").empty();
		
		 if (msg === null) {
            console.log('No messages to display for individual');
            // TODO print message to list
            return null;
        }
		
		var messages = $(".messages");
		msg.forEach(function(indv){
			if(indv.user_email == user_email){
				var msg = "<div id='m2'>"+
								"<div id='m2-1'>"+
									"<p>"+indv.text_line+"<b> :"+user_name+"</b></p>"+
								"</div>"+
							"</div>";
			}
			else{
					var msg = "<div id='m1'>"+
						   			"<div id='m1-1'>"+
							   			"<p><b>"+indv.first_name+" "+indv.last_name+": </b>"+indv.text_line+"</p>"+
						   			"</div>"+
								"</div>";
				}
			messages.append(msg);
		});
	});
}

//send Message
function sendMessage()
{
	$(document).ready(function(){
		
		console.log("In send message");
		
		var IndvData = JSON.parse(sessionStorage.getItem('IndvData'));
		var GroupData = JSON.parse(sessionStorage.getItem('GroupData'));
		var sentMsg = $("textarea#searchtext").val();
		
		console.log(IndvData);
		console.log(GroupData);
		console.log(sentMsg);
		
		if(IndvData.receiverEmail != null){
			sendIndvMessage(IndvData.receiverEmail,IndvData.receiverName,sentMsg);	
		}
		else if(GroupData.group_id != null){
			sendGroupMsg(GroupData.group_id,GroupData.group_name,sentMsg);
		}
		
		//adjust the scroll bar
		adjustScroll();
	});
}

function sendIndvMessage(receiverEmail,receiverName,sentMsg)
{
	console.log("In indv send message");
	var chatData = JSON.parse(sessionStorage.getItem('ChatData'));
	var IndvData = {
			'senderEmail': user_email,
		    'receiverEmail': receiverEmail,
			'chat_id': chatData.chat_id,
		    'sentMsg': sentMsg
        };
	
	console.log(IndvData);
	
	var xmlhttp = new XMLHttpRequest();
	var response = null;
	
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			console.log(xmlhttp.responseText);
			var json_str = xmlhttp.responseText;
			console.log("sendIndvMessage: " + json_str);
			
			//set the send area to empty
			$("textarea#searchtext").val("");
			getIndvMessages(receiverEmail +","+receiverName);
		}
	};

	xmlhttp.open("GET","../../../../php/Chat_test_php.php?" + SEND_INDV_MSG + "=" + JSON.stringify(IndvData), true);
	xmlhttp.send();
}

function sendGroupMsg(group_id,group_name,sentMsg)
{
	var chatData = JSON.parse(sessionStorage.getItem('ChatData'));
	var GroupData = {
		'senderEmail': user_email,
		'group_id' : group_id,
		'chat_id' :chatData.chat_id,
		'sentMsg': sentMsg
	};
	
	var xmlhttp = new XMLHttpRequest();
	var response = null;
	
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			console.log(xmlhttp.responseText);
			var json_str = xmlhttp.responseText;
			console.log("sendGroupMsg: " + json_str);
			
			//set the send area to empty
			$("textarea#searchtext").val("");
			getGrpMessages(group_id+","+group_name);
		}
	};

	xmlhttp.open("GET","../../../../php/Chat_test_php.php?" + SEND_GROUP_MSG + "=" + JSON.stringify(GroupData), true);
	xmlhttp.send();
}

function extractJSONObject (string) { // TODO make return the message too
    var curly = string.indexOf('{');
    var bracket = string.indexOf('[');

    if (curly < 0 && bracket < 0) {
        return "no json in string";
    }
    if (curly < bracket || bracket < 0) {
        return string.substring(curly);
    }
    else if (bracket < curly || curly < 0) {
        return string.substring(bracket);
    }
}