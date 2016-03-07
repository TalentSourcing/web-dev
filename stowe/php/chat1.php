<!--
Author:Naina Raut
Date Modified:3/3/2014
Specification: Chat application
-->
<html>
	<title></title>
	<head>
	<link rel="stylesheet" href="../css/home/dashboard/chat/chatstyle.css">
	<link rel="stylesheet" href="../css/header.css">
	<link rel="stylesheet" href="../css/footer.css">
	<script src="../../../js/jquery-1.12.0.min.js"></script>	
	</head>
	
	<script>
		function adjustScroll(){	
			$(".chat").animate({ scrollTop: $(document).height() }, "fast");
			setInterval(callRepeat(),2000);
  			return false;
		}
		
		function callRepeat(){
		$.ajax({
               type: "GET",
                url: "getHint.php",
                success: function(response){
                console.log("In function");
                }
			});
	</script>
	
	<body onload="adjustScroll()">
		
	<?php 
		require 'init_database.php';            //the data connection file
		$conn = TalentMeDB::getConnection();    //get connection object
		
		if(isset($_GET['sender_data']))
		{
			$result = json_decode($_GET['sender_data']);   
			$senderEmail = $result->user_email;            //the sender email
			$senderGroupId = $result->group_id;            //the sender group Id
			$senderName = 'Naina Raut';             	   //the sender name
		}
		
		//send the current message to DB
		function sendMessage($sentMsg,$senderChatId,$senderEmail,$groupId)
		{
			global $conn;
			
			//get the current timestamp
			$timeStamp = date("Y-m-d H:i:s");
				
			if($groupId){
				//insert the sent msg to DB
				$sql = "INSERT INTO CHATLINETABLE".
					   "(id, chat_id, user_email, text_line, time_stamp, group_id)".
					   "VALUES (NULL, $senderChatId, '$senderEmail', '$sentMsg', '$timeStamp', $groupId)";
			}
			else{
				//insert the sent msg to DB
				$sql = "INSERT INTO CHATLINETABLE".
					   "(id, chat_id, user_email, text_line, time_stamp, group_id)".
					   "VALUES (NULL, $senderChatId, '$senderEmail', '$sentMsg', '$timeStamp',NULL)";
			}
			try
			{
				$result = $conn->query($sql);
				if($result){
					if(isset($_COOKIE['groupId'])){
						getGroupData($_COOKIE['groupId']);
					}
					else if(isset($_COOKIE['sender']) && isset($_COOKIE['receiver'])){
						getMessages($_COOKIE['sender'],$_COOKIE['receiver'],$_COOKIE['recName']);
					}
				}
				else{
					echo "Error while inserting data to chat table";
				}
			}
			catch(Exception $e){
				echo 'Exception in sendMessage() :'.$e->getMessage();
			}
		}
		?>
		
<!--		Header section-->
		<header id="header_content">
			<div id="header_logo_container">
				<img id="logo_image" src="logo.jpg" alt="Logo">
			</div>
			<div id="header_bar">
				<p><a href="#">TalentMe</a></p>
			</div>
		</header>
		
		
		<br><br>
		<div id="body">
			
<!--			search section-->
			<div id="topsearch">
				<input id="topsearchtext"type="search" name="googlesearch" placeholder="Search chat...">
				<input id="search" type="submit" value="Search">
			</div>
		<br>
		
			
<!--		the chat list section	-->
		<div class="openedchats">
        	<p id="chattitle">Opened Chats</p>
		
			
<!--		php section starts-->
		<?php 
			
			global $conn;
			global $senderEmail;
			$names = [];
			$count = 0;	
			$sql = "SELECT * FROM USERTABLE WHERE user_email <> '$senderEmail'";
			$sql2 = "SELECT * FROM GROUPTABLE";

			try{
				//get all the user names from USERTABLE table
				$result = $conn->query($sql);
				if($result){	
		?>
					<ul id="listData">
		<?php
					while($row = $result->fetch_assoc())
					{
						$fullName = $row['first_name']." ".$row['last_name'];
					    echo "<li class='names' onclick='location.href=\"getHint.php?receiver={$row['user_email']}&sender={$senderEmail}&recName=$fullName\"'>
							<div id='listPic'><img src='{$row['profile_img']}' width='20%' height='10%'></div>
							<div id='listName'>$fullName</div>
							</li>";
					}
				}
				else{
					echo "Error while selecting data from user table";
				}
		?>
					<li id="groupTitle">Groups</li>		
		<?php		
			//get all group names from GROUP table
			$result2 = $conn->query($sql2);
			if($result2)
			{
				while($row2 = $result2->fetch_assoc())
				{
					echo "<li class='names' onclick='location.href=\"getHint.php?groupName={$row2['group_name']}&groupId={$row2['group_id']}\"'><div id='listPic'><img src='{$row2['group_img']}' width='20%' height='10%'></div>
					<div id='listName'>{$row2['group_name']}</div></li>";
				}
		?>
			</ul>
			
		<?php
			}
			else{
				echo "Error while selecting data from group table";
			}	
		}
		catch(Exception $e){
			echo 'Exception in getMessage() :'.$e->getMessage();
		}
		?>
	</div>
   
			
<!--	the message section		-->
	<div class="chat">
		
<!--		the sender name displayed-->
		<div class='senderName'>
		<p id='sender'><?php echo $senderName; ?></p>
		</div>	
		
		<div class="messages">
		<?php
			
			//check if individual is selected
			if(isset($_GET['receiver']) && isset($_GET['sender']) && isset($_GET['recName']))
			{
				setcookie("sender", "", time() - 3600);       //delete cookie
				setcookie("receiver", "", time() - 3600);     //delete cookie
				setcookie("recName", "", time() - 3600);     //delete cookie
				

				setcookie('sender', $_GET['sender'], time() + (86400 * 30), "/"); // 86400 = 1 day
				setcookie('receiver', $_GET['receiver'], time() + (86400 * 30), "/"); // 86400 = 1 day
				setcookie('recName', $_GET['recName'], time() + (86400 * 30), "/"); // 86400 = 1 day
				setcookie('groupId', NULL, time() + (86400 * 30), "/"); // 86400 = 1 day

				getMessages($_GET['sender'],$_GET['receiver'],$_GET['recName']);				
			}
			
			//get the recent messages of individual to display
			function getMessages($idSender,$idReceiver,$recName)
			{
				global $conn;
				global $rowData;
				global $senderName;

				//to get the chat id of the top row
				$sql2 = "SELECT * FROM CHATLINETABLE LIMIT 1";

				//to get all messages for the sender and receiver having same chat id
				$sql = "SELECT * FROM CHATLINETABLE as t1 where ( user_email='$idSender' OR user_email='$idReceiver' ) AND group_id IS NULL".    " AND (SELECT COUNT(*) FROM CHATLINETABLE as t2 where t1.chat_id = t2.chat_id) > 1";

				try
				{
					//execute the query for chat id selection
					$result2 = $conn->query($sql2);
					if($result2)
					{
						$row = $result2->fetch_assoc();
						$globalChatId = $row['chat_id'];
						setcookie('globalChatId', $globalChatId, time() + (86400 * 30), "/"); // 86400 = 1 day

					}
					else
					{
						$globalChatId = 1;
						setcookie('globalChatId', $globalChatId, time() + (86400 * 30), "/"); // 86400 = 1 day
					}

					//get all the data from the table
					$result = $conn->query($sql);

					//get individual row data
					if($result)
					{
						while($rowData = $result->fetch_assoc())
						{
							if($rowData['user_email'] == $idReceiver)
							{
			?>
								<div id='m1'>
								   <div id='m1-1'>
									   <p><?php echo "<b>$recName: </b>{$rowData['text_line']}"; ?></p>
								   </div>
								</div>
			<?php
							}
							else
							{
			?>
								<div id='m2'>
									<div id='m2-1'>
										<p><?php echo "{$rowData['text_line']}<b> :$senderName</b>"; ?></p>
									</div>
								</div>
			<?php
							}
						}
					}
					else
					{
						echo "error while selecting data from Chatlinetable";
					}

				}
				catch(Exception $e)
				{
					echo 'Exception in getMessage() :'.$e->getMessage();
				}
			}

			//check if group is selected
			if(isset($_GET['groupId']) && isset($_GET['groupName']))
			{
				//delete the previous group Id
				setcookie("groupId", "", time() - 3600);
				
				//set the latest group Id
				setcookie('groupId', $_GET['groupId'], time() + (86400 * 30), "/"); 
				
				//set the previous receiver email and receiver name to null
				setcookie('receiver', NULL, time() + (86400 * 30), "/"); 
				setcookie('recName', NULL, time() + (86400 * 30), "/"); 
				
				//get the group Data using group Id
				getGroupData($_GET['groupId']);
			}
			
			//function to get the group messages
			function getGroupData($groupId)
			{
				   global $conn;

					//to get the chat id of the top row
				   $sql2 = "SELECT * FROM CHATLINETABLE LIMIT 1";
					
					//get all the group chats specific to group id
				   $sql = "SELECT * FROM CHATLINETABLE as t1 WHERE group_id = $groupId AND ".
						  "(SELECT COUNT(*) FROM CHATLINETABLE as t2 where t1.chat_id = t2.chat_id) > 1";
					
					//get all the user names and user emails in the same group
				   $sql3 = "select first_name,last_name,t1.user_email ".
					   	   "from usertable as t1 inner join usergrouptable as t2 ".
					       "on t1.user_email = t2.user_email ".
					       "where group_id = $groupId";
				   try
				   {
					    //execute the query for chat id selection
						$result2 = $conn->query($sql2);
						if($result2)
						{
							$row2 = $result2->fetch_assoc();
							$globalChatId = $row2['chat_id'] + 1;
							
							//set the new group Id
							setcookie('globalChatId', $globalChatId, time() + (86400 * 30), "/"); 

						}
						else
						{
							$globalChatId = 1;
							//set initial group Id as 1
							setcookie('globalChatId', $globalChatId, time() + (86400 * 30), "/"); 
						}
					   
					   $result = $conn->query($sql);
					   $result3 = $conn->query($sql3);
					   $userData = array();
					   
					   if($result3)
						{
						   while($row3 = $result3->fetch_assoc())
							{
							   $userData[$row3['user_email']] = $row3['first_name']." ".$row3['last_name'];
						   	}
						}
						else
						{
							echo "Error while selecting group and user data";
						}
					   
					   if($result)
					   {   
							while($row = $result->fetch_assoc())
							{
				?>
								<div id='m1'>
									<div id='m1-1'>
										<p><?php echo "<b>{$userData[$row['user_email']]}: </b>{$row['text_line']}"; ?></p>
									</div>
								</div>
				<?php
							}  
					   }
					   else
					   {
						   echo "Error while selecting group data from chat table";
					   }
				   }
				   catch(Exception $e)
				   {
					   echo 'Exception in getMessage() :'.$e->getMessage();
				   }
			 }
			
			 //check if send button is pressed
			 if(isset($_GET['send']) && isset($_GET['msg']))
			 {
				 //check whether its a group message
				if(isset($_COOKIE['groupId']))
				{
					$id = $_COOKIE['groupId'];
					sendMessage($_GET['msg'],$_COOKIE['globalChatId'],$_COOKIE['sender'],$id);
				}
				 //check whether its an individual message
				else if(isset($_COOKIE['sender']) && isset($_COOKIE['receiver']) && isset($_COOKIE['recName']))
				{
					$id = NULL;
					sendMessage($_GET['msg'],$_COOKIE['globalChatId'],$_COOKIE['sender'],$id);
				}
			 }
		?>
		</div>
	</div>
			
<!--			the send message section-->
		<div id="input">
			<form action="<?=$_SERVER['PHP_SELF'];?>" method="get">
				<textarea id="searchtext" name="msg" placeholder="Type message here..." rows="3" cols="75"></textarea>
				<input type="hidden" name="sender" value="">
            	<input id="search" type="submit" value="Send" name="send">
			</form>
        </div>

<!--			footer section-->
	<div id="footer">
		 <footer>
				<table id="footer_table">
					<tr class="table_row">
						<th class="table_header">TalentMe</th>
						<th class="table_header">Features</th>
						<th class="table_header">Support</th>
						<th class="table_header">Legal</th>
					</tr>
					<tr class="table_row">
						<td class="table_data"><a href="">Home</a></td>
						<td class="table_data"><a href="#">Overview</a></td>
						<td class="table_data"><a href="#">Help</a></td>
						<td class="table_data"><a href="#">Terms</a></td>
					</tr>
					<tr class="table_row">
						<td class="table_data"><a href="#">About</a></td>
						<td class="table_data"><a href="#">TalentMe Mobile</a></td>
						<td class="table_data"><a href="#">Survey</a></td>
						<td class="table_data"><a href="#">Privacy</a></td>
					</tr>
					<tr class="table_row">
						<td class="table_data"><a href="#">Jobs</a></td>
						<td class="table_data"><a href="#">Premium TalentMe</a></td>
						<td class="table_data"><a href="#">Investor Relation</a></td>
						<td class="table_data"></td>
					</tr>
					<tr class="table_row">
						<td class="table_data"><a href="#">Advertise</a></td>
						<td class="table_data"><a href="#">Meet Talent</a></td>
						<td class="table_data"></td>
						<td class="table_data"></td>
					</tr>
				</table>
				<br><br>
				<p id="footer_text">Copyright &copy; 2016 TalentMe.</p>
			</footer>
		</div>	
	</div>
  </body>
</html>