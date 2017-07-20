<?php
require_once 'db_connect.php';
$query = "
        SELECT t2.category_id,
               t2.category_name,
               t1.product_id,
               t1.product_name
          FROM tGoods           as t1
          JOIN tGoodsCategories as t2 on t2.category_id = t1.category_id
         ORDER BY t2.category_name, 
                  t1.product_name
          ";
$result=mysqli_query($con,$query);
$category_id = array();
$category_name = array();
$product_id = array();
$product_name = array();
$json = array();
    if(mysqli_num_rows($result)){
        while($row=mysqli_fetch_assoc($result)){
                $category_id[]=$row["category_id"];
                $category_name[]=$row["category_name"];
                $product_id[]=$row["product_id"];
                $product_name[]=$row["product_name"];
        }
    }
mysqli_close($con);
$json[0] = $category_id;
$json[1] = $category_name;
$json[2] = $product_id;
$json[3] = $product_name;
echo json_encode($json, JSON_NUMERIC_CHECK);
?>