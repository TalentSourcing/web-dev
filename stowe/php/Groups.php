<?php
/**

 */

require 'init_database.php';

class DatabaseInterface {
    private $conn = null;

    public function DatabaseInterface () {
        $this->conn = TalentMeDB::getConnection();
    }

    function createGroup ($user_email, $group_name, $about, $desired_skills, $group_img)
    {
        $sql = "INSERT INTO GroupTable ".
            " (user_email, group_name, group_img , about, desired_skills) ".
            "VALUES ('$user_email', '$group_name', '$group_img', '$about', '$desired_skills') ";

        try {
            if ($this->conn->query($sql)) {
                echo "Success!";
            }
        } catch (Exception $e) {
            echo $e . "<br>";
        }
        echo "after if/else";
    }
    //this function updates the group details in GroupTable
    function update ($group_id,$group_name, $about, $desired_skills, $group_img)
    {
        $sql = "UPDATE GroupTable SET  ".
            "group_name='$group_name',".
            "about='$about',".
            "desired_skills='$desired_skills',".
            "group_img='$group_img',".
            "WHERE (group_id)=('$group_id') ";

        try {
            if ($this->conn->query($sql)) {
                echo "Success!";
            }
        } catch (Exception $e) {
            echo $e . "<br>";
        }
        echo "after if/else";
    }

    function delete ($group_id)
    {
        $sql = "DELETE FROM GroupTable ".
            " (group_name, about, desired_skills, group_img) ".
            "WHERE (group_id)=('$group_id') ";

        try {
            if ($this->conn->query($sql)) {
                echo "Success!";
            }
        } catch (Exception $e) {
            echo $e . "<br>";
        }
        echo "after if/else";
    }
    function inviteUser ($user_email,$group_id)

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
    function approveUser ($user_email,$group_id)

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
        echo "after if/else";
    }
    function declineUserApplication ($user_email,$group_id)
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

$dbi = new DatabaseInterface();
$dbi->createGroup("Bhargavi.k6@gmail.com", "CS Group", "Computer Science","C and Java", "");

