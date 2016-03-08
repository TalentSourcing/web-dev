<?php

require 'init_database.php';
$conn = TalentMeDB::getConnection();

InsertUserData();

InsertGroupData();

UserGroupData();


//insert data into user table
function InsertUserData()
{
	global $conn;
	
	$sql1 = "INSERT INTO USERTABLE (user_email,first_name,last_name,password,linkedin_url,skills,occupation,gender,profile_img,objective) VALUES('bhargavi@gmail.com','Bhargavi','Ketha','pwd2','','JAVA,C,HTML,CSS','Software Engineer','female','Chat_Images/Bhargavi.jpg','Frontend Development')";
	
	$sql2 = "INSERT INTO USERTABLE (user_email,first_name,last_name,password,linkedin_url,skills,occupation,gender,profile_img,objective) VALUES('naina.raut1911@gmail.com','Naina','Raut','pwd1','https://www.linkedin.com/in/nainaraut','JAVA,C++,C,HTML,CSS','Software Engineer','female','Chat_Images/Bhargavi.jpg','Backend Development')";
	
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
	
	$sql1 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'naina.raut1911@gmail.com',1,'founder')";
	
	$sql2 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'bhargavi@gmail.com',1,'member')";
	
	$sql3 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'david@gmail.com',1,'member')";
	
	$sql4 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'Chuan@gmail.com',1,'member')";
	
	$sql5 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'misha@gmail.com',1,'member')";
	
	
	
	$sql6 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'naina.raut1911@gmail.com',2,'member')";
	
	$sql7 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'bhargavi@gmail.com',2,'member')";
	
	$sql8 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'david@gmail.com',2,'founder')";
	
	$sql9 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'Chuan@gmail.com',2,'invited')";
	
	$sql10 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'misha@gmail.com',2,'member')";
	
	
	
	$sql11 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'naina.raut1911@gmail.com',3,'applied')";
	
	$sql12 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'bhargavi@gmail.com',3,'member')";
	
	$sql13 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'david@gmail.com',3,'founder')";
	
	$sql14 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'Chuan@gmail.com',3,'invited')";
	
	$sql15 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'misha@gmail.com',3,'member')";
	
	
	$sql16 = "INSERT INTO UserGroupTable (user_group_id,user_email,group_id,user_role) VALUES(NULL,'naina.raut1911@gmail.com',4,'invited')";
	
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
	$result7 = $conn->query($sql1);
	$result8= $conn->query($sql2);
	$result9 = $conn->query($sql3);
	$result10 = $conn->query($sql4);
	$result11 = $conn->query($sql5);
	$result12 = $conn->query($sql6);
	$result13 = $conn->query($sql1);
	$result14= $conn->query($sql2);
	$result15 = $conn->query($sql3);
	$result16 = $conn->query($sql4);
	$result17 = $conn->query($sql5);
	$result18 = $conn->query($sql6);
	$result19 = $conn->query($sql5);
	$result20 = $conn->query($sql6);
	
	echo "Data inserted in usergroup table";
}

//insert in ChatLineTable
function InsertChatTable()
{
	
}
?>