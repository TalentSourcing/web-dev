<?php

require 'init_database.php';
//require 'user_profile.php';

class User {
    private $conn = null;

    private $FOUNDER = "founder";
    private $MEMBER = "member";
    private $INVITED = "invited";
    private $APPLIED = "applied";

    public function User () {
        $this->conn = TalentMeDB::getConnection();
    }

    // TODO delete this later --
    public function test() {
        $result = $this->conn->query("SELECT * FROM GroupTable WHERE group_id=1");
        if ($result->num_rows != 0) {
            echo "GroupTable insert failure: group_id already exists in table<br>";
            return null;
        }

        $sql = "INSERT INTO GroupTable (group_name, group_img, about, desired_skills) ".
            "VALUES ('group1', '', '', '')";
        if ($this->conn->query($sql)) {
            echo "GroupTable insert success!<br>";
        }
        else {
            echo "GroupTable insert Failure: $this->conn->error <br>";
        }
    }

    public function applyForGroup($user_email, $group_id) {
        // check for existence of user
        $result = $this->conn->query("SELECT * FROM UserTable WHERE user_email='$user_email'");
        if ($result->num_rows < 1) {
            echo "UserGroupTable insert failure: user with email '$user_email' does not exist in UserTable<br>";
            return null;
        }

        // check for existence of group
        $result = $this->conn->query("SELECT * FROM GroupTable WHERE group_id='$group_id'");
        if ($result->num_rows < 1) {
            echo "UserGroupTable insert failure: Group with id '$group_id' does not exist in GroupTable<br>";
            return null;
        }

        // check for existence of UserGroupTable row already
        $result = $this->conn->query("SELECT * FROM UserGroupTable WHERE user_email='$user_email' AND group_id=$group_id");
        if ($result->num_rows != 0) {
            echo "UserGroupTable insert failure: user_email/group_id row already exists in table<br>";
            return null;
        }

        $sql = "INSERT INTO UserGroupTable (user_email, group_id, user_role) ".
            "VALUES ('$user_email', $group_id, '$this->APPLIED')";
        if ($this->conn->query($sql)) {
            echo "UserGroupTable insert success!<br>";
        }
        else {
            echo "UserGroupTable insert Failure:";
//            echo "UserGroupTable insert Failure: $this->conn->error <br>"; // this may not be working for some reason
        }
    }

    public function cancelGroupApplication($user_email, $group_id) {
        $sql = "DELETE FROM UserGroupTable WHERE user_email='$user_email' AND group_id='$group_id'".
            "AND user_role='$this->APPLIED'";
        if ($this->conn->query($sql)) {
            echo "UserGroupTable delete success!<br>";
        }
        else {
            echo "UserGroupTable delete Failure:";
//            echo "UserGroupTable delete Failure: $this->conn->error <br>"; // this may not be working for some reason
        }
    }

    public function getAppliedGroups($user_email) {
        $sql = "SELECT * FROM UserGroupTable ".
                "WHERE user_email='$user_email' AND user_role='$this->APPLIED'";
        if ($result = $this->conn->query($sql)) {
            echo "GetAppliedGroups success!<br>";
            // turn each row into an assoc array, then convert each element into a json string
            $json_objs = array();
            for ($i = 0; $row = $result->fetch_assoc(); $i++) {
                $json_objs[$i] = json_encode($row);
            }
            return $json_objs;
        }
        else {
            echo "GetAppliedGroups Failure:";
            return null;
//            echo "GetAppliedGroups Failure: $this->conn->error <br>"; // this may not be working for some reason
        }

    }

    public function getJoinedGroups($user_email) {
        $sql = "SELECT * FROM UserGroupTable ".
            "WHERE user_email='$user_email' AND user_role='$this->MEMBER'";
        if ($result = $this->conn->query($sql)) {
            echo "GetJoinedGroups success!<br>";
            // turn each row into an assoc array, then convert each element into a json string
            $json_objs = array();
            for ($i = 0; $row = $result->fetch_assoc(); $i++) {
                $json_objs[$i] = json_encode($row);
            }
            return $json_objs;
        }
        else {
            echo "GetJoinedGroups Failure:";
            return null;
//            echo "GetJoinedGroups Failure: $this->conn->error <br>"; // this may not be working for some reason
        }
    }

    public function leaveGroup($user_email, $group_id) {
        $sql = "DELETE FROM UserGroupTable WHERE user_email='$user_email' AND group_id='$group_id'".
            "AND user_role='$this->MEMBER'";
        if ($this->conn->query($sql)) {
            echo "LeaveGroup success!<br>";
        }
        else {
            echo "LeaveGroup Failure:";
//            echo "LeaveGroup Failure: $this->conn->error <br>"; // this may not be working for some reason
        }
    }

    public function getUserProfile($user_email) {
        $sql = "SELECT * FROM UserTable WHERE user_email='$user_email'";
        if ($result = $this->conn->query($sql)) {
            echo "GetUserProfile success!";
            return json_encode($result->fetch_assoc());
        }
        else {
            echo "GetUserProfile failure";
        }
    }
}

//$user = new User();
//$user->test();
//$user->applyForGroup("d.lindskog1@gmail.com", 1);
//$objs = $user->getUserProfile("d.lindskog1@gmail.com");
//echo $objs;
//$user->cancelGroupApplication("d.lindskog1@gmail.com", 1);