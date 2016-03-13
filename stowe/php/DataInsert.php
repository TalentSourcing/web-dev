<?php

require 'init_database.php';
$conn = TalentMeDB::getConnection();

InsertUserData();

InsertGroupData();

UserGroupData();

InsertChatTable();


//insert data into user table
function InsertUserData()
{
	global $conn;
	
	$sql1 = "INSERT INTO USERTABLE (user_email,first_name,last_name,password,linkedin_url,skills,occupation,gender,profile_img,objective) VALUES('bhargavi@gmail.com','Bhargavi','Ketha','pwd2','','JAVA,C,HTML,CSS','Software Engineer','female','Chat_Images/Bhargavi.jpg','Frontend Development')";
	
	$sql2 = "INSERT INTO USERTABLE (user_email,first_name,last_name,password,linkedin_url,skills,occupation,gender,profile_img,objective) VALUES('naina@gmail.com','Naina','Raut','pwd1','https://www.linkedin.com/in/nainaraut','JAVA,C++,C,HTML,CSS','Software Engineer','female','Chat_Images/Bhargavi.jpg','Backend Development')";
	
	$sql3 = "INSERT INTO USERTABLE (user_email,first_name,last_name,password,linkedin_url,skills,occupation,gender,profile_img,objective) VALUES('david@gmail.com','David','Lindskog','pwd3','','JAVA,C,HTML,CSS','Software Engineer','male','Chat_Images/david.jpg','Frontend Development')";
	
	$sql4 = "INSERT INTO USERTABLE (user_email,first_name,last_name,password,linkedin_url,skills,occupation,gender,profile_img,objective) VALUES('Chuan@gmail.com','Chuan','Xu','pwd4','','JAVA,Android,HTML,CSS','Software Engineer','male','Chat_Images/chuan.jpg','Backend Development')";
	
	$sql5 = "INSERT INTO USERTABLE (user_email,first_name,last_name,password,linkedin_url,skills,occupation,gender,profile_img,objective) VALUES('misha@gmail.com','Misha','Yalavarthy','pwd5','','JAVA,C,HTML,CSS','Software Engineer','female','Chat_Images/misha.jpg','Frontend Development')";
	
	$sql6 = "INSERT INTO USERTABLE (user_email,first_name,last_name,password,linkedin_url,skills,occupation,gender,profile_img,objective) VALUES('kriti@gmail.com','Kriti','Tiwari','pwd6','','JAVA,C,HTML,CSS','Software Engineer','female','Chat_Images/people1.jpg','Frontend Development')";
	
	$result1 = $conn->query($sql1);
	$result2= $conn->query($sql2);
	$result3 = $conn->query($sql3);
	$result4 = $conn->query($sql4);
	$result5 = $conn->query($sql5);
	$result6 = $conn->query($sql6);
	
	echo "Data inserted in user table";
	
}

//insert in Group Table
function InsertGroupData()
{
	global $conn;
	
	$sql1 = "INSERT INTO GroupTable (group_id,group_name,group_img,about,desired_skills) 	 VALUES(NULL,'SmartMoves','Chat_Images/create1.jpg','Global Network Organization','C,C++')"; 
	
	$sql2 = "INSERT INTO GroupTable (group_id,group_name,group_img,about,desired_skills) VALUES(NULL,'MegaWorkers','Chat_Images/create2.jpg','Virtualization','Java,C++')"; 
	
	$sql3 = "INSERT INTO GroupTable (group_id,group_name,group_img,about,desired_skills) VALUES(NULL,'Hutch','Chat_Images/groupIn1.jpg','Connecting Ideas','Android')";
	
	$sql4 = "INSERT INTO GroupTable (group_id,group_name,group_img,about,desired_skills) VALUES(NULL,'Cracking Coders','Chat_Images/groupIn2.jpg','Security Solutions','C,Java,C++')"; 
	
	$sql5 = "INSERT INTO GroupTable (group_id,group_name,group_img,about,desired_skills) VALUES(NULL,'ViewPoint','Chat_Images/groupApplied1.jpg','Data Protection','C,Python')"; 
	
	$result1 = $conn->query($sql1);
	$result2= $conn->query($sql2);
	$result3 = $conn->query($sql3);
	$result4 = $conn->query($sql4);
	$result5 = $conn->query($sql5);
	
	echo "Data inserted in group table";
}

