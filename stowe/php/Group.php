<?php
/**

 */

require 'init_database.php';
const GET_GROUP_VIEW = "get_group_view";
const CREATE_GROUP = "create_group";
const DELETE_GROUP = "delete_group";
const UPDATE_GROUP = "update_group";
const DISPLAY_UPDATE_GROUP = "display_update_group";

class Group
{

    private $FOUNDER = "founder";
    private $MEMBER = "member";
    private $INVITED = "invited";
    private $APPLIED = "applied";
    private $conn = null;

    public function Group()
    {
        $this->conn = TalentMeDB::getConnection();
    }

    public function getGroupView($group_id) {
        $sql = "SELECT * FROM GroupTable WHERE group_id='$group_id'";
        if ($result = $this->conn->query($sql)) {
            echo json_encode($result->fetch_assoc());
            return json_encode($result->fetch_assoc());
        }
        else {
            echo json_encode("{'error' : 'getGroupView Failure'}");
        }
    }//working

	
	//naina start
   public function createGroup($group_name, $about, $desired_skills, $group_img)
    {
        $sql = "INSERT INTO GroupTable " .
            "( group_name, group_img , about, desired_skills) " .
            "VALUES ( '$group_name', '$group_img', '$about', '$desired_skills') ";


        if ($this->conn->query($sql)) {
            echo "Success!";
        } else {

            echo "Not able to create group!";
        }


    }//working
	
    public function updateGroup( $group_id, $group_name,$group_img,$about, $desired_skills )
    {
		$id = $group_id->group_id;
		
        $sql = "UPDATE GroupTable SET ".
            "group_name='$group_name', ".
            "group_img='$group_img', ".
            "about='$about', ".
            "desired_skills='$desired_skills' ".
            "WHERE group_id='$id'";


        if ($this->conn->query($sql)) {
            echo "User profile update success!<br>";
			echo "group_name='$group_name', ".
            	"group_img='$group_img', ".
            	"about='$about', ".
            	"desired_skills='$desired_skills' ";
        }
        else {
            echo "User profile update failure!<br>";
        }

    }
	
	//naina
	public function displayUpdateGroup($group_id)
	{
		$sql = "SELECT * FROM GROUPTABLE WHERE GROUP_ID = '$group_id'";
		if ($result = $this->conn->query($sql)) {
            echo json_encode($result->fetch_assoc());
            return json_encode($result->fetch_assoc());
        }
        else {
            echo json_encode("{'error' : 'displayUpdateGroup Failure'}");
        }
	}
//naina end

    public function deleteGroup($group_id)
    {
        $sql = "DELETE FROM GroupTable WHERE group_id='$group_id'";
        if ($this->conn->query($sql)) {
            echo "LeaveGroup success!<br>";
        } else {
            echo "LeaveGroup Failure:";
//            echo "LeaveGroup Failure: $this->conn->error <br>"; // this may not be working for some reason
        }

    }//working



    public function inviteUser($user_email, $group_id)

    {


        $sql = "INSERT INTO UserGroupTable (user_email, group_id, user_role) " .
            "VALUES ('$user_email', $group_id, '$this->APPLIED')";
        if ($this->conn->query($sql)) {
            echo "UserGroupTable insert success!<br>";
        } else {
            echo "UserGroupTable insert Failure:";
        }

    }//working


    public function approveUser($user_email, $group_id)

    {
        $sql = "UPDATE UserGroupTable SET  ".
            "user_role='$this->MEMBER'".
            "WHERE user_email='$user_email' AND group_id='$group_id'";


        if ($this->conn->query($sql)) {
            echo "Success!";
        } else {
            echo "Not able to update";
        }
    }//WORKING




    public function declineUserApplication($user_email, $group_id)
    {
        $sql = "DELETE FROM UserGroupTable WHERE user_email='$user_email' AND group_id='$group_id'" .
            "AND user_role='$this->APPLIED'";
        if ($this->conn->query($sql)) {
            echo "UserGroupTable delete success!<br>";
        } else {
            echo "UserGroupTable delete Failure:";

        }

    }
}
$html_data = null;
//working
$group = new Group();
if (array_key_exists(GET_GROUP_VIEW, $_GET)) {

    $group->getGroupView($_GET[GET_GROUP_VIEW]);
}//working


//start Naina

if (array_key_exists(CREATE_GROUP, $_GET)) {
	
	echo "In create group";
    $html_data = json_decode($_GET[CREATE_GROUP]);
    if ($html_data != null) {
        $group_profile = new Group();
        $group_profile->createGroup(
            $html_data->group_name,
            $html_data->about_info,
            $html_data->skill_list,
            $html_data->group_img);
    }
}

else if (array_key_exists(DISPLAY_UPDATE_GROUP, $_GET)) {
	
	echo "In diaplay update";
    $html_data = json_decode($_GET[DISPLAY_UPDATE_GROUP]);
    if ($html_data != null) {
        $group_profile = new Group();
		$group_profile->displayUpdateGroup($html_data->group_id);
    }
}

else if (array_key_exists(UPDATE_GROUP, $_GET)) {
    $html_data = json_decode($_GET[UPDATE_GROUP]);
    if ($html_data != null) {
        $group_profile = new Group();
        $group_profile->updateGroup(
			$html_data->group_id,
            $html_data->group_name,
			$html_data->group_img,
            $html_data->about_info,
            $html_data->skill_list
            );
    }
}

//end naina

else if (array_key_exists(DELETE_GROUP, $_GET)) {
    $html_data = json_decode($_GET[DELETE_GROUP]);
    if ($html_data != null) {
        $group_profile = new UserProfile();
        $group_profile->deleteGroup($html_data->group_id);
    }
}

#$group->getGroupView(4);
//$group->createGroup( "Group1", "Math","Query", "kasdnv");
//$group->createGroup( "Group2", "Math","Query", "kasdnv");
//$group->createGroup( "Group3", "Math","Query", "kasdnv");
//$group->createGroup( "Group4", "Math","Query", "kasdnv");
//$group->updateGroup(8,"CSEGROUP","Student","PerlPHP","pic");
//$group->deleteGroup(6);
#$group->inviteUser("d.lindskog1@gmail.com", 4);
#$group->approveUser( "d.lindskog1@gmail.com", 4);
#$group->declineUserApplication( "d.lindskog1@gmail.com", 4);
