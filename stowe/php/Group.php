<?php
/**

 */

require 'init_database.php';

class Group
{
    private $conn = null;

    public function Group () {
        $this->conn = TalentMeDB::getConnection();
    }

    function createGroup ($group_id, $group_name, $about, $desired_skills, $group_img)
    {
        $sql = "INSERT INTO GroupTable ".
            "(group_id, group_name, group_img , about, desired_skills) ".
            "VALUES ('$group_id', '$group_name', '$group_img', '$about', '$desired_skills') ";


            if ($this->conn->query($sql)) {
                echo "Success!";
            }

        else {

            echo "Not able to create group!";
        }


}

 function updateGroup($group_name, $about, $desired_skills, $group_img, $group_id)
{

    $sql = "UPDATE GroupTable SET".
        "group_name='$group_name',".
        "about='$about',".
        "desired_skills='$desired_skills',".
        "group_img='$group_img',".
        "WHERE group_id='$group_id'";
    if ($this->conn->query($sql)) {
        echo "Successfully Updated the Group!";
    }

    else {

        echo "Update unsuccessful!!";
    }

}


    public function deleteGroup ($group_id)
    {
        $sql = "DELETE FROM GroupTable ".
            " (group_name, about, desired_skills, group_img) ".
            "WHERE (group_id)=('$group_id') ";


            if ($this->conn->query($sql))
            {
                echo "Success!";
            }

        else {
            echo "Not able to delete the group!";

        }

    }
    public function inviteUser ($user_email,$group_id)

    {

        $applied="Applied";
        $sql = "INSERT INTO UserGroupTable ".
            " (user_email, group_id, user_role ) ".
            "VALUES ('$user_email', '$group_id', $applied) ";

        try {
            if ($this->conn->query($sql)) {
                echo "Success!";
            }
        } catch (Exception $e) {
            echo $e . "<br>";
        }
        echo "after if/else";
    }
    public function approveUser ($user_email,$group_id)

    {

        $member="Member";
        $sql = "UPDATE UserGroupTable SET  ".
            "user_role='$member'".
            "WHERE (user_email)=('$user_email') ".
            "group_id='$group_id'";

        try {
            if ($this->conn->query($sql)) {
                echo "Success!";
            }
        } catch (Exception $e) {
            echo $e . "<br>";
        }
        echo "failure";
    }
    public function declineUserApplication ($user_email,$group_id)
    {
        $sql = "DELETE FROM UserGroupTable ".
            " (user_group_id,user_email,group_id,user_role) ".
            "WHERE (user_email)=('$user_email') ".
            "group_id='$group_id'";

        try {
            if ($this->conn->query($sql)) {
                echo "Success!";
            }
        } catch (Exception $e) {
            echo $e . "<br>";
        }
        echo "after if/else";
    }
}

$group = new Group();
#$group->createGroup("G1", "CS Group", "Computer Science","C and Java", "thtea");
#$group->updateGroup("Computer Science Group","Student","Perl PHP","pic.jpg","1");
$group->deleteGroup("1");

