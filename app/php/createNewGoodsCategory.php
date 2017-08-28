<?php
require_once 'db_connect.php';

$new_category_name = $_POST['newCategoryName'];

$query_insert = "insert into tGoodsCategories(category_name) select ".$new_category_name;

$result=mysqli_query($con,$query_insert);
/* $parameter_name = array();
$parameter_li = array();
$json = array();
    if(mysqli_num_rows($result)){
        while($row=mysqli_fetch_assoc($result)){
                $parameter_name[]=$row["parameter_name"];
                $parameter_li[]=$row["parameter_li"];
        }
    }
mysqli_close($con);
$json[0] = $parameter_name;
$json[1] = $parameter_li; */
echo json_encode($result);
?>