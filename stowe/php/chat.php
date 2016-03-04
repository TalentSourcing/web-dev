<!--
Author:Naina Raut
Date Modified:3/3/2014
Specification: Chat application
-->
<html>
	<title></title>
	<head>
	<link rel="stylesheet" href="chatstyle.css">
	<link rel="stylesheet" href="header.css">
	<link rel="stylesheet" href="footer.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
	</head>
	
	<script>
		function adjustScroll(){	
			$(".chat").animate({ scrollTop: $(document).height() }, "fast");
  			return false;
		}
	</script>
	
	<body onload="adjustScroll()">
		
	<?php 
		require 'init_database.php';            //the data connection file
		$conn = TalentMeDB::getConnection();    //get connection object
		$senderEmail = 'naina@gmail.com';       //the sender email
		$senderName = 'Naina Raut';             //the sender name
		
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
						getMessages($_COOKIE['sender'],$_COOKIE['receiver']);
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
=======
<?php
/**
 * Created by PhpStorm.
 * User: mishayalavarthy
 * Date: 3/1/16
 * Time: 10:00 AM
 */

>>>>>>> origin/master

			try{
				//get all the user names from USERTABLE table
				$result = $conn->query($sql);
				if($result){	
		?>
					<ul id="listData">
		<?php
					while($row = $result->fetch_assoc())
					{
					    echo "<li class='names'><a href='getHint.php?receiver={$row['user_email']}&sender={$senderEmail}' class='list' name='display' value='display'> {$row['first_name']}&nbsp;{$row['last_name']}</a></li>";
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
					//$names[$count++] = $row2['group_name'];
					echo "<li class='names'><a href='getHint.php?groupName={$row2['group_name']}&groupId={$row2['group_id']}' class='list'>{$row2['group_name']}</a></li>";
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
		<p id='sender'><?php echo $senderName; ?></p>
		
		<div class="messages">
		<?php
			
			//check if individual is selected
			if(isset($_GET['receiver']) && isset($_GET['sender']))
			{
				setcookie("sender", "", time() - 3600);       //delete cookie
				setcookie("receiver", "", time() - 3600);     //delete cookie

<<<<<<< HEAD
				setcookie('sender', $_GET['sender'], time() + (86400 * 30), "/"); // 86400 = 1 day
				setcookie('receiver', $_GET['receiver'], time() + (86400 * 30), "/"); // 86400 = 1 day
				setcookie('groupId', NULL, time() + (86400 * 30), "/"); // 86400 = 1 day

				getMessages($_GET['sender'],$_GET['receiver']);				
			}
			
			//get the recent messages of individual to display
			function getMessages($idSender,$idReceiver)
			{
				global $conn;
				global $rowData;

				//to get the chat id of the top row
				$sql2 = "SELECT * FROM CHATLINETABLE LIMIT 1";

				//to get all messages for the sender and receiver having same chat id
				$sql = "SELECT * FROM CHATLINETABLE as t1 where ( user_email='$idSender' OR user_email='$idReceiver' ) AND group_id IS NULL".    " AND (SELECT COUNT(*) FROM CHATLINETABLE as t2 where t1.chat_id = t2.chat_id) > 1";
=======
class Chat {
    private $conn = null;

    public function Chat () {
        $this->conn = TalentMeDB::getConnection();
    }

    //the database connection is working, but insert is NOT
    function createGroupChat ($creator_user_email, $group_id) {
        $sql = "INSERT INTO ChatLineTable ".
            "(id, chat_id, user_email, text_line, time_stamp, group_id) ".
            "VALUES ('', '', '$creator_user_email','','', '')";

        if ($this->conn->query($sql)) {
            echo "Insert success!<br>";
        }
        else {
            echo "Error Message: $this->conn->error <br>";
        }
    }
}

$dbi = new Chat();
$dbi->createGroupChat("", "", "misha.yalavarthy@gmail.com", "", "", "");
>>>>>>> origin/master

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

<<<<<<< HEAD
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
										<p><?php echo $rowData['text_line']; ?></p>
								   </div>
								</div>
			<?php
							}
							else
							{
			?>
								<div id='m2'>
									<div id='m2-1'>
										<p><?php echo $rowData['text_line']; ?></p>
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
=======
/*

    //naina - please help on completing this function
    function createIndividualChat ($creator_user_email, $recipient_user_email, $chat_id){
>>>>>>> origin/master

				}
				catch(Exception $e)
				{
					echo 'Exception in getMessage() :'.$e->getMessage();
				}
			}

<<<<<<< HEAD
			//check if group is selected
			if(isset($_GET['groupId']) && isset($_GET['groupName']))
			{
				setcookie("groupId", "", time() - 3600);

				setcookie('groupId', $_GET['groupId'], time() + (86400 * 30), "/"); // 86400 = 1 day
				setcookie('receiver', NULL, time() + (86400 * 30), "/"); // 86400 = 1 day
				getGroupData($_GET['groupId']);
			}
			
			//function to get the group messages
			function getGroupData($groupId)
			{
				   global $conn;

					//to get the chat id of the top row
				   $sql2 = "SELECT * FROM CHATLINETABLE LIMIT 1";

				   $sql = "SELECT * FROM CHATLINETABLE as t1 WHERE group_id = $groupId AND ".
						  "(SELECT COUNT(*) FROM CHATLINETABLE as t2 where t1.chat_id = t2.chat_id) > 1";
				   try
				   {
					   $result = $conn->query($sql);
					   if($result)
					   {
						   while($row = $result->fetch_assoc())
						   {
			?>
							<div id='m1'>
								<div id='m1-1'>
									<p><?php echo $row['text_line']; ?></p>
								</div>
							</div>
			<?php
						   }
					   }
					   else
					   {
						   echo "Error while selecting group data from chat table";
					   }

					   //execute the query for chat id selection
						$result2 = $conn->query($sql2);
						if($result2)
						{
							$row = $result2->fetch_assoc();
							$globalChatId = $row['chat_id'] + 1;
							setcookie('globalChatId', $globalChatId, time() + (86400 * 30), "/"); // 86400 = 1 day

						}
						else
						{
							$globalChatId = 1;
							setcookie('globalChatId', $globalChatId, time() + (86400 * 30), "/"); // 86400 = 1 day
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
				else if(isset($_COOKIE['sender']) && isset($_COOKIE['receiver']))
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
=======
        //do we need to pass in a null value for ID, since it is integer autoincremented.
        try{

            $sql = "INSERT INTO ChatLineTable ".
            "(id, chat_id, user_email, text_line, time_stamp, group_id)" .
            "VALUES ('', $chat_id, $creator_user_email','','','')";

            $sql = "INSERT INTO ChatLineTable ".
            "(id, chat_id, user_email, text_line, time_stamp, group_id)" .
            "VALUES ('', $chat_id, $recipient_user_email','','','')";

            echo "Success.";
        }

        catch(Exception $e){
            echo "Error Message" $e->getMessage();
        }
    }


    function send ($chat_id, $user_email, $text_line){

        $time_stamp = date(h.i.sa.d.m.y);

        try{

            $sql = "INSERT INTO ChatLineTable ".
            "(id, chat_id, user_email, text_line, time_stamp, group_id) " .
            "VALUES ('','$chat_id', '$user_email, '$text_line','$time_stamp','')";

            echo "Success.";
        }

        catch(Exception $e){
            echo "Error Message" $e->getMessage();
        }

    }


    //returns list of chatId’s affiliated with user
    function getChatList ($user_email){

        try{
            $sql = "SELECT user_name, chat_id" .
            "FROM ChatLineTable";

            echo "Success.";
        }
        catch(Exception $e){
            echo "Error Message" $e->getMessage();
        }
    }


    //query for chatId, return list of chat lines
    function getChat ($chat_id){

        try{
            $sql = "SELECT chat_id, text_line" .
                "FROM ChatLineTable";

            echo "Success.";
        }
        catch(Exception $e){
            echo "Error Message" $e->getMessage();
        }
    }
}

$dbi = new Chat();
$dbi->createGroupChat("", "", "misha.yalavarthy@gmail.com", "", "", "2");
//$dbi->createIndividualChat("","1","misha.yalavarthy@gmail.com","", "", "");
//$dbi->createIndividualChat("","1","recipient.email@gmail.com","", "", "");
//$dbi->send("","2","misha.yalavarthy@gmail.com", "Hello, do you want to work today?","6.30.55pm.3.1.2016,"");
//$dbi->getChatList("", "", "misha.yalavarthy@gmail.com,"","","");
//$dbi->getChat("", "3", "", "", "", "");


?>
>>>>>>> origin/master
