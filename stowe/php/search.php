<?php


require 'init_database.php';

$conn = new TalentMeDB();

if (!$conn){
  die('Could not connect: ' . mysql_error());
}


class DatabaseInterface{
    private $conn = null;

    public function DatabaseInterface(){
        $this->conn = new TalentMeDB();
    }


    function search(searchtext){
        if
        $sql = SELECT * FROM TalentMeDB




    }

}


/*

$button = $_GET ['submit'];
$search = $_GET ['search'];

if(!$button)
    echo "Please submit a valid search.";

else
    {
        if(strlen($search)<=1)
        echo "Search term too short";

    else
        {
            echo "You searched for <b>$search</b> <hr size='1'></br>";

            mysql_connect("8888","your mysql username","password");

            mysql_select_db("TalentMeDB");

            $search_exploded = explode (" ", $search);

            foreach($search_exploded as $search_each)
                {
                    $x++;
                    if($x==1)
                    $construct .="keywords LIKE '%$search_each%'";

                    else
                        $construct .="AND keywords LIKE '%$search_each%'";

                }

            $construct ="SELECT * FROM TalentMeDB WHERE $construct";

            $run = mysql_query($construct);

            $foundnum = mysql_num_rows($run);

            if ($foundnum==0)

                echo "Sorry, there are no matching results for <b>$search</b>.</br></br>1.
                Try a more general search.</br>2. Try different words with similar meaning</br>3. Please check your spelling.";

                else
                    {
                        echo "$foundnum results found !<p>";

                        while($runrows = mysql_fetch_assoc($run))
                            {
                                $title = $runrows ['title'];
                                $desc = $runrows ['description'];
                                $url = $runrows ['url'];

                                echo "<a href='$url'><b>$title</b></a><br>$desc<br><a href='$url'>$url</a><p>";
                            }
                    }
        }
    }

*/



?>