//insert UserGroup Table
function UserGroupData()
{
	global $conn;
	
	$sql1 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'naina@gmail.com',1,'founder')";
	
	$sql2 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'bhargavi@gmail.com',1,'member')";
	
	$sql3 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'david@gmail.com',1,'member')";
	
	$sql4 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'Chuan@gmail.com',1,'member')";
	
	$sql5 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'misha@gmail.com',1,'member')";
	
	
	
	$sql6 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'naina@gmail.com',2,'member')";
	
	$sql7 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'bhargavi@gmail.com',2,'member')";
	
	$sql8 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'david@gmail.com',2,'founder')";
	
	$sql9 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'Chuan@gmail.com',2,'invited')";
	
	$sql10 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'misha@gmail.com',2,'member')";
	
	
	
	$sql11 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'naina@gmail.com',3,'applied')";
	
	$sql12 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'bhargavi@gmail.com',3,'member')";
	
	$sql13 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'david@gmail.com',3,'founder')";
	
	$sql14 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'Chuan@gmail.com',3,'invited')";
	
	$sql15 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'misha@gmail.com',3,'member')";
	
	
	$sql16 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'naina@gmail.com',4,'invited')";
	
	$sql17 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'bhargavi@gmail.com',4,'member')";
	
	$sql18 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'david@gmail.com',4,'founder')";
	
	$sql19 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'Chuan@gmail.com',4,'invited')";
	
	$sql20 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'misha@gmail.com',4,'member')";
	
	
	$result1 = $conn->query($sql1);
	$result2= $conn->query($sql2);
	$result3 = $conn->query($sql3);
	$result4 = $conn->query($sql4);
	$result5 = $conn->query($sql5);
	$result6 = $conn->query($sql6);
	$result7 = $conn->query($sql7);
	$result8= $conn->query($sql8);
	$result9 = $conn->query($sql9);
	$result10 = $conn->query($sql10);
	$result11 = $conn->query($sql11);
	$result12 = $conn->query($sql12);
	$result13 = $conn->query($sql13);
	$result14= $conn->query($sql14);
	$result15 = $conn->query($sql15);
	$result16 = $conn->query($sql16);
	$result17 = $conn->query($sql17);
	$result18 = $conn->query($sql18);
	$result19 = $conn->query($sql19);
	$result20 = $conn->query($sql20);
	
	echo "Data inserted in usergroup table";
}

//insert in ChatLineTable
function InsertChatTable()
{
	global $conn;
	
	$sql1 = "INSERT INTO UserGroupTable (id,chat_id,user_email,text_line,time_stamp,group_id) 	VALUES(NULL,1,'naina@gmail.com','Hi','',NULL)";
	$sql2 = "INSERT INTO UserGroupTable (id,chat_id,user_email,text_line,time_stamp,group_id) 	VALUES(NULL,1,'bhargavi@gmail.com','Hello','',NULL)";
	$sql3 = "INSERT INTO UserGroupTable (id,chat_id,user_email,text_line,time_stamp,group_id) 	VALUES(NULL,1,'naina@gmail.com','Hi','',NULL)";
	$sql4 = "INSERT INTO UserGroupTable (id,chat_id,user_email,text_line,time_stamp,group_id) 	VALUES(NULL,1,'bhargavi@gmail.com','How are you?','',NULL)";
	$sql5 = "INSERT INTO UserGroupTable (id,chat_id,user_email,text_line,time_stamp,group_id) 	VALUES(NULL,1,'naina@gmail.com','fine','',NULL)";
	
	$sql6 = "INSERT INTO UserGroupTable (id,chat_id,user_email,text_line,time_stamp,group_id) 	VALUES(NULL,2,'naina@gmail.com','Meet today','',NULL)";
	$sql7 = "INSERT INTO UserGroupTable (id,chat_id,user_email,text_line,time_stamp,group_id) 	VALUES(NULL,2,'david@gmail.com','Sure','',NULL)";
	$sql8 = "INSERT INTO UserGroupTable (id,chat_id,user_email,text_line,time_stamp,group_id) 	VALUES(NULL,2,'naina@gmail.com','May be','',NULL)";
	$sql8 = "INSERT INTO UserGroupTable (id,chat_id,user_email,text_line,time_stamp,group_id) 	VALUES(NULL,2,'david@gmail.com','ya nice','',NULL)";
	
	$sql9 = "INSERT INTO UserGroupTable (id,chat_id,user_email,text_line,time_stamp,group_id) 	VALUES(NULL,3,'naina@gmail.com','well done','',NULL)";
	$sql10 = "INSERT INTO UserGroupTable (id,chat_id,user_email,text_line,time_stamp,group_id) 	VALUES(NULL,3,'Chuan@gmail.com','Ya nice','',NULL)";
	$sql11 = "INSERT INTO UserGroupTable (id,chat_id,user_email,text_line,time_stamp,group_id) 	VALUES(NULL,3,'naina@gmail.com','so good na','',NULL)";
	$sql12 = "INSERT INTO UserGroupTable (id,chat_id,user_email,text_line,time_stamp,group_id) 	VALUES(NULL,3,'Chuan@gmail.com','definetly will come','',NULL)";
	
	$sql13 = "INSERT INTO UserGroupTable (id,chat_id,user_email,text_line,time_stamp,group_id) 	VALUES(NULL,4,'naina@gmail.com','are you there?','',NULL)";
	$sql14 = "INSERT INTO UserGroupTable (id,chat_id,user_email,text_line,time_stamp,group_id) 	VALUES(NULL,4,'misha@gmail.com','Yes I am','',NULL)";
	$sql15 = "INSERT INTO UserGroupTable (id,chat_id,user_email,text_line,time_stamp,group_id) 	VALUES(NULL,4,'misha@gmail.com','Can we meet','',NULL)";
	$sql16 = "INSERT INTO UserGroupTable (id,chat_id,user_email,text_line,time_stamp,group_id) 	VALUES(NULL,4,'misha@gmail.com','Ya sure','',NULL)";
	
	$sql17 = "INSERT INTO UserGroupTable (id,chat_id,user_email,text_line,time_stamp,group_id) 	VALUES(NULL,5,'david@gmail.com','Hi all','',1)";
	$sql18 = "INSERT INTO UserGroupTable (id,chat_id,user_email,text_line,time_stamp,group_id) 	VALUES(NULL,5,'naina@gmail.com','Hello','',1)";
	$sql19 = "INSERT INTO UserGroupTable (id,chat_id,user_email,text_line,time_stamp,group_id) 	VALUES(NULL,5,'Chuan@gmail.com','M e too here','',1)";
	$sql20 = "INSERT INTO UserGroupTable (id,chat_id,user_email,text_line,time_stamp,group_id) 	VALUES(NULL,5,'misha@gmail.com','fine then','',1)";
	
	$sql21 = "INSERT INTO UserGroupTable (id,chat_id,user_email,text_line,time_stamp,group_id) 	VALUES(NULL,6,'Chuan@gmail.com','Can we meet','',2)";
	$sql22 = "INSERT INTO UserGroupTable (id,chat_id,user_email,text_line,time_stamp,group_id) 	VALUES(NULL,6,'naina@gmail.com','today?','',2)";
	$sql23 = "INSERT INTO UserGroupTable (id,chat_id,user_email,text_line,time_stamp,group_id) 	VALUES(NULL,6,'bhargavi@gmail.com','if possible','',2)";
	$sql24 = "INSERT INTO UserGroupTable (id,chat_id,user_email,text_line,time_stamp,group_id) 	VALUES(NULL,6,'Chuan@gmail.com','ya sure','',2)";
	
	$sql25 = "INSERT INTO UserGroupTable (id,chat_id,user_email,text_line,time_stamp,group_id) 	VALUES(NULL,7,'david@gmail.com','hello all','',3)";
	$sql26 = "INSERT INTO UserGroupTable (id,chat_id,user_email,text_line,time_stamp,group_id) 	VALUES(NULL,7,'Chuan@gmail.com','Hi everyone','',3)";
	$sql27 = "INSERT INTO UserGroupTable (id,chat_id,user_email,text_line,time_stamp,group_id) 	VALUES(NULL,7,'misha@gmail.com','how are you','',3)";
	$sql28 = "INSERT INTO UserGroupTable (id,chat_id,user_email,text_line,time_stamp,group_id) 	VALUES(NULL,7,'naina@gmail.com','fine','',3)";
	
	$sql29 = "INSERT INTO UserGroupTable (id,chat_id,user_email,text_line,time_stamp,group_id) 	VALUES(NULL,8,'naina@gmail.com','finally done','',4)";
	$sql30 = "INSERT INTO UserGroupTable (id,chat_id,user_email,text_line,time_stamp,group_id) 	VALUES(NULL,8,'david@gmail.com','Ya right','',4)";
	$sql31 = "INSERT INTO UserGroupTable (id,chat_id,user_email,text_line,time_stamp,group_id) 	VALUES(NULL,8,'bhargavi@gmail.com','come relax here','',4)";
	$sql32 = "INSERT INTO UserGroupTable (id,chat_id,user_email,text_line,time_stamp,group_id) 	VALUES(NULL,8,'Chuan@gmail.com','party time','',4)";
	
	$result1 = $conn->query($sql1);
	$result2= $conn->query($sql2);
	$result3 = $conn->query($sql3);
	$result4 = $conn->query($sql4);
	$result5 = $conn->query($sql5);
	$result6 = $conn->query($sql6);
	$result7 = $conn->query($sql7);
	$result8 = $conn->query($sql8);
	$result9 = $conn->query($sql9);
	$result10 = $conn->query($sql10);
	$result11 = $conn->query($sql11);
	$result12 = $conn->query($sql12);
	$result13 = $conn->query($sql13);
	$result14 = $conn->query($sql14);
	$result15 = $conn->query($sql15);
	$result16 = $conn->query($sql16);
	$result17 = $conn->query($sql17);
	$result18 = $conn->query($sql18);
	$result19 = $conn->query($sql19);
	$result20 = $conn->query($sql20);
	$result21 = $conn->query($sql21);
	$result22 = $conn->query($sql22);
	$result23 = $conn->query($sql23);
	$result24 = $conn->query($sql24);
	$result25 = $conn->query($sql25);
	$result26 = $conn->query($sql26);
	$result27 = $conn->query($sql27);
	$result28 = $conn->query($sql28);
	$result29 = $conn->query($sql29);
	$result30 = $conn->query($sql30);
	
	echo "Data inserted in chatlinetable table";
	
}
?>